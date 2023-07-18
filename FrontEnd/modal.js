import { works } from "./apiFetch.js";
import { categories } from "./apiFetch.js";
import { generateGallery } from "./gallery.js";

/* fonction qui gère l'ouverture et la fermeture de la modale. */

export function modal() {
  const openModal = document.querySelectorAll(".open-modalBtn");
  const closeModal = document.querySelectorAll(".closeBtn");
  const modal = document.querySelector(".modal");

  for (let i of openModal) {
    i.addEventListener("click", function () {
      modal.style.display = "flex";
    });
  }

  for (let i of closeModal) {
    i.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }
  // écouteur d'événement pour fermer la modale en cliquant à l'extérieur de celle-ci.
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

/* Définition du fonctionnement du bouton "backBtn"
dans homepage_edit_2_3 (retour) vers homepage_edit_1 */

const backBtn = document.querySelector(".backBtn");
// Switch "Ajout de photo" à "Suppression de photo".
backBtn.addEventListener("click", function () {
  const homepageEdit1 = document.querySelector(".homepage_edit_1");
  homepageEdit1.style.display = "flex";
  const homepageEdit2 = document.querySelector(".homepage_edit_2_3");
  homepageEdit2.style.display = "none";
});

/* fonction qui génère la galerie de la modale */

function generateGalleryModal(works) {
  for (let i of works) {
    const galleryModal = document.querySelector(".modalGridGallery"); // <div class="modalGridGallery">
    const figureModal = document.createElement("figure"); // <figure data-id="i">
    figureModal.dataset.id = i.id;
    const imgModal = document.createElement("img"); // <img>
    imgModal.src = i.imageUrl;
    imgModal.alt = i.title;
    imgModal.crossOrigin = "";
    // icône agrandir l'image
    const widenImageBtn = document.createElement("button"); // <button class="widenImgBtn">
    widenImageBtn.className = "widenImgBtn";
    const widenImageIcon = document.createElement("i"); // <i class="fa-solid fa-arrows-up-down-left-right">
    widenImageIcon.className = "fa-solid fa-arrows-up-down-left-right";
    // icône supprimer l'image
    const trashBtn = document.createElement("button"); // <button class="trashBtn">
    trashBtn.className = "trashBtn";
    const trashIcon = document.createElement("i"); // <i class="fa-solid fa-trash-can">
    trashIcon.className = "fa-solid fa-trash-can";
    // pour supprimer des photos
    trashBtn.addEventListener("click", function () {
      deletePhoto(i.id);
    });
    // éditer
    const editerBtn = document.createElement("button"); // <button>éditer</button>
    editerBtn.className = "editerBtn";
    editerBtn.innerText = "éditer";
    // rattachement de <figure> dans <div class="modalGridGallery">
    galleryModal.appendChild(figureModal);
    // rattachement de <img> dans <figure>
    figureModal.appendChild(imgModal);
    // rattachement de <button class="widenImgBtn"> dans <figure>
    figureModal.appendChild(widenImageBtn);
    // rattachement de <i class="fa-solid fa-arrows-up-down-left-right"> dans <button class="widenImgBtn">
    widenImageBtn.appendChild(widenImageIcon);
    // rattachement de <button class="trashBtn"> dans <figure>
    figureModal.appendChild(trashBtn);
    // rattachement de <i class="fa-solid fa-trash-can"> dans <button class="trashBtn">
    trashBtn.appendChild(trashIcon);
    // rattachement de <button>éditer</button> dans <figure>
    figureModal.appendChild(editerBtn);
  }
}

generateGalleryModal(works);

/* Récupération du token d'authentification. 
Suppression de photo */

const token = localStorage.getItem("token");

async function deletePhoto(workId) {
  const deleteResponse = await fetch(
    "http://localhost:5678/api/works/" + workId,
    {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    }
  );
  // Si réponse de suppression de l'API est OK, alors on supprime la photo de la gallerie et de la modale
  if (deleteResponse.ok) {
    const photoToRemove = document.querySelectorAll(
      `figure[data-id="${workId}"]`
    );
    for (let i of photoToRemove) {
      i.remove();
    }
    // Suppression de l'élément du tableau "works" correspondant à l'ID de la photo
    const photoIndexToRemove = works.findIndex((work) => workId === work.id);
    // Supprime l'élément du tableau "works" à l'index "workIndexToRemove", "1" élément
    works.splice(photoIndexToRemove, 1);
  } else {
    return alert("Échec suppression");
  }
}

/* Passage de "homepage_edit_1" en "homepage_edit_2" 
si click sur le bouton "Ajouter une photo" 
de la partie "Gallerie / suppresion de projet" de la "MODALE" */

const addBtn = document.querySelector(".addBtn");
// Ajout du Listener sur le bouton "Ajouter une photo"
// et switch de la "MODALE" vers "homepage_edit_2" si cliqué.
addBtn.addEventListener("click", function () {
  const homepage1 = document.querySelector(".homepage_edit_1");
  homepage1.style.display = "none";
  const homepage2 = document.querySelector(".homepage_edit_2_3");
  homepage2.style.display = "flex";
  // Reset du formulaire en cas de changement de projet.
  document.getElementById("addProject").reset();
  document.getElementById("add-fileInputContainer").style.display = "flex";
  const addedPhoto = document.querySelector(".previewFile");
  if (addedPhoto) {
    addedPhoto.remove();
  }
  validBtn.classList.remove("valid");
});

/* Gestion de l'aperçu de l'image choisi dans "homepage_edit_2"
et qui donnera "homepage_edit_3". */

const addFileInput = document.getElementById("add-fileInput");
// Ajout d'un écouteur d'événement sur le bouton "+ Ajouter photo"
addFileInput.addEventListener("change", function () {
  // Vérification de la taille du fichier image soumis dans "+ Ajouter photo" .
  if (addFileInput.files[0].size <= 4 * 1024 * 1024) {
    // Réinitialisation de la zone du DOM dédiée pour l'ajout de photo
    const addFile = document.querySelector(".add-file");
    // addFile.innerHTML = "";
    document.getElementById("add-fileInputContainer").style.display = "none";
    // Création de <img> pour afficher l'image choisie.
    const selectPhoto = document.createElement("img");
    selectPhoto.src = URL.createObjectURL(addFileInput.files[0]);
    selectPhoto.className = "previewFile";
    // Rattachement de <img> dans <div class="add-file">
    addFile.appendChild(selectPhoto);
  } else {
    addFileInput.value = "";
    return alert("Taille de l'image supérieure à 4mo.");
  }
});

/* Injection de la liste des "CATEGORIES" dans <select id="project-category"> 
de la partie "homepage_edit_2" de la "MODALE". */

// Copie du tableau de catégories récupéré précédement via le FETCH
// en enlevant l'index 0 (catégorie "TOUS").
const categoriesModal = categories.slice(0);
// Parcours des données de "categoriesModal" pour les ajouter au HTML
// et créer les options de la liste "SELECT" de la partie "Ajout de projet" de la "MODALE".
for (let i of categoriesModal) {
  // Récupération de l'élément du DOM qui accueillera la liste des catégories.
  const categoryList = document.getElementById("project-category");
  // Création de <option>
  const categoryOption = document.createElement("option");
  categoryOption.value = i.id;
  categoryOption.innerText = i.name;
  // Rattachement de <option> à <select> de "homepage_edit_2"
  categoryList.appendChild(categoryOption);
}

/* Gestion de la validation de <form> de la "MODALE" */

const titleForm = document.getElementById("project-title");
const categoryForm = document.getElementById("project-category");
const validBtn = document.querySelector(".validationBtn");

// si les 3 champs sont remplis => bouton valider se met en vert
function checkForm() {
  if (addFileInput.value && titleForm.value && categoryForm.value) {
    validBtn.classList.add("valid");
  } else {
    validBtn.classList.remove("valid");
  }
}
addFileInput.addEventListener("input", checkForm);
titleForm.addEventListener("input", checkForm);
categoryForm.addEventListener("input", checkForm);

validBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    addFileInput.checkValidity() &&
    titleForm.checkValidity() &&
    categoryForm.checkValidity() === true
  ) {
    // Appel de la fonction pour ajouter le projet à l'API et aux Galeries.
    addWork();
  } else {
    return alert("Veuillez remplir tous les champs du formulaire.");
  }
});

/* Préparation des données du nouveau projet 
et envoi sur l'API "http://localhost:5678/api/works". */

// Fonction d'ajout de projet.
async function addWork() {
  // Création de l'objet formData
  const formData = new FormData();

  formData.append("image", addFileInput.files[0]);
  formData.append("title", titleForm.value);
  formData.append("category", categoryForm.value);

  const addResponse = await fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      accept: "application/json",
    },
    body: formData,
  });

  // Si réponse de d'ajout de l'API est OK, alors on ajoute le projet au DOM (Galeries "accueil et Modale").
  if (addResponse.ok) {
    // Ajoute mon nouveau projet à la fin du tableau "works"
    works.push(await addResponse.json());

    backBtn.click();
    // Réinitialisation du DOM (Galeries "accueil et Modale").
    const galleryModal = document.querySelector(".modalGridGallery");
    const gallery = document.querySelector(".gallery");
    galleryModal.innerHTML = "";
    gallery.innerHTML = "";
    // Regénération des galeries.
    generateGalleryModal(works);
    generateGallery(works);
  } else {
    return alert("Échec de l'ajout du projet");
  }
}
