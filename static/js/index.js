"use strict";

document.addEventListener("DOMContentLoaded", function () {
  initMoreWorks();
  initSmoothScroll();
  initFadeTargets();
  initCounters();
  initBibtexCopy();
  initScrollTop();
  initDisabledButtons();
  initScrollProgress();
  initInteractiveSurfaces();
});

function initMoreWorks() {
  var btn = document.getElementById("moreWorksBtn");
  var dropdown = document.getElementById("moreWorksDropdown");
  if (!btn || !dropdown) return;

  btn.addEventListener("click", function (event) {
    event.stopPropagation();
    var open = dropdown.classList.toggle("is-active");
    btn.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target) && event.target !== btn) {
      dropdown.classList.remove("is-active");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      dropdown.classList.remove("is-active");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      var target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      var nav = document.querySelector(".site-nav");
      var navHeight = nav ? nav.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.getAttribute("id");
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

function initFadeTargets() {
  var targets = document.querySelectorAll(".fade-target");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (target) {
      target.classList.add("visible");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(function (target) {
    observer.observe(target);
  });
}

function initCounters() {
  var counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  var started = false;
  var stats = document.querySelector(".stats-band");
  var start = function () {
    if (started) return;
    started = true;
    counters.forEach(function (el) {
      animateCounter(el, parseInt(el.getAttribute("data-counter"), 10), 950);
    });
  };

  if (!stats || !("IntersectionObserver" in window)) {
    start();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      start();
      observer.disconnect();
    }
  }, { threshold: 0.35 });
  observer.observe(stats);
}

function animateCounter(el, target, duration) {
  var suffix = "";
  var span = el.querySelector("span");
  if (span) suffix = span.outerHTML;

  var startTime = performance.now();
  function tick(now) {
    var progress = Math.min((now - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var value = Math.round(target * eased);
    el.innerHTML = value.toLocaleString() + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.innerHTML = target.toLocaleString() + suffix;
    }
  }
  requestAnimationFrame(tick);
}

function initBibtexCopy() {
  var btn = document.getElementById("copyBibtex");
  var content = document.getElementById("bibtexContent");
  if (!btn || !content) return;

  btn.addEventListener("click", function () {
    var text = content.innerText || content.textContent || "";
    copyText(text, function () {
      btn.classList.add("copied");
      btn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i><span>Copied</span>';
      setTimeout(function () {
        btn.classList.remove("copied");
        btn.innerHTML = '<i class="fas fa-copy" aria-hidden="true"></i><span>Copy</span>';
      }, 1800);
    });
  });
}

function copyText(text, onSuccess) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(function () {
      fallbackCopy(text, onSuccess);
    });
    return;
  }
  fallbackCopy(text, onSuccess);
}

function fallbackCopy(text, onSuccess) {
  var textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    onSuccess();
  } catch (err) {
    console.warn("CALRD: BibTeX copy failed", err);
  }
  document.body.removeChild(textarea);
}

function initScrollTop() {
  var btn = document.getElementById("scrollTop");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    btn.classList.toggle("visible", window.scrollY > 460);
  }, { passive: true });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initDisabledButtons() {
  document.querySelectorAll("a.is-disabled").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });
}

function initScrollProgress() {
  var bar = document.getElementById("scrollProgress");
  if (!bar) return;

  var update = function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = "scaleX(" + Math.min(Math.max(progress, 0), 1) + ")";
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initInteractiveSurfaces() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var selector = [
    ".info-card",
    ".step-card",
    ".metric-card",
    ".gallery-card",
    ".author-card",
    ".contact-card",
    ".paper-figure",
    ".table-block",
    ".abstract-box",
    ".data-summary",
    ".ablation-card",
    ".formula-card"
  ].join(",");

  document.querySelectorAll(selector).forEach(function (surface) {
    surface.classList.add("interactive-surface");

    surface.addEventListener("pointermove", function (event) {
      var rect = surface.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width;
      var y = (event.clientY - rect.top) / rect.height;
      surface.style.setProperty("--mx", Math.round(x * 100) + "%");
      surface.style.setProperty("--my", Math.round(y * 100) + "%");
      surface.style.setProperty("--rx", ((0.5 - y) * 4).toFixed(2) + "deg");
      surface.style.setProperty("--ry", ((x - 0.5) * 5).toFixed(2) + "deg");
    });

    surface.addEventListener("pointerleave", function () {
      surface.style.removeProperty("--mx");
      surface.style.removeProperty("--my");
      surface.style.removeProperty("--rx");
      surface.style.removeProperty("--ry");
    });
  });
}
