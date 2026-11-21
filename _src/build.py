#!/usr/bin/env python3
"""
Baut die statischen HTML-Seiten von Clean Crew.

Texte, Leistungen und Galerie stehen hier oben. Nach einer Änderung:
    python3 _src/build.py
ausführen (aus dem Hauptordner). Die .html-Dateien werden dann neu geschrieben.

Kontaktdaten (Telefon, E-Mail, Einsatzgebiet) stehen NICHT hier,
sondern in config.js – die könnt ihr ohne Neubau ändern.
"""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

SITE = {
    "name": "Clean Crew",
    "slogan": "Wir bringen alles zum Glänzen!",
    "intro": "Wir kümmern uns um Sauberkeit und gepflegte Außenbereiche. Ob Straßenreinigung, "
             "Gartenpflege oder Autowäsche – wir bringen alles zum Glänzen!",
}

SERVICES = [
    {
        "id": "hofreinigung", "title": "Straßen- und Hofreinigung", "icon": "brush",
        "image": "service-hofreinigung",
        "short": "Saubere Wege, Einfahrten und Höfe – gründlich und ordentlich.",
        "description": "Wir sorgen dafür, dass Gehwege, Einfahrten und Höfe sauber und gepflegt aussehen – "
                       "damit ihr euch um andere Dinge kümmern könnt.",
        "points": ["Gehwege kehren", "Einfahrten reinigen", "Höfe sauber halten"],
    },
    {
        "id": "laubentfernung", "title": "Laubentfernung", "icon": "leaf", "image": "service-laub",
        "short": "Wir befreien Grundstücke und Gärten zuverlässig von Laub.",
        "description": "Gerade im Herbst wird Laub schnell zur Last. Wir rechen zusammen, räumen auf und "
                       "halten eure Flächen frei.",
        "points": ["Laub zusammenrechen", "Grundstücke von Laub befreien", "Gartenflächen pflegen"],
    },
    {
        "id": "rasenpflege", "title": "Rasenpflege", "icon": "sprout", "image": "service-rasen",
        "short": "Gepflegter Rasen mit sauberen Kanten – Woche für Woche.",
        "description": "Ein gepflegter Rasen macht jedes Grundstück schöner. Wir mähen, pflegen die Kanten "
                       "und halten Grünflächen ordentlich.",
        "points": ["Rasen mähen", "Rasenkanten pflegen", "Grünflächen ordentlich halten"],
    },
    {
        "id": "autowaesche", "title": "Autowäsche", "icon": "car", "image": "service-autowaesche",
        "short": "Sorgfältige Handwäsche für glänzende Fahrzeuge.",
        "description": "Wir waschen euer Fahrzeug von Hand – mit Liebe zum Detail, von der Karosserie bis "
                       "zu den Felgen.",
        "points": ["Außenreinigung", "Felgenreinigung", "Fahrzeugpflege"],
    },
]

# Galerie: Bilder liegen in img/ (als .webp). Sobald echte Fotos drin sind, SAMPLE_GALLERY = False.
SAMPLE_GALLERY = True
GALLERY = [
    ("hero", "Frisch gereinigte Einfahrt vor einem Haus", "Einfahrt gereinigt", "Hofreinigung"),
    ("service-rasen", "Frisch gemähter Rasen mit sauberen Kanten", "Rasen gemäht", "Rasenpflege"),
    ("service-laub", "Laub wird auf einem Rasen zusammengerecht", "Laub entfernt", "Laubentfernung"),
    ("service-autowaesche", "Handwäsche eines dunklen Autos mit Felgenreinigung", "Auto gewaschen", "Autowäsche"),
    ("service-hofreinigung", "Gehweg wird mit einem Besen gekehrt", "Gehweg gekehrt", "Hofreinigung"),
    ("nachher-hof", "Sauberer gepflasterter Hof nach der Reinigung", "Hof sauber", "Hofreinigung"),
]
BEFORE_AFTER = {
    "before": "vorher-hof", "after": "nachher-hof", "title": "Hofreinigung",
    "description": "Laub, Moos und Schmutz entfernt – der Hof wirkt wieder gepflegt.",
}

