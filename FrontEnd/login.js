/* Récupération des données envoyées dans <form> de login.html 
lors de l'authentification. */
const form = document.querySelector("form");

/* fonction qui gère l'authentification */
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
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
    notif.style.color = "red";
    console.log("Erreur de connexion!");
  }
});

/* Fonction pour récupérer les informations d'authentification 
à partir du "localStorage" 
et test pour appeler la fonction "editPageActivation" si authentifié. */
export function editPage() {
  const state = localStorage.getItem("state");

  if (state === "true") {
    editPageActivation("flex");
    document.getElementById("loginSwitch").style.display = "none";
  } else {
    editPageActivation("none");
    console.log("Vous êtes déconnecté");
  }
}

// Fonction qui retire les boutons filtres.
function noneFiltersGallery(state) {
  const filtersGallery = document.querySelector(".filtersGallery");
  filtersGallery.style.display = state;
}

// Fonction d'actualisation de la page INDEX.HTML en "MODE EDITION" (si authentifié).
function editPageActivation(state) {
  const editMode = document.querySelectorAll(".editMode");
  for (let i of editMode) {
    i.style.display = state;
  }

  let isFiltersGalleryToShow;
  if (state === "flex") {
    isFiltersGalleryToShow = "none";
  } else {
    isFiltersGalleryToShow = "block";
  }
  noneFiltersGallery(isFiltersGalleryToShow);
}

//Fonction deconnexion
const logoutBtn = document.getElementById("logoutSwitch");

logoutBtn?.addEventListener("click", function () {
  localStorage.removeItem("token");
  localStorage.removeItem("state");
  editPageActivation("none");
  document.getElementById("loginSwitch").style.display = "flex";
});
