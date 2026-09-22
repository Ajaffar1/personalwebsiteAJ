// Reveal sections gently as they scroll into view. No dependencies.
// If IntersectionObserver isn't available, or the visitor prefers reduced
// motion, everything just stays visible (see the .reveal CSS fallback).
(function () {
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');

  if (prefersReduced || !('IntersectionObserver' in window) || !targets.length) {
    targets.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach(function (el) { observer.observe(el); });

  // Safety net: never let a section stay invisible for good if something
  // about the observer misbehaves (e.g. an unusual layout or a stalled tab).
  setTimeout(function () {
    targets.forEach(function (el) { el.classList.add('in-view'); });
  }, 4000);
})();
