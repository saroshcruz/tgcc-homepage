/* Keeps the hero banner video muted, looping and playing (the page template drops the muted attribute). */
(function () {
  function fix() {
    var v = document.querySelector('#top > video');
    if (!v) return;
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
    if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  }
  new MutationObserver(fix).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('visibilitychange', fix);
  window.addEventListener('load', fix);
  fix();
})();