NAV = [
    ("leistungen.html", "Leistungen"),
    ("ueber-uns.html", "Über uns"),
    ("arbeiten.html", "Arbeiten"),
    ("preise.html", "Preise"),
    ("kontakt.html", "Kontakt"),
]

# ---------------------------------------------------------------- Icons (Lucide, ISC-Lizenz)
ICONS = {
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "arrow-down": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    "arrow-up-right": '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "menu": '<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>',
    "x": '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 '
             '19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 '
             '2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 '
             '2.81.7A2 2 0 0 1 22 16.92z"/>',
    "mail": '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    "message-circle": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    "brush": '<path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/>'
             '<path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 '
             '2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>',
    "leaf": '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>'
            '<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    "sprout": '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/>'
              '<path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>'
              '<path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
    "car": '<path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/>'
           '<path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/>'
           '<path d="M5 18v2"/><path d="M19 18v2"/>',
    "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 '
                    '1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>'
                    '<path d="m9 12 2 2 4-4"/>',
    "sparkles": '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 '
                '9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 '
                '0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>'
                '<path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
    "calendar-clock": '<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/>'
                      '<path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/>'
                      '<path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/>',
    "hand-coins": '<path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/>'
                  '<path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/>'
                  '<path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/>',
    "message-square-text": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
                           '<path d="M13 8H7"/><path d="M17 12H7"/>',
    "clipboard-list": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>'
                      '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>'
                      '<path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    "move-horizontal": '<path d="m18 8 4 4-4 4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/>',
    "send": '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
}


def icon(name):
    return f'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>'


e = html.escape
ARROW = icon("arrow-right")


def reveal(inner, delay=0, tag="div", cls=""):
    classes = ("reveal " + cls).strip()
    style = f' style="--d:{delay}ms"' if delay else ""
    return f'<{tag} class="{classes}"{style}>{inner}</{tag}>'


def img(name, alt, w, h, cls="", eager=False):
    load = 'fetchpriority="high"' if eager else 'loading="lazy"'
    c = f' class="{cls}"' if cls else ""
    return f'<img src="img/{name}.webp" alt="{e(alt)}" width="{w}" height="{h}" {load} decoding="async"{c}>'


LOGO_SVG = (
    '<svg viewBox="0 0 40 40" aria-hidden="true">'
    '<rect width="40" height="40" rx="11" style="fill:var(--primary)"/>'
    '<path d="M27.5 14.2a9 9 0 1 0 0 11.6" fill="none" stroke-width="4" stroke-linecap="round" style="stroke:#fff"/>'
    '<path class="spark" d="M30 6.5l1.3 3.2 3.2 1.3-3.2 1.3L30 15.5l-1.3-3.2-3.2-1.3 3.2-1.3z" style="fill:var(--accent)"/>'
    '</svg>'
)
LOGO = f'<span class="logo">{LOGO_SVG}<span>CLEAN <em>CREW</em></span></span>'


def heading(eyebrow, title, text=None, center=False, title_id=None):
    tid = f' id="{title_id}"' if title_id else ""
    p = f"<p>{e(text)}</p>" if text else ""
    return reveal(f'<p class="eyebrow">{e(eyebrow)}</p><h2{tid}>{e(title)}</h2>{p}',
                  cls="heading" + (" center" if center else ""))


# ---------------------------------------------------------------- Abschnitte
def services_grid():
    cards = []
    for i, s in enumerate(SERVICES):
        pts = "".join(f'<li><span class="tick">{icon("check")}</span>{e(p)}</li>' for p in s["points"])
        card = (
            f'<a class="service-card" href="leistungen.html#{s["id"]}">'
            f'<div class="media">{img(s["image"], s["title"], 1200, 912)}'
            f'<span class="icon-badge">{icon(s["icon"])}</span></div>'
            f'<div class="body"><h3>{e(s["title"])}</h3><p class="short">{e(s["short"])}</p>'
            f'<ul class="checklist">{pts}</ul>'
            f'<span class="more">Mehr erfahren {icon("arrow-up-right")}</span></div></a>'
        )
        cards.append(reveal(card, i * 90))
    return f"""
<section class="section" id="leistungen-start" aria-labelledby="leistungen-titel">
  <div class="container">
    <div class="head-row">
      {heading("Unsere Dienstleistungen", "Alles, was draußen glänzen soll.",
               "Vier Leistungen, ein Anspruch: saubere Arbeit, auf die ihr euch verlassen könnt.",
               title_id="leistungen-titel")}
      {reveal(f'<a class="text-link" href="leistungen.html">Alle Leistungen ansehen {icon("arrow-up-right")}</a>')}
    </div>
    <div class="grid-4 mt-12">{"".join(cards)}</div>
  </div>
</section>"""


