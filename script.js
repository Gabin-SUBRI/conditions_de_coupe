const materialData = {
  Selection: { Vc: 0 },
  Acier: { Vc: 80 },
  Aluminium: { Vc: 200 },
  Cuivre: { Vc: 100 },
  Titane: { Vc: 30 },
  Bois: { Vc: 300 },
  Béton: { Vc: 50 },
  Verre: { Vc: 50 },
  Plastique: { Vc: 100 },
  Céramique: { Vc: 50 },
  Carbone: { Vc: 100 },
  Caoutchouc: { Vc: 50 },
  Liège: { Vc: 200 },
  Composite: { Vc: 100 },
  Laiton: { Vc: 100 },
  Nickel: { Vc: 50 },
};

function afficherQuestionnaire() {
  const parametre = document.getElementById("parametre").value;
  const questionnaire = document.getElementById("questionnaire");
  const inputs = document.getElementById("inputs");

  inputs.innerHTML = "";
  questionnaire.style.display = parametre ? "block" : "none";

  const parametreData = {
    n: `<label for="Vc">Vitesse de coupe (Vc) :</label>
         <label for="D">Diamètre de l'outil (D) :</label>
         <input type="number" id="D">`,

    Vf: `<label for="n">Fréquence de rotation (n) :</label>
         <input type="number" id="n">
         <label for="fz">Avance par dent (fz) :</label>
         <input type="number" id="fz">
         <label for="Z">Nombre de dents (Z) :</label>
         <input type="number" id="Z">`,

    Tous: `<label for="Vc">Vitesse de coupe (Vc) :</label>
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

function calculerN() {
  const Vc = parseFloat(document.getElementById("Vc").value);
  const D = parseFloat(document.getElementById("D").value);

  if (isNaN(Vc) || isNaN(D) || Vc <= 0 || D <= 0) {
    alert("🛑 Entrez des valeurs valides pour n !");
    return;
  }

  const resultN = (1000 * Vc) / (Math.PI * D);
  document.getElementById("n").textContent = resultN.toFixed(2);
}

function calculerVf() {
  let n = parseFloat(document.getElementById("n").value); // 🔥 Récupère `n` de l'input

  if (isNaN(n) || n <= 0) {
    alert("🛑 Entrez une valeur valide pour n avant de calculer Vf !");
    return;
  }

  const fz = parseFloat(document.getElementById("fz").value);
  const Z = parseInt(document.getElementById("Z").value);

  if (isNaN(fz) || isNaN(Z) || fz <= 0 || Z <= 0) {
    alert("🛑 Entrez des valeurs valides pour Vf !");
    return;
  }

  const resultVf = n * fz * Z;
  document.getElementById("Vf").textContent = resultVf.toFixed(2);
}

function calculer() {
  const parametre = document.getElementById("parametre").value;
  let calculatedN = 0,
    resultVf = 0;

  // ✅ Calcul de n en premier
  if (parametre === "n" || parametre === "Tous") {
    calculatedN = calculerN(); // Stocker le n calculé
    document.getElementById("n").textContent = calculatedN.toFixed(2);
  }

  // ✅ Calcul de Vf avec le n déjà défini correctement
  if (parametre === "Vf" || parametre === "Tous") {
    let n = calculatedN || parseFloat(document.getElementById("n").value);

    if (isNaN(n) || n <= 0) {
      alert("🛑 Le n doit être calculé avant Vf !");
      return;
    }

    resultVf = calculerVf(n); // Calculer Vf avec le bon `n`
    document.getElementById("Vf").textContent = resultVf.toFixed(2);
  }
}

function calculerN() {
  const Vc = parseFloat(document.getElementById("Vc").value);
  const D = parseFloat(document.getElementById("D").value);

  if (isNaN(Vc) || isNaN(D) || Vc <= 0 || D <= 0) {
    alert("🛑 Entrez des valeurs valides pour n !");
    return 0;
  }

  return (1000 * Vc) / (Math.PI * D); // Retourner le résultat de n
}

function calculerVf(n) {
  const fz = parseFloat(document.getElementById("fz").value);
  const Z = parseInt(document.getElementById("Z").value);

  if (isNaN(fz) || isNaN(Z) || fz <= 0 || Z <= 0) {
    alert("🛑 Entrez des valeurs valides pour Vf !");
    return 0;
  }

  return n * fz * Z; // Retourner le résultat de Vf
}

function resetValues() {
  // Réinitialiser tous les champs visibles
  document.querySelectorAll("#inputs input").forEach((input) => {
    input.value = "";
  });

  // Réinitialiser les résultats affichés
  document.getElementById("n").textContent = "---";
  document.getElementById("Vf").textContent = "---";

  // Vérifier si l'input n existe et le réinitialiser
  const nInput = document.getElementById("n");
  if (nInput) {
    nInput.value = "";
  }

  // Réinitialisation du choix du paramètre
  document.getElementById("parametre").value = "";

  // Masquer le questionnaire après réinitialisation
  document.getElementById("questionnaire").style.display = "none";
}

function updateValues() {
  const material = document.getElementById("material").value;
  const vcInput = document.getElementById("Vc");

  if (materialData[material]) {
    vcInput.value = materialData[material].Vc;
  }
}
function updateOperation() {
  const operation = document.getElementById("operation").value;
  if (operation === "Selectionner") {
    document.getElementsByClassName("selection").style.display = "none";
  }
  if (operation === "Fraisage") {
    document.getElementById("parametre").style.display = "block";
    document.getElementById("questionnaire").style.display = "none";
  } else {
    document.getElementById("parametre").style.display = "none";
    document.getElementById("questionnaire").style.display = "block";
    document.getElementById("inputs").innerHTML = ""; // Réinitialisation du formulaire

    if (operation === "Perçage") {
      document.getElementById("inputs").innerHTML = `
        <label for="D">Diamètre du foret (D) :</label>
        <input type="number" id="D">
        <label for="Vc">Vitesse de coupe (Vc) :</label>
        <input type="number" id="Vc" readonly>
      `;
    } else if (operation === "Tournage") {
      document.getElementById("inputs").innerHTML = `
        <label for="D">Diamètre de la pièce (D) :</label>
        <input type="number" id="D">
        <label for="Vc">Vitesse de coupe (Vc) :</label>
        <input type="number" id="Vc" readonly>
      `;
    }
  }
}
