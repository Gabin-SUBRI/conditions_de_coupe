const materialData = {
  Acier: { Vc: 80, fz: 0.05 },
  Aluminium: { Vc: 200, fz: 0.1 },
  Cuivre: { Vc: 100, fz: 0.05 },
  Titane: { Vc: 30, fz: 0.02 },
  Bois: { Vc: 300, fz: 0.2 },
  Béton: { Vc: 50, fz: 0.1 },
  Verre: { Vc: 50, fz: 0.02 },
  Plastique: { Vc: 100, fz: 0.1 },
  Céramique: { Vc: 50, fz: 0.02 },
  Carbone: { Vc: 100, fz: 0.05 },
  Caoutchouc: { Vc: 50, fz: 0.1 },
  Liège: { Vc: 200, fz: 0.2 },
  Composite: { Vc: 100, fz: 0.05 },
  Laiton: { Vc: 100, fz: 0.05 },
  Nickel: { Vc: 50, fz: 0.02 },
};

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

    Tous: `<label for="Vc">Vitesse de coupe (Vc) :</label>
           <input type="number" id="Vc">
           <label for="D">Diamètre de l'outil (D) :</label>
           <input type="number" id="D">
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
  let resultN = 0,
    resultVf = 0;

  if (parametre === "n" || parametre === "Tous") {
    const Vc = parseFloat(document.getElementById("Vc").value);
    const D = parseFloat(document.getElementById("D").value);
    if (isNaN(Vc) || isNaN(D) || Vc <= 0 || D <= 0) {
      alert("🛑 Entrez des valeurs valides !");
      return;
    }
    resultN = (1000 * Vc) / (Math.PI * D);
    document.getElementById("n").textContent = resultN.toFixed(2);
  }

  if (parametre === "Vf" || parametre === "Tous") {
    const n = resultN || parseFloat(document.getElementById("n").textContent);
    const fz = parseFloat(document.getElementById("fz").value);
    const Z = parseInt(document.getElementById("Z").value);
    if (isNaN(n) || isNaN(fz) || isNaN(Z) || fz <= 0 || Z <= 0) {
      alert("🛑 Entrez des valeurs valides !");
      return;
    }
    resultVf = n * fz * Z;
    document.getElementById("Vf").textContent = resultVf.toFixed(2);
  }
}

function resetValues() {
  document.getElementById("Vc").value = "";
  document.getElementById("D").value = "";
  document.getElementById("fz").value = "";
  document.getElementById("Z").value = "";
  document.getElementById("n").textContent = "---";
  document.getElementById("Vf").textContent = "---";
}