def about_block(show_link=True):
    values = "".join(f"<div>{v}</div>" for v in ["Zuverlässig", "Sorgfältig", "Motiviert"])
    link = f'<a class="btn btn-lg btn-ink" href="ueber-uns.html">Mehr über uns {ARROW}</a>' if show_link else ""
    photo = (
        '<div class="photo"><div class="frame">'
        + img("team", "Das Clean-Crew-Team mit Schubkarre, Rechen und Besen", 1200, 1408)
        + '</div><div class="badge"><strong>2</strong><span>Leute. Ein Anspruch.</span></div></div>'
    )
    text = (
        '<p class="eyebrow">Über uns</p>'
        '<h2 id="ueber-uns-titel">Ein junges Zweierteam mit Liebe zum Detail.</h2>'
        '<p class="lead">Wir sind Clean Crew – ein motiviertes Team, das Wert auf Zuverlässigkeit, Sorgfalt und '
        'saubere Arbeit legt. Unser Ziel ist es, unseren Kunden die Arbeit abzunehmen und für gepflegte '
        'Ergebnisse zu sorgen.</p>'
        f'<div class="values">{values}</div>{link}'
    )
    return f"""
<section class="section bg-secondary" aria-labelledby="ueber-uns-titel">
  <div class="container about">{reveal(photo)}{reveal(text, 120)}</div>
</section>"""


WHY = [
    ("shield-check", "Zuverlässig", "Was wir vereinbaren, halten wir ein – pünktlich und verbindlich."),
    ("sparkles", "Sorgfältig", "Wir arbeiten gründlich und achten auf jedes Detail."),
    ("calendar-clock", "Flexibel", "Einmalig oder regelmäßig – wir richten uns nach euren Wünschen."),
    ("hand-coins", "Faire Preise", "Individuelle, faire Angebote – abgestimmt auf euren Auftrag."),
]


def why_grid():
    cards = "".join(
        reveal(f'<div class="why-card"><span class="icon-badge">{icon(ic)}</span>'
               f'<h3>{t}</h3><p>{x}</p></div>', i * 90)
        for i, (ic, t, x) in enumerate(WHY)
    )
    return f"""
<section class="section bg-forest grain on-dark" aria-labelledby="warum-titel">
  <div class="container relative">
    {heading("Warum Clean Crew?", "Darauf könnt ihr euch verlassen.", center=True, title_id="warum-titel")}
    <div class="grid-4 mt-14">{cards}</div>
  </div>
</section>"""


def before_after(show_link=False):
    b = BEFORE_AFTER
    link = reveal(f'<a class="text-link" href="arbeiten.html" style="margin-top:2rem">Zur Galerie {icon("arrow-up-right")}</a>', 100) if show_link else ""
    sample = " (Beispielbild)" if SAMPLE_GALLERY else ""
    slider = (
        '<div class="ba">'
        + img(b["after"], f'{b["title"]} – nachher', 1408, 944)
        + img(b["before"], f'{b["title"]} – vorher', 1408, 944, cls="before")
        + '<span class="tag l">Vorher</span><span class="tag r">Nachher</span>'
        f'<div class="line" aria-hidden="true"><span class="knob">{icon("move-horizontal")}</span></div>'
        f'<label class="sr-only" for="ba-range">Vorher-Nachher-Regler für {e(b["title"])}</label>'
        '<input id="ba-range" type="range" min="0" max="100" value="50"></div>'
        f'<p class="ba-caption"><strong>{e(b["title"])}:</strong> {e(b["description"])}{sample}</p>'
    )
    return f"""
<section class="section" aria-labelledby="vorher-nachher-titel">
  <div class="container ba-section">
    <div>{heading("Vorher – Nachher", "Der Unterschied ist sichtbar.",
                  "Zieht den Regler nach links oder rechts und seht selbst, wie viel eine gründliche Reinigung ausmacht.",
                  title_id="vorher-nachher-titel")}{link}</div>
    {reveal(slider, 120)}
  </div>
</section>"""


