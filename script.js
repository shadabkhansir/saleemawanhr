/* Small enhancements only; the site works fully without JavaScript. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* Mobile menu */
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  if (btn && menu) {
    function setOpen(open) {
      menu.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    btn.addEventListener("click", function () { setOpen(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* Fade sections in as they scroll into view */
  var items = document.querySelectorAll(".section .wrap > *, .stats");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }

  /* Résumé links always fetch the newest PDF, so a re-uploaded file
     shows immediately instead of an old cached copy. */
  document.querySelectorAll('a[href*="resume/"]').forEach(function (a) {
    var base = a.getAttribute("href").split("?")[0];
    function fresh() { a.setAttribute("href", base + "?t=" + Date.now()); }
    ["pointerdown", "keydown", "click", "contextmenu"].forEach(function (ev) { a.addEventListener(ev, fresh); });
  });

  /* Recommendations slider: arrows, dots and a gentle auto-advance that
     stops as soon as the visitor interacts. Swiping is native scrolling. */
  var track = document.getElementById("recs-track");
  if (track) {
    var slides = track.children;
    var dotsBox = document.querySelector(".slider-dots");
    var dots = [];
    function perView() { return Math.max(1, Math.round(track.clientWidth / slides[0].getBoundingClientRect().width)); }
    function pages() { return Math.max(1, slides.length - perView() + 1); }
    function current() {
      var step = slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
      return Math.min(pages() - 1, Math.round(track.scrollLeft / step));
    }
    function go(i) {
      var n = pages();
      i = (i + n) % n;
      track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft });
    }
    function buildDots() {
      dotsBox.innerHTML = ""; dots = [];
      for (var i = 0; i < pages(); i++) {
        var d = document.createElement("button");
        d.type = "button"; d.setAttribute("role", "tab");
        d.setAttribute("aria-label", "Go to recommendation " + (i + 1));
        d.addEventListener("click", (function (k) { return function () { stop(); go(k); }; })(i));
        dotsBox.appendChild(d); dots.push(d);
      }
      sync();
    }
    function sync() {
      var c = current();
      dots.forEach(function (d, i) { d.setAttribute("aria-selected", String(i === c)); });
    }
    var timer = null;
    function stop() { clearInterval(timer); timer = null; }
    document.querySelectorAll(".slider-btn").forEach(function (b) {
      b.addEventListener("click", function () { stop(); go(current() + Number(b.dataset.dir)); });
    });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); stop(); go(current() + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); stop(); go(current() - 1); }
    });
    var raf;
    track.addEventListener("scroll", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); }, { passive: true });
    ["pointerdown", "touchstart", "wheel", "focusin"].forEach(function (ev) { track.addEventListener(ev, stop, { passive: true }); });
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(buildDots, 150); });
    buildDots();
    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!still) {
      timer = setInterval(function () { if (!document.hidden) go(current() + 1); }, 7000);
      var slider = track.parentNode;
      slider.addEventListener("mouseenter", function () { if (timer) { clearInterval(timer); timer = "paused"; } });
      slider.addEventListener("mouseleave", function () {
        if (timer === "paused") timer = setInterval(function () { if (!document.hidden) go(current() + 1); }, 7000);
      });
    }
  }

  /* Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
