(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (location.hash || preference.matches) return;

  const opening = { active: true, startedAt: null, duration: 3600 };
  window.portfolioOpening = opening;
  document.documentElement.classList.add('showcase-entering');

  function finish() {
    opening.active = false;
    document.documentElement.classList.remove('showcase-entering');
    window.removeEventListener('pointerdown', finish, true);
    window.removeEventListener('wheel', finish, true);
    window.removeEventListener('keydown', finish, true);
    window.removeEventListener('showcase-entered', finish);
    preference.removeEventListener('change', finish);
    clearTimeout(fallback);
  }

  window.addEventListener('pointerdown', finish, true);
  window.addEventListener('wheel', finish, { capture: true, passive: true });
  window.addEventListener('keydown', finish, true);
  window.addEventListener('showcase-entered', finish);
  preference.addEventListener('change', finish);
  const fallback = setTimeout(finish, 8000);
})();