def gallery():
    text = ("Hier zeigen wir bald Fotos unserer eigenen Aufträge. Die aktuellen Bilder sind Beispielbilder."
            if SAMPLE_GALLERY else "Ein paar Eindrücke aus unseren bisherigen Aufträgen.")
    figs = "".join(
        reveal(img(src, alt, 1200, 900) + '<div class="shade"></div>'
               f'<figcaption><p class="eyebrow">{e(cat)}</p><p>{e(title)}</p></figcaption>',
               (i % 3) * 90, tag="figure")
        for i, (src, alt, title, cat) in enumerate(GALLERY)
    )
    return f"""
<section class="section bg-muted" aria-labelledby="galerie-titel">
  <div class="container">
    {heading("Unsere Arbeiten", "Ein Blick auf unsere Arbeit.", text, title_id="galerie-titel")}
    <div class="gallery mt-12">{figs}</div>
  </div>
</section>"""


def pricing_note():
    box = (
        '<div class="price-box"><div class="blob a" aria-hidden="true"></div><div class="blob b" aria-hidden="true"></div>'
        '<div class="relative"><p class="eyebrow">Preise &amp; Angebote</p>'
        '<h2 id="preise-titel">Jeder Auftrag ist individuell.</h2>'
        '<p>Kontaktiert uns für ein unverbindliches und faires Angebot.</p>'
        f'<a class="btn btn-xl btn-hero" href="kontakt.html">Angebot anfordern {ARROW}</a></div></div>'
    )
    return f"""
<section class="section" aria-labelledby="preise-titel">
  <div class="container">{reveal(box)}</div>
</section>"""


def cta_band():
    return f"""
<section class="bg-lime cta-band">
  <div class="container">
    {reveal('<h2>Bereit für ein sauberes Ergebnis?</h2><p>Schreibt uns – wir melden uns mit einem unverbindlichen Angebot.</p>')}
    {reveal(f'<a class="btn btn-xl btn-ink" href="kontakt.html">Jetzt Angebot anfragen {ARROW}</a>', 100)}
  </div>
</section>"""


def page_hero(eyebrow, title, text):
    return f"""
<section class="page-hero">
  <img src="img/hero.webp" alt="" aria-hidden="true" width="1920" height="1088" fetchpriority="high">
  <div class="overlay" aria-hidden="true"></div>
  <div class="container">
    {reveal(f'<p class="eyebrow">{e(eyebrow)}</p><h1>{e(title)}</h1><p>{e(text)}</p>', cls="content")}
  </div>
</section>"""


def services_detail():
    items = []
    for i, s in enumerate(SERVICES):
        pts = "".join(f'<li><span class="tick">{icon("check")}</span>{e(p)}</li>' for p in s["points"])
        photo = (f'<div class="photo"><div class="frame">{img(s["image"], s["title"], 1200, 912)}</div>'
                 f'<span class="num" aria-hidden="true">0{i + 1}</span></div>')
        text = (f'<span class="icon-badge">{icon(s["icon"])}</span><h2>{e(s["title"])}</h2>'
                f'<p class="desc">{e(s["description"])}</p><ul>{pts}</ul>'
                f'<a class="btn btn-lg btn-primary" href="kontakt.html?leistung={s["id"]}">'
                f'Angebot für {e(s["title"])} anfragen {ARROW}</a>')
        flip = " flip" if i % 2 else ""
        items.append(f'<article class="service-detail{flip}" id="{s["id"]}">{reveal(photo)}{reveal(text, 120)}</article>')
    return f'<section class="section"><div class="container services-detail">{"".join(items)}</div></section>'


STEPS = [
    ("message-square-text", "Anfrage senden", "Erzählt uns über das Formular, was erledigt werden soll und wo."),
    ("clipboard-list", "Angebot erhalten", "Wir melden uns bei euch mit einem individuellen, fairen Angebot."),
    ("sparkles", "Wir legen los", "Passt alles, kümmern wir uns um den Rest – bis alles glänzt."),
]


