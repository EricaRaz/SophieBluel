// Récupération des datas "WORKS" depuis l'API.
const worksAPI = await fetch("http://localhost:5678/api/works");
const works = await worksAPI.json();
export { works };

// Récupération des datas "CATEGORIES" depuis l'API.
const categoriesAPI = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesAPI.json();
export { categories };
