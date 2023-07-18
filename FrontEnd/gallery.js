import { works } from "./apiFetch.js";
import { categories } from "./apiFetch.js";
import { editPage } from "./login.js";
import { modal } from "./modal.js";

/* Export de la fonction "generateGallery" dans "modale.js"
pour actualisation de l'affichage des "Galleries"
après ajout ou suppression d'un projet.*/
export { generateGallery };

// Fonction qui génère la galerie
function generateGallery(works) {
  for (let i of works) {
    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    figure.dataset.id = i.id;
    const img = document.createElement("img");
    img.src = i.imageUrl;
    img.alt = i.title;
    img.crossOrigin = "";
    const figCaption = document.createElement("figcaption");
    figCaption.innerText = i.title;
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figCaption);
  }
}

generateGallery(works);

/* ------Filtres------ */

const categoryTous = { id: 0, name: "Tous" };
categories.unshift(categoryTous);

// Parcours des datas depuis "CATEGORIES": ajout dans html + création des boutons filtres.
for (let i of categories) {
  const filterCategories = document.querySelector(".filtersGallery");
  const btnCategories = document.createElement("button");
  btnCategories.innerText = i.name;
  btnCategories.addEventListener("click", function () {
    filterCategory(i.id);
  });
  filterCategories.appendChild(btnCategories);
}

// Fonction qui filtre la galerie avec les boutons.
function filterCategory(categoryBtnId) {
  if (categoryBtnId == categoryTous.id) {
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(works);
  } else {
    const filteredWorks = works.filter(function (work) {
      return work.categoryId == categoryBtnId;
    });
    //affiche la galerie filtrée:
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(filteredWorks);
  }
}

// ---------------Changement de couleur au click sur les boutons filtres---------------

// Sélection de tous les boutons
const buttons = document.querySelectorAll(".filtersGallery button");

// Parcours tous les <button>
for (let i of buttons) {
  // Ajout d'une class "filter-selected" pour chaque "buttons"
  i.classList.add("filter-selected");
}

// Fonction pour réinitialiser le style de tous les boutons
function resetButtonColors() {
  // "button" parcours chaque élement de "buttons"
  for (let button of buttons) {
    // Les boutons non concernés par le click prendront ce style :
    button.style.backgroundColor = "white";
    button.style.color = "#1D6154";
  }
}

// "button" parcours chaque élement de "buttons"
for (let button of buttons) {
  // Chaque "button" au click
  button.addEventListener("click", function () {
    // Appel de la fonction "resetButtonColors()" qui va réinitialiser le style
    resetButtonColors();
    // Changement de style au bouton cliqué :
    button.style.backgroundColor = "#1D6154";
    button.style.color = "white";
  });
}

editPage(); // permet d'actualiser la page INDEX.HTML si authentifié

modal(); // permet de gérer les projets si authentifié
