/* Clean Crew – kleines Script für Menü, Animationen, Vorher-Nachher-Regler und Formular. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var cfg = window.CLEAN_CREW || {};
  var placeholders = { phone: "Telefonnummer folgt", email: "E-Mail-Adresse folgt", area: "Einsatzgebiet folgt" };
  var digits = function (p) { return String(p).replace(/[^\d+]/g, "").replace(/^\+/, ""); };
  var waUrl = function (text) {
    return "https://wa.me/" + digits(cfg.phone) + "?text=" + encodeURIComponent(text || "Hallo Clean Crew, ich hätte gerne ein Angebot.");
  };

  /* Kontaktdaten einsetzen */
  document.querySelectorAll("[data-contact]").forEach(function (el) {
    var key = el.getAttribute("data-contact");
    var val = cfg[key];
    if (!val) { el.textContent = placeholders[key]; return; }
    if (key === "area") { el.textContent = val; return; }
    var a = document.createElement("a");
    a.href = key === "phone" ? "tel:" + val.replace(/\s/g, "") : "mailto:" + val;
    a.textContent = val;
    a.className = el.className;
    el.replaceWith(a);
  });
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    if (!cfg.phone) return;
    el.href = waUrl();
    el.hidden = false;
  });

  /* Header beim Scrollen */
  var header = document.querySelector(".site-header");
  var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 24); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobiles Menü */
  var menu = document.getElementById("mobile-menu");
  var openBtn = document.querySelector(".menu-btn");
  var setMenu = function (open) {
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", String(!open));
    openBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) menu.querySelector(".close").focus(); else openBtn.focus();
  };
  openBtn.addEventListener("click", function () { setMenu(true); });
  menu.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
  });

  /* Einblenden beim Scrollen */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Vorher-Nachher-Regler */
  document.querySelectorAll(".ba").forEach(function (ba) {
    var input = ba.querySelector("input");
    var set = function () { ba.style.setProperty("--pos", input.value + "%"); };
    input.addEventListener("input", set);
    set();
  });

  /* Kontaktformular (ohne Server: öffnet E-Mail oder WhatsApp mit allen Angaben) */
  var form = document.getElementById("contact-form");
  if (!form) return;
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRe = /^\+?[\d\s()/-]{6,}$/;
  var msg = document.getElementById("form-msg");
  var waBtn = form.querySelector('[data-via="wa"]');
  var mailBtn = form.querySelector('[data-via="mail"]');
  if (cfg.phone) waBtn.hidden = false;
  if (!cfg.email && cfg.phone) mailBtn.hidden = true;

  var rules = {
    name: function (v) { return v.length < 2 ? "Bitte gebt euren Namen an." : ""; },
    contact: function (v) { return emailRe.test(v) || phoneRe.test(v) ? "" : "Bitte eine gültige Telefonnummer oder E-Mail-Adresse angeben."; },
    service: function (v) { return v ? "" : "Bitte wählt eine Dienstleistung aus."; },
    location: function (v) { return v.length < 2 ? "Bitte gebt den Einsatzort an." : ""; },
  };
  var showMsg = function (text, type) {
    msg.textContent = text;
    msg.className = "form-msg " + type;
    msg.hidden = false;
  };

  Object.keys(rules).forEach(function (k) {
    form.elements[k].addEventListener("input", function () {
      if (this.getAttribute("aria-invalid") === "true") {
        this.removeAttribute("aria-invalid");
        document.getElementById("err-" + k).textContent = "";
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var via = (e.submitter && e.submitter.getAttribute("data-via")) || (cfg.email ? "mail" : "wa");
    var data = {};
    ["name", "contact", "service", "location", "message", "website"].forEach(function (k) {
      data[k] = form.elements[k].value.trim();
    });
    if (data.website) return; // Spam-Bot

    var firstBad = null;
    Object.keys(rules).forEach(function (k) {
      var err = rules[k](data[k]);
      var field = form.elements[k];
      document.getElementById("err-" + k).textContent = err;
      if (err) { field.setAttribute("aria-invalid", "true"); firstBad = firstBad || field; }
      else field.removeAttribute("aria-invalid");
    });
    if (firstBad) { firstBad.focus(); return; }

    var text =
      "Hallo Clean Crew,\n\nich hätte gerne ein Angebot.\n\n" +
      "Name: " + data.name + "\n" +
      "Kontakt: " + data.contact + "\n" +
      "Dienstleistung: " + data.service + "\n" +
      "Einsatzort: " + data.location + "\n" +
      (data.message ? "\nNachricht:\n" + data.message + "\n" : "");

    if (via === "wa" && cfg.phone) {
      window.open(waUrl(text), "_blank", "noopener");
      showMsg("WhatsApp wurde geöffnet – bitte schickt die vorbereitete Nachricht dort ab.", "ok");
    } else if (cfg.email) {
      window.location.href = "mailto:" + cfg.email +
        "?subject=" + encodeURIComponent("Angebotsanfrage: " + data.service) +
        "&body=" + encodeURIComponent(text);
      showMsg("Euer E-Mail-Programm wurde geöffnet – bitte schickt die vorbereitete E-Mail dort ab.", "ok");
    } else {
      showMsg("Unsere Kontaktdaten folgen in Kürze. Bitte versucht es bald noch einmal.", "error");
    }
  });
})();
