// Warten, bis die komplette Seite geladen ist, bevor das Script ausgeführt wird
document.addEventListener("DOMContentLoaded", () => {

  // Zugriff auf die wichtigsten Elemente im Dokument
  const form = document.getElementById("form");           // Das Formular
  const adresse = document.getElementById("adresse");     // Adressbereich (nur bei Abholung sichtbar)
  const bestaetigung = document.getElementById("bestaetigung"); // Bereich für Bestätigung

  // Umschalten Übergabe vs. Abholung
  form.art.forEach(radio => { // Iteriert über beide Radiobuttons ("Übergabe", "Abholung")
    radio.addEventListener("change", () => {
      // Adressfelder nur anzeigen, wenn "Abholung" gewählt ist
      adresse.classList.toggle("hidden", radio.value !== "abholung" || !radio.checked);
    });
  });

  // Formular absenden
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Verhindert, dass die Seite neu lädt

    // Eingaben auslesen
    const art = form.art.value;                          // Übergabeart (Geschäftsstelle oder Abholung)
    const kleidung = document.getElementById("kleidung").value; // Auswahl Kleidung
    const gebiet = document.getElementById("gebiet").value;     // Auswahl Krisengebiet
    const strasse = document.getElementById("strasse").value.trim(); // Straße (falls Abholung)
    const plz = document.getElementById("plz").value.trim();         // Postleitzahl (falls Abholung)

    // Validierung bei Abholung
    if (art === "abholung") {
      // Prüfen, ob PLZ genau 5 Ziffern hat
      if (!/^[0-9]{5}$/.test(plz)) {
        alert("Bitte eine gültige 5-stellige Postleitzahl eingeben!");
        return; // Bricht die Registrierung ab
      }

      // Prüfen, ob die ersten beiden Ziffern mit "12" (Geschäftsstelle) übereinstimmen
      if (plz.substring(0, 2) !== "12") {
        alert("Abholung nur im PLZ-Bereich 12 möglich!");
        return; // Registrierung abgebrochen
      }
    }

    // Erfolgreiche Registrierung → Bestätigung erstellen
    const datum = new Date().toLocaleString(); // Aktuelles Datum + Uhrzeit
    const ort = art === "abholung"
      ? `Abholung, ${strasse}, ${plz}`         // Adresse, wenn Abholung
      : "Übergabe an Geschäftsstelle";         // Text, wenn Geschäftsstelle

    // Bestätigung in den Bestätigungsbereich einfügen
    bestaetigung.textContent =
      `✅ Spende erfolgreich registriert: ${kleidung}, ${gebiet}, ${datum}, ${ort}`;
    bestaetigung.classList.remove("hidden"); // Bereich sichtbar machen

    // Formular zurücksetzen (Eingaben leeren)
    form.reset();
    adresse.classList.add("hidden"); // Adressfelder wieder verstecken
  });
});

