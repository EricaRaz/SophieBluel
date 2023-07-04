import { works } from "./gallery.js";
import { categories } from "./gallery.js";
import { generateGallery } from "./gallery.js";

// fonction qui gère l'ouverture et la fermeture de la modale
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

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
