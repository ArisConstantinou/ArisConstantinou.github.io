import test from 'node:test';
import assert from 'node:assert/strict';
import { GameAudio } from '../src/audio.js';

function parameter(value = 0) {
  return {
    value, events: [],
    cancelScheduledValues(time) { this.events.push({ type: 'cancel', time }); },
    setValueAtTime(value, time) { this.value = value; this.events.push({ type: 'immediate', value, time }); },
    setTargetAtTime(value, time) { this.value = value; this.events.push({ type: 'target', value, time }); },
    exponentialRampToValueAtTime(value, time) { this.events.push({ type: 'exponential', value, time }); },
    linearRampToValueAtTime(value, time) { this.events.push({ type: 'linear', value, time }); }
  };
}

function node() {
  return { connections: [], disconnects: 0, connect(target) { this.connections.push(target); }, disconnect() { this.disconnects++; } };
}

function soundHarness({ manualTransitions = false, volume = .6 } = {}) {
  const sources = [], transitions = [];
  const context = {
    currentTime: 23, state: 'running',
    createGain: () => ({ ...node(), gain: parameter() }),
    createBiquadFilter: () => ({ ...node(), frequency: parameter(), Q: parameter() }),
    createOscillator: () => makeSource('oscillator'),
    createBufferSource: () => makeSource('buffer'),
    suspend: () => transition('suspended'),
    resume: () => transition('running')
  };
  function makeSource(type) {
    const source = { ...node(), type, frequency: parameter(), starts: [], stops: [], start(time) { this.starts.push(time); }, stop(time) { this.stops.push(time); } };
    sources.push(source);
    return source;
  }
  function transition(target) {
    if (!manualTransitions) {
      transitions.push({ target });
      return Promise.resolve().then(() => { context.state = target; });
    }
    return new Promise(resolve => {
      transitions.push({ target, complete() { context.state = target; resolve(); } });
    });
  }
  const audio = new GameAudio({ volume });
  Object.assign(audio, { context, master: context.createGain(), sfx: node(), ambience: node(), white: {}, started: true });
  audio.setVolume(volume);
  return { audio, context, sources, transitions, gain: audio.master.gain };
}

const flushMicrotasks = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };

test('Pause sets the master output to zero synchronously before AudioContext suspension completes', async () => {
  const { audio, context, gain, transitions } = soundHarness({ manualTransitions: true });
  const preference = audio.volume;
  assert.ok(gain.value > 0);
  audio.setPaused(true);
  assert.equal(audio.paused, true);
  assert.equal(gain.value, 0, 'silence must not wait for the next animation frame or browser promise');
  assert.deepEqual(gain.events.slice(-2), [
    { type: 'cancel', time: context.currentTime },
    { type: 'immediate', value: 0, time: context.currentTime }
  ], 'existing gain automation cannot make sound audible again during Pause');
  assert.equal(audio.volume, preference, 'Pause does not replace the saved volume preference');
  assert.equal(audio.muted, false, 'temporary Pause and explicit Mute remain separate');
  assert.equal(context.state, 'running', 'this assertion exercises the asynchronous suspension interval');
  await flushMicrotasks();
  assert.equal(transitions.length, 1);
  transitions[0].complete();
  await audio.contextSync;
  assert.equal(context.state, 'suspended');
});

test('Pause cancels and disconnects both playing and delayed one-shot effects', async () => {
  const { audio, sources, context } = soundHarness();
  audio.tone(220, 110, 2);
  audio.tone(440, 220, 1, .1, 'sine', .01, 0, undefined, 5);
  audio.noiseBurst(.4, .1, 1200, .4, 'bandpass', 0, 3);
  assert.equal(sources.length, 3);
  assert.ok(sources.some(source => source.starts[0] > context.currentTime), 'a sound scheduled for the future is included');
  assert.equal(audio.oneShots.size, 3);
  audio.setPaused(true);
  for (const source of sources) {
    assert.equal(source.stops.at(-1), undefined, 'Pause adds an immediate stop rather than retaining the scheduled end');
    assert.equal(source.stops.length, 2);
    assert.ok(source.disconnects > 0, 'the voice is disconnected immediately');
  }
  assert.equal(audio.oneShots.size, 0);
  await audio.contextSync;
  audio.setPaused(false);
  await audio.contextSync;
  assert.equal(sources.length, 3, 'resume does not replay the interrupted effects');
});

