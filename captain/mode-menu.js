/* Main-menu presentation only. No imports or writes to either gameplay/save system. */
(() => {
  'use strict';
  const intro = document.getElementById('intro');
  const story = document.getElementById('modeStory');
  const mayhem = document.getElementById('modeMayhem');
  const storyPanel = document.getElementById('storyModePanel');
  const mayhemPanel = document.getElementById('mayhemModePanel');
  if (!intro || !story || !mayhem || !storyPanel || !mayhemPanel) return;
  const tabs = [story, mayhem];
  function select(mode, focus = false) {
    const isMayhem = mode === 'mayhem';
    intro.dataset.selectedMode = isMayhem ? 'mayhem' : 'story';
    storyPanel.hidden = isMayhem;
    mayhemPanel.hidden = !isMayhem;
    tabs.forEach((tab, index) => {
      const selected = (index === 1) === isMayhem;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (focus && selected) tab.focus({preventScroll: true});
    });
  }
  story.addEventListener('click', () => select('story'));
  mayhem.addEventListener('click', () => select('mayhem'));
  tabs.forEach(tab => tab.addEventListener('keydown', event => {
    if (intro.classList.contains('hidden')) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    const mode = event.key === 'Home' ? 'story' : event.key === 'End' ? 'mayhem' :
      (intro.dataset.selectedMode === 'story' ? 'mayhem' : 'story');
    select(mode, true);
  }));
  // Optional deep selection never replaces or clears either mode's save.
  select(new URLSearchParams(location.search).get('mode'));
})();
