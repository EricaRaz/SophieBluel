// Import de la fonction "editMode" à partir de "editMode.js" permettant d'actualiser la page INDEX.HTML si authentifié.
import { editPage } from "./login.js";

// Export de la fonction "generateGallery" dans "modale.js"
// pour actualisation de l'affichage des "Galleries"
// après ajout ou suppression d'un projet.
export { generateGallery };

// Récupération des datas "WORKS" depuis l'API.
const worksAPI = await fetch("http://localhost:5678/api/works");
const works = await worksAPI.json();
export { works };
console.log(works);

// Récupération des datas "CATEGORIES" depuis l'API.
const categoriesAPI = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesAPI.json();
export { categories };
console.log(categories);

// Fonction qui génère la gallerie
function generateGallery(worksArray) {
  for (let i of worksArray) {
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

// Filtres
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

// Fonction qui filtre la gallerie avec les boutons.
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

editPage();