test('paused audio rejects play, tone, noise and ambient tick requests without creating sources', async () => {
  const { audio, sources } = soundHarness();
  audio.setPaused(true);
  const elapsed = audio.elapsed;
  audio.play('victory', { priority: true });
  audio.play('impact-heavy');
  audio.tone(440, 220, 1);
  audio.noiseBurst(1);
  audio.croak();
  audio.chirp();
  audio.update(.1, { paused: true, night: true, hunt: true });
  assert.equal(sources.length, 0);
  assert.equal(audio.oneShots.size, 0);
  assert.equal(audio.lastPlayed.size, 0, 'suppressed effects do not consume their cooldowns');
  assert.equal(audio.elapsed, elapsed, 'ambient scheduling stays frozen');
  await audio.contextSync;
});

test('volume and mute settings stay silent while paused, then resume restores the chosen volume', async () => {
  const { audio, gain } = soundHarness({ volume: .4 });
  const initialOutput = gain.value;
  audio.setPaused(true);
  audio.setVolume(.8);
  assert.equal(audio.volume, .8);
  assert.equal(gain.value, 0);
  audio.setMuted(true);
  audio.setMuted(false);
  assert.equal(gain.value, 0, 'unmuting from settings cannot bypass Pause');
  await audio.contextSync;
  audio.setPaused(false);
  await audio.contextSync;
  assert.equal(audio.volume, .8);
  assert.equal(audio.muted, false);
  assert.ok(Math.abs(gain.value - initialOutput * 2) < 1e-9, 'resume uses the latest preferred volume');
});

test('an explicitly muted player stays muted after Pause and Resume', async () => {
  const { audio, gain, sources, context } = soundHarness();
  audio.setMuted(true);
  audio.setPaused(true);
  audio.setVolume(.9);
  await audio.contextSync;
  audio.setPaused(false);
  await audio.contextSync;
  assert.equal(context.state, 'running');
  assert.equal(audio.paused, false);
  assert.equal(audio.muted, true);
  assert.equal(audio.volume, .9);
  assert.equal(gain.value, 0);
  audio.play('ui');
  audio.tone(440, 220, 1);
  audio.noiseBurst(1);
  assert.equal(sources.length, 0);
  audio.setMuted(false);
  assert.ok(gain.value > 0, 'an intentional unmute restores the retained volume');
});

test('rapid Pause and Resume during an in-flight suspension settle to the latest requested state', async () => {
  const { audio, context, transitions, gain } = soundHarness({ manualTransitions: true });
  audio.setPaused(true);
  await flushMicrotasks();
  assert.equal(transitions[0]?.target, 'suspended');
  audio.setPaused(false);
  audio.setPaused(true);
  audio.setPaused(false);
  transitions[0].complete();
  await flushMicrotasks();
  assert.equal(transitions[1]?.target, 'running');
  transitions[1].complete();
  await audio.contextSync;
  assert.equal(context.state, 'running');
  assert.equal(audio.paused, false);
  assert.ok(gain.value > 0);

  audio.setPaused(true);
  await flushMicrotasks();
  assert.equal(transitions[2]?.target, 'suspended');
  audio.setPaused(false);
  audio.setPaused(true);
  transitions[2].complete();
  await audio.contextSync;
  assert.equal(context.state, 'suspended');
  assert.equal(audio.paused, true);
  assert.equal(gain.value, 0);
  assert.equal(transitions.length, 3, 'obsolete Resume requests do not reactivate a finally paused context');
});
