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

  /* Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