def steps():
    lis = "".join(
        reveal(f'<div class="step"><span class="n">{i + 1}</span><span class="icon-badge">{icon(ic)}</span>'
               f'<h3>{t}</h3><p>{x}</p></div>', i * 100, tag="li")
        for i, (ic, t, x) in enumerate(STEPS)
    )
    return f"""
<section class="section">
  <div class="container">
    {heading("So funktioniert's", "In drei Schritten zum Angebot.", center=True)}
    <ol class="steps mt-14">{lis}</ol>
  </div>
</section>"""


def contact_section():
    opts = "".join(f'<option value="{e(s["title"])}" data-id="{s["id"]}">{e(s["title"])}</option>' for s in SERVICES)
    opts += '<option value="Mehrere / Sonstiges">Mehrere / Sonstiges</option>'

    def field(name, label, control, wide=False):
        return (f'<div class="field{" wide" if wide else ""}"><label for="cf-{name}">{label}</label>'
                f'{control}<p class="err" id="err-{name}" aria-live="polite"></p></div>')

    form = f"""
<form id="contact-form" class="form-card" novalidate>
  <h2>Angebot anfragen</h2>
  <p class="sub">Kostenlos und unverbindlich. Felder mit * sind Pflichtfelder.</p>
  <div class="fields">
    {field("name", "Name *", '<input id="cf-name" name="name" autocomplete="name" maxlength="100" aria-describedby="err-name">')}
    {field("contact", "Telefonnummer oder E-Mail *", '<input id="cf-contact" name="contact" autocomplete="email" maxlength="255" aria-describedby="err-contact">')}
    {field("service", "Gewünschte Dienstleistung *", f'<select id="cf-service" name="service" aria-describedby="err-service"><option value="" disabled selected>Bitte auswählen</option>{opts}</select>')}
    {field("location", "Einsatzort *", '<input id="cf-location" name="location" placeholder="Straße, PLZ, Ort" autocomplete="street-address" maxlength="200" aria-describedby="err-location">')}
    {field("message", "Nachricht", '<textarea id="cf-message" name="message" rows="5" maxlength="2000" placeholder="Was dürfen wir für euch erledigen? Größe der Fläche, Wunschtermin, Besonderheiten …"></textarea>', wide=True)}
    <div class="hp" aria-hidden="true"><label for="cf-website">Website</label><input id="cf-website" name="website" tabindex="-1" autocomplete="off"></div>
  </div>
  <p id="form-msg" class="form-msg" role="status" hidden></p>
  <div class="form-foot">
    <p class="note">Beim Absenden öffnet sich euer E-Mail-Programm bzw. WhatsApp mit einer vorbereiteten Nachricht.
      Die Website selbst speichert nichts. Mehr in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
    <div class="send">
      <button type="submit" class="btn btn-lg btn-hero" data-via="mail">Anfrage senden {icon("send")}</button>
      <button type="submit" class="btn btn-lg btn-whatsapp" data-via="wa" hidden>{icon("message-circle")} Per WhatsApp</button>
    </div>
  </div>
</form>"""

    rows = [("phone", "Telefon", "phone"), ("mail", "E-Mail", "email"), ("map-pin", "Einsatzgebiet", "area")]
    lis = "".join(
        f'<li><span class="icon-badge">{icon(ic)}</span><div><p class="label">{lab}</p>'
        f'<span class="val" data-contact="{key}"></span></div></li>'
        for ic, lab, key in rows
    )
    info = (f'<div class="contact-card"><h2>Direkter Kontakt</h2><p>Lieber direkt? Ihr erreicht uns auch so:</p>'
            f'<ul>{lis}</ul><a class="btn btn-whatsapp" data-whatsapp hidden target="_blank" rel="noopener noreferrer">'
            f'{icon("message-circle")} Per WhatsApp schreiben</a></div>')
    preselect = """
<script>
  (function () {
    var id = new URLSearchParams(location.search).get("leistung");
    var opt = id && document.querySelector('#cf-service option[data-id="' + id + '"]');
    if (opt) opt.selected = true;
  })();
</script>"""
    return f"""
<section class="section bg-muted">
  <div class="container contact-grid">{reveal(form)}{reveal(info, 120)}</div>
</section>{preselect}"""


