/* H.D. Publishing — site script (no dependencies)
   1. Shop links: every element with data-shop="path" gets its href rewritten to SHOP_BASE + path,
      so the Shopify address lives in exactly one place (below). Sign-in happens inside the app.
   2. Mobile nav toggle.
   3. Optional theme toggle: any element with data-theme-toggle cycles light/dark and remembers it. */

(function () {
  // Change this one line when the shop's address is final.
  // Options: "https://shop.hdpublishing.org/" once the storefront moves to a subdomain,
  // or the store's *.myshopify.com address in the meantime.
  var SHOP_BASE = "https://shop.hdpublishing.org/";

  document.querySelectorAll("[data-shop]").forEach(function (a) {
    var path = a.getAttribute("data-shop") || "";
    a.setAttribute("href", SHOP_BASE + path.replace(/^\//, ""));
    if (!a.getAttribute("rel")) a.setAttribute("rel", "noopener");
  });

  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var stored = null;
  try { stored = localStorage.getItem("hd-theme"); } catch (e) {}
  if (stored === "dark" || stored === "light") document.documentElement.setAttribute("data-theme", stored);
  document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      var isDark = cur ? cur === "dark" : prefersDark;
      var next = isDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("hd-theme", next); } catch (e) {}
    });
  });

  // Current-page marker in the nav
  var here = location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll(".nav-links a[href]").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || /^https?:/.test(href)) return;
    var target = new URL(href, location.href).pathname.replace(/index\.html$/, "");
    if (target !== "/" && here.indexOf(target) === 0) a.setAttribute("aria-current", "page");
  });
})();
