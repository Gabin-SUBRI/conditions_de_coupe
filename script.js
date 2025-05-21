function updateValues() {
  const material = document.getElementById("material").value;
  const materialData = {
    Aluminium1: { Vc: 200, fz: 0.03 },
    Aluminium2: { Vc: 150, fz: 0.02 },
    Cuivre: { Vc: 140, fz: 0.015 },
  };

  if (materialData[material]) {
    document.getElementById("Vc").value = materialData[material].Vc;
    document.getElementById("fz").value = materialData[material].fz;
  }
}

function afficherQuestionnaire() {
  const parametre = document.getElementById("parametre").value;
  const questionnaire = document.getElementById("questionnaire");
  const inputs = document.getElementById("inputs");

  inputs.innerHTML = "";
  questionnaire.style.display = parametre ? "block" : "none";

  const parametreData = {
    n: `<label for="Vc">Vitesse de coupe (Vc) :</label>
            <input type="number" id="Vc">
            <label for="D">Diamètre de l'outil (D) :</label>
            <input type="number" id="D">`,

    Vf: `<label for="n">Fréquence de rotation (n) :</label>
             <input type="number" id="n">
             <label for="fz">Avance par dent (fz) :</label>
             <input type="number" id="fz">
             <label for="Z">Nombre de dents (Z) :</label>
             <input type="number" id="Z">`,
  };

  if (parametreData[parametre]) {
    inputs.innerHTML = parametreData[parametre];
  }
}

function calculer() {
  const parametre = document.getElementById("parametre").value;
  let result = 0;

  if (parametre === "n") {
    const Vc = parseFloat(document.getElementById("Vc").value);
    const D = parseFloat(document.getElementById("D").value);
    if (isNaN(Vc) || isNaN(D)) return alert("🛑 Entrez des valeurs valides !");
    result = (1000 * Vc) / (Math.PI * D);
    document.getElementById("n").textContent = result.toFixed(2);
  } else if (parametre === "Vf") {
    const n = parseFloat(document.getElementById("n").value);
    const fz = parseFloat(document.getElementById("fz").value);
    const Z = parseInt(document.getElementById("Z").value);
    if (isNaN(n) || isNaN(fz) || isNaN(Z))
      return alert("🛑 Entrez des valeurs valides !");
    result = n * fz * Z;
    document.getElementById("Vf").textContent = result.toFixed(2);
  } else {
    alert("📌 Veuillez sélectionner un paramètre valide.");
  }
}
