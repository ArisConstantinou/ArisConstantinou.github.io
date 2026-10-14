// PointerEvent sends button chords as pointermove, not a second pointerdown.
export function engineMouse(buttons,previous=0,piloted=false){
 return {fire:piloted&&!!(buttons&1),shield:!piloted&&!!(buttons&2),stomp:piloted&&!!(buttons&2)&&!(previous&2)};
}