def legal(title, body):
    return f"""
<section class="legal-hero"><div class="container"><h1>{title}</h1></div></section>
<section class="section"><div class="container"><div class="legal">
  <p class="notice">Hinweis: Die Angaben in eckigen Klammern sind Platzhalter und müssen vor der Veröffentlichung
  durch eure echten Daten ersetzt und rechtlich geprüft werden.</p>
  {body}
</div></div></section>"""


# ---------------------------------------------------------------- Seitenrahmen
def layout(file, title, description, body, noindex=False, extra_head=""):
    cur = ' aria-current="page"'
    nav = "".join(f'<a href="{href}"{cur if href == file else ""}>{label}</a>' for href, label in NAV)
    mnav = f'<a href="index.html"{cur if file == "index.html" else ""}>Start</a>' + nav
    services_links = "".join(f'<li><a href="leistungen.html#{s["id"]}">{e(s["title"])}</a></li>' for s in SERVICES)
    robots = '<meta name="robots" content="noindex, follow">' if noindex else ""
    return f"""<!doctype html>
<html lang="de" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(description)}">
{robots}
<meta name="author" content="Clean Crew">
<meta name="theme-color" content="#0f1a14">
<meta property="og:site_name" content="Clean Crew">
<meta property="og:locale" content="de_DE">
<meta property="og:type" content="website">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(description)}">
<meta property="og:image" content="img/hero.webp">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Manrope:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="style.css">
{extra_head}
</head>
<body>
<a class="skip-link" href="#inhalt">Zum Inhalt springen</a>
<header class="site-header">
  <div class="container header-inner">
    <a href="index.html" aria-label="Clean Crew – Startseite">{LOGO}</a>
    <nav class="main-nav" aria-label="Hauptnavigation">{nav}</nav>
    <div class="header-actions">
      <a class="btn btn-hero header-cta" href="kontakt.html">Angebot anfragen {ARROW}</a>
      <button class="btn btn-icon btn-outline-light menu-btn" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-menu">{icon("menu")}</button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <div class="backdrop" data-close></div>
  <div class="panel" role="dialog" aria-modal="true" aria-label="Menü">
    {LOGO}
    <button class="btn btn-icon btn-outline-light close" data-close aria-label="Menü schließen">{icon("x")}</button>
    <nav aria-label="Mobile Navigation">{mnav}</nav>
    <a class="btn btn-lg btn-hero" href="kontakt.html">Jetzt Angebot anfragen {ARROW}</a>
  </div>
</div>
<main id="inhalt">
{body}
</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      {LOGO}
      <p class="slogan">{e(SITE["slogan"])}</p>
      <p class="tagline">Euer junges Team für saubere Wege, gepflegte Gärten und glänzende Autos.</p>
    </div>
    <div><h3 class="eyebrow">Leistungen</h3><ul>{services_links}</ul></div>
    <div>
      <h3 class="eyebrow">Kontakt</h3>
      <ul>
        <li class="ic">{icon("phone")}<span data-contact="phone"></span></li>
        <li class="ic">{icon("mail")}<span data-contact="email"></span></li>
        <li class="ic">{icon("map-pin")}<span data-contact="area"></span></li>
      </ul>
      <a class="to-form" href="kontakt.html">Zum Kontaktformular →</a>
    </div>
    <div>
      <h3 class="eyebrow">Rechtliches</h3>
      <ul><li><a href="impressum.html">Impressum</a></li><li><a href="datenschutz.html">Datenschutzerklärung</a></li></ul>
    </div>
  </div>
  <div class="footer-bottom"><div class="container">
    <p>© <span id="year">2026</span> Clean Crew. Alle Rechte vorbehalten.</p>
    <p>Straßenreinigung · Gartenpflege · Autowäsche</p>
  </div></div>
</footer>
<a class="wa-float" data-whatsapp hidden target="_blank" rel="noopener noreferrer" aria-label="Per WhatsApp schreiben">{icon("message-circle")}<span>WhatsApp</span></a>
<script>document.getElementById("year").textContent = new Date().getFullYear();</script>
<script src="config.js"></script>
<script src="main.js"></script>
</body>
</html>
"""


