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

function updateVc() {
  const materialSelect = document.getElementById("material");
  const vcInput = document.getElementById("vcValue");

  const selectedMaterial = materialSelect.value;
  vcInput.value = materialData[selectedMaterial]?.Vc || 0; // Récupération depuis le JS
}

document.getElementById("process").addEventListener("change", function () {
  const process = this.value;
  const inputsDiv = document.getElementById("inputs");
  inputsDiv.innerHTML = ""; // Réinitialiser les champs

  if (process === "tournage") {
    inputsDiv.innerHTML = `
            <label for="diameter">Dm:</label>
            <input type="number" id="diameter">
        `;
  } else if (process === "fraisage") {
    inputsDiv.innerHTML = `
            <label for="dCap">DCap:</label>
            <input type="number" id="dCap">
            <label for="fz">fz:</label>
            <input type="number" id="fz">
            <label for="z">Z</label>
            <input type="number" id="z">
        `;
  } else if (process === "percage") {
    inputsDiv.innerHTML = `
            <label for="fn">Fn:</label>
            <input type="number" id="fn">
            <label for="n">n:</label>
            <input type="number" id="n">
        `;
  }
});

function calculate() {
  const material = document.getElementById("material").value;
  const process = document.getElementById("process").value;
  const Vc = materialData[material]?.Vc || 0;

  if (material === "Selection") {
    document.getElementById("result").innerHTML =
      "<span>⚠️ Veuillez sélectionner un matériau.</span>";
    return;
  }

  let resultText = "";

  if (process === "tournage") {
    const diameter = parseFloat(document.getElementById("diameter").value);
    if (!diameter) {
      resultText = "<span>⚠️ Veuillez entrer un diamètre valide.</span>";
    } else {
      const n = Math.round((Vc * 1000) / (Math.PI * diameter)); // Arrondi
      resultText = `<span>🛠️ Vitesse de broche (n) :</span> <br> <strong>${n} tours/min</strong>`;
    }
  } else if (process === "fraisage") {
    const dCap = parseFloat(document.getElementById("dCap").value);
    const fz = parseFloat(document.getElementById("fz").value);
    const z = parseFloat(document.getElementById("z").value);

    if (!dCap || !fz || !z) {
      resultText = "<span>⚠️ Veuillez entrer tous les paramètres.</span>";
    } else {
      const n = Math.round((Vc * 1000) / (Math.PI * dCap)); // Arrondi
      const Vf = Math.round(n * fz * z); // Arrondi
      resultText = `<span>🛠️ Vitesse de broche (n) :</span> <strong>${n} tours/min</strong><br>
                          <span>🚀 Avance de la table (Vf) :</span> <strong>${Vf} mm/min</strong>`;
    }
  } else if (process === "percage") {
    const fn = parseFloat(document.getElementById("fn").value);
    const n = parseFloat(document.getElementById("n").value);

    if (!fn || !n) {
      resultText = "<span>⚠️ Veuillez entrer les paramètres.</span>";
    } else {
      const Vf = Math.round(fn * n); // Arrondi
      resultText = `<span>🔩 Vitesse de pénétration (Vf) :</span> <strong>${Vf} mm/min</strong>`;
    }
  } else {
    resultText = "<span>💡 Sélectionnez un type d'usinage.</span>";
  }

  document.getElementById("result").innerHTML = resultText;
}

function resetFields() {
  document.getElementById("material").value = "Selection";
  document.getElementById("process").value = "none";
  document.getElementById("inputs").innerHTML = ""; // Supprime les champs
  document.getElementById("result").innerHTML =
    "<small>Les résultats s'afficheront ici.</small>";
}
