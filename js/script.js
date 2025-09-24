document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const adresse = document.getElementById("adresse");
  const bestaetigung = document.getElementById("bestaetigung");

  // Umschalten Übergabe vs. Abholung
  form.art.forEach(radio => {
    radio.addEventListener("change", () => {
      adresse.classList.toggle("hidden", radio.value !== "abholung");
    });
  });

  // Formular absenden
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const art = form.art.value;
    const kleidung = document.getElementById("kleidung").value;
    const gebiet = document.getElementById("gebiet").value;
    const plz = document.getElementById("plz").value.trim();

    // PLZ prüfen nur bei Abholung
    if (art === "abholung") {
      if (!/^[0-9]{5}$/.test(plz)) {
        alert("Bitte gültige 5-stellige PLZ eingeben!");
        return;
      }
      if (plz.substring(0, 2) !== "12") {
        alert("Abholung nur im PLZ-Bereich 12 möglich!");
        return;
      }
    }

    bestaetigung.textContent =
      `Spende registriert: ${kleidung}, ${gebiet}, Übergabeart: ${art}`;
    bestaetigung.classList.remove("hidden");
  });
});
