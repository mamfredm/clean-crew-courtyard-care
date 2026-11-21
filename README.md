# Clean Crew – Website (statische Version für GitHub Pages)

Reines HTML/CSS/JS, kein Build-Tool, keine Datenbank. Läuft direkt auf GitHub Pages.

## Kontaktdaten eintragen
Nur **`config.js`** öffnen und Telefon, E-Mail und Einsatzgebiet eintragen. Fertig.
Ist eine Telefonnummer gesetzt, erscheint der WhatsApp-Button automatisch.

## Kontaktformular
Es gibt keinen Server. Beim Absenden öffnet sich das E-Mail-Programm (oder WhatsApp)
des Besuchers mit einer fertig ausgefüllten Nachricht an euch.

## Texte, Leistungen, Galerie ändern
Alles steht oben in `_src/build.py`. Danach im Hauptordner ausführen:

```
python3 _src/build.py
```

Die `.html`-Dateien werden neu erzeugt. Eigene Fotos als `.webp` in `img/` legen
und in `GALLERY` eintragen; danach `SAMPLE_GALLERY = False` setzen.

## Vor dem Livegang
- Impressum und Datenschutz: Platzhalter in `[eckigen Klammern]` ersetzen und prüfen lassen.
- Google Fonts wird extern geladen – für DSGVO besser lokal einbinden.