# ---------------------------------------------------------------- Seiten
def home():
    hero = f"""
<section class="hero">
  {img("hero", "Frisch gereinigte, glänzende Einfahrt vor einem gepflegten Haus", 1920, 1088, eager=True)}
  <div class="overlay" aria-hidden="true"></div>
  <div class="container">
    <div class="hero-content">
      <p class="eyebrow lime anim-in" style="animation-delay:100ms">Reinigung · Gartenpflege · Autowäsche</p>
      <h1 class="anim-in" style="animation-delay:200ms">CLEAN<br><span class="accent">CREW</span></h1>
      <p class="slogan anim-in" style="animation-delay:350ms">{e(SITE["slogan"])}</p>
      <p class="intro anim-in" style="animation-delay:450ms">{e(SITE["intro"])}</p>
      <div class="actions anim-in" style="animation-delay:550ms">
        <a class="btn btn-xl btn-hero" href="kontakt.html">Jetzt Angebot anfragen {ARROW}</a>
        <a class="btn btn-xl btn-outline-light" href="leistungen.html">Unsere Leistungen</a>
      </div>
    </div>
  </div>
  <a class="scroll-down" href="#leistungen-start" aria-label="Nach unten scrollen">{icon("arrow-down")}</a>
</section>"""
    ld = {
        "@context": "https://schema.org", "@type": "LocalBusiness", "name": "Clean Crew",
        "slogan": SITE["slogan"], "description": SITE["intro"],
        "makesOffer": [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": s["title"]}} for s in SERVICES],
    }
    head = f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>'
    body = hero + services_grid() + about_block() + why_grid() + before_after(True) + pricing_note() + cta_band()
    return layout("index.html", "Clean Crew – Hofreinigung, Gartenpflege & Autowäsche",
                  "Clean Crew kümmert sich um Sauberkeit und gepflegte Außenbereiche: Straßen- und Hofreinigung, "
                  "Laubentfernung, Rasenpflege und Autowäsche. Jetzt Angebot anfragen.", body, extra_head=head)


IMPRESSUM = """
<div><h2>Angaben gemäß § 5 DDG</h2>
<p><strong>Clean Crew</strong><br>[Vor- und Nachname der Inhaber]<br>[Straße und Hausnummer]<br>[PLZ Ort]</p></div>
<div><h2>Kontakt</h2><p>Telefon: [Telefonnummer]<br>E-Mail: [E-Mail-Adresse]</p></div>
<div><h2>Umsatzsteuer</h2><p>[Umsatzsteuer-ID oder Hinweis auf Kleinunternehmerregelung nach § 19 UStG]</p></div>
<div><h2>Verantwortlich für den Inhalt</h2><p>[Name, Anschrift]</p></div>"""

DATENSCHUTZ = """
<div><h2>1. Verantwortliche Stelle</h2>
<p>Clean Crew, [Vor- und Nachname], [Straße Hausnummer], [PLZ Ort], E-Mail: [E-Mail-Adresse]</p></div>
<div><h2>2. Kontaktformular</h2>
<p>Das Kontaktformular auf dieser Website überträgt keine Daten an einen Server. Beim Absenden öffnet sich euer
E-Mail-Programm bzw. WhatsApp mit einer vorbereiteten Nachricht, die ihr selbst abschickt. Die Angaben aus dieser
Nachricht (Name, Telefonnummer oder E-Mail-Adresse, gewünschte Dienstleistung, Einsatzort und Nachricht) verwenden
wir, um eure Anfrage zu bearbeiten und euch ein Angebot zu erstellen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
DSGVO. Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine
gesetzlichen Aufbewahrungspflichten bestehen.</p></div>
<div><h2>3. Hosting</h2>
<p>Diese Website wird über GitHub Pages (GitHub, Inc., USA) bereitgestellt. Beim Aufruf verarbeitet der Anbieter
technisch notwendige Daten wie eure IP-Adresse. [Angaben zu Server-Logfiles und Drittlandübermittlung ergänzen]</p></div>
<div><h2>4. Schriftarten</h2>
<p>Diese Website nutzt Schriftarten von Google Fonts. Beim Aufruf der Seite wird eine Verbindung zu Servern von
Google hergestellt. [Rechtliche Bewertung bzw. Hinweis ergänzen]</p></div>
<div><h2>5. WhatsApp</h2>
<p>Wenn ihr uns über den WhatsApp-Button kontaktiert, gelten die Datenschutzbestimmungen von WhatsApp.
[Hinweis ergänzen]</p></div>
<div><h2>6. Eure Rechte</h2>
<p>Ihr habt jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
Datenübertragbarkeit sowie Widerspruch. Außerdem könnt ihr euch bei einer Datenschutz-Aufsichtsbehörde
beschweren.</p></div>"""

NOT_FOUND = """
<section class="notfound"><div>
  <h1>404</h1><h2>Seite nicht gefunden</h2><p>Diese Seite gibt es leider nicht (mehr).</p>
  <a class="btn btn-primary" href="index.html">Zur Startseite</a>
</div></section>"""

PAGES = {
    "index.html": home,
    "leistungen.html": lambda: layout(
        "leistungen.html", "Leistungen – Hofreinigung, Laub, Rasen & Autowäsche | Clean Crew",
        "Straßen- und Hofreinigung, Laubentfernung, Rasenpflege und Autowäsche von Clean Crew. "
        "Gründlich, zuverlässig und zu fairen Preisen.",
        page_hero("Unsere Dienstleistungen", "Saubere Arbeit für Hof, Garten und Auto.",
                  "Ob einmalig oder regelmäßig – wir übernehmen die Arbeit, ihr genießt das Ergebnis.")
        + services_detail() + pricing_note() + cta_band()),
    "ueber-uns.html": lambda: layout(
        "ueber-uns.html", "Über uns – das junge Zweierteam | Clean Crew",
        "Wir sind Clean Crew – ein motiviertes Zweierteam, das Wert auf Zuverlässigkeit, Sorgfalt und "
        "saubere Arbeit legt.",
        page_hero("Über uns", "Zwei Leute. Ein Ziel: glänzende Ergebnisse.",
                  "Wir nehmen euch die Arbeit ab – zuverlässig, sorgfältig und mit Freude an sauberen Ergebnissen.")
        + about_block(False) + why_grid() + cta_band()),
    "arbeiten.html": lambda: layout(
        "arbeiten.html", "Unsere Arbeiten – Galerie & Vorher-Nachher | Clean Crew",
        "Eindrücke unserer Arbeit: Hofreinigung, Laubentfernung, Rasenpflege und Autowäsche im "
        "Vorher-Nachher-Vergleich.",
        page_hero("Unsere Arbeiten", "Sauberkeit, die man sieht.",
                  "Vorher, nachher und alles dazwischen – ein Blick auf das, was wir tun.")
        + before_after() + gallery() + cta_band()),
    "preise.html": lambda: layout(
        "preise.html", "Preise & Angebote – unverbindlich anfragen | Clean Crew",
        "Jeder Auftrag ist individuell. Kontaktiert Clean Crew für ein unverbindliches und faires Angebot.",
        page_hero("Preise & Angebote", "Faire Preise. Individuell für euren Auftrag.",
                  "Keine Pauschalen von der Stange – ihr bekommt ein Angebot, das zu eurem Auftrag passt.")
        + steps() + pricing_note()),
    "kontakt.html": lambda: layout(
        "kontakt.html", "Kontakt – Angebot anfragen | Clean Crew",
        "Fragt jetzt euer unverbindliches Angebot bei Clean Crew an – für Hofreinigung, Laubentfernung, "
        "Rasenpflege oder Autowäsche.",
        page_hero("Kontakt", "Jetzt Angebot anfragen.",
                  "Erzählt uns kurz, was ihr braucht – wir melden uns mit einem unverbindlichen und fairen Angebot.")
        + contact_section()),
    "impressum.html": lambda: layout(
        "impressum.html", "Impressum | Clean Crew", "Impressum und Anbieterkennzeichnung von Clean Crew.",
        legal("Impressum", IMPRESSUM), noindex=True),
    "datenschutz.html": lambda: layout(
        "datenschutz.html", "Datenschutzerklärung | Clean Crew",
        "Informationen zur Verarbeitung personenbezogener Daten auf der Website von Clean Crew.",
        legal("Datenschutzerklärung", DATENSCHUTZ), noindex=True),
    "404.html": lambda: layout("404.html", "Seite nicht gefunden | Clean Crew",
                               "Diese Seite gibt es leider nicht.", NOT_FOUND, noindex=True),
}

if __name__ == "__main__":
    for name, fn in PAGES.items():
        (ROOT / name).write_text(fn(), encoding="utf-8")
        print("✓", name)
