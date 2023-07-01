const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userInfos = { email, password };

  const authentification = await fetch(
    "http://localhost:5678/api/users/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfos), // datas récupérées en format json.
    }
  );

  const respAuthentification = await authentification.json();
  const token = respAuthentification.token;
  const state = authentification.ok;
  // Traitement de la réponse si la connexion réussit
  if (state === true) {
    localStorage.setItem("token", token);
    localStorage.setItem("state", state);
    window.location.replace("index.html");
    console.log("Connexion réussie!");
    // Traitement de la réponse si la connexion échoue
  } else {
    localStorage.setItem("state", state);
    const notif = document.querySelector(".errorAuthentification");
    notif.innerText = "Veuillez vérifier votre e-mail et votre mot de passe.";
    console.log("Erreur de connexion!");
  }
});

// Fonction pour récupérer les informations d'authentification à partir du "sessionStorage" et test pour appeler la fonction "editModeActivation" si authentifié.
export function editPage() {
  const state = localStorage.getItem("state");

  if (state === "true") {
    editModeActivation("flex");
    document.getElementById("loginSwitch").style.display = "none";
  } else {
    editModeActivation("none");
  }
}

// Fonction d'actualisation de la page INDEX.HTML en "MODE EDITION" (si authentifié).
function editModeActivation(state) {
  const editMode = document.querySelectorAll(".editMode");

  for (let i of editMode) {
    i.style.display = state;
  }
}

//Fonction deconnexion
const logoutBtn = document.getElementById("logoutSwitch");

logoutBtn.addEventListener("click", function () {
  const token = localStorage.getItem("token");
  const state = localStorage.getItem("state");

  localStorage.removeItem("token");
  localStorage.removeItem("state");
  editModeActivation("none");
  document.getElementById("loginSwitch").style.display = "flex";
});
