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
    console.log("Connexion réussie !");
    // Traitement de la réponse si la connexion échoue
  } else {
    localStorage.setItem("state", state);
    const notif = document.querySelector(".errorAuthentification");
    notif.innerText = "Veuillez vérifier votre e-mail et votre mot de passe.";
    console.log("Erreur de connexion!");
  }
});
