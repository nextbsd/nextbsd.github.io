// Smooth-scroll for any in-page anchors that remain (the section content now
// lives on its own pages, so this only fires for links within a single page).
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var id = a.getAttribute('href').slice(1);
    var target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', window.location.pathname + window.location.search);
  });
});

// Nav hamburger. Only reachable below the 780px breakpoint, where CSS
// reveals the button; above it the tab row is always visible and this
// code never runs.
(function () {
  var btn = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (!btn || !links) return;

  function setOpen(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    links.setAttribute('data-open', open ? 'true' : 'false');
  }

  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  // Close after a choice is made -- both page navigations and outbound links.
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  // Rotating the phone or widening the window past the breakpoint would
  // otherwise leave data-open="true" latched on the desktop tab row.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 780) setOpen(false);
  });
})();
