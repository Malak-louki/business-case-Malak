"use strict";

// Définition de la classe Carousel
class Carousel {
  // Le constructeur prend un élément du DOM en argument
  constructor(el) {
    // Élément DOM sur lequel le carrousel sera attaché
    this.el = el;

    // Options du carrousel (précédent, suivant)
    this.carouselOptions = ["previous", "next"];

    // Données du carrousel (images avec id et source)
    this.carouselData = [
      { id: "1", src: "img/img_caroussel/gojo_car.png" },
      { id: "2", src: "img/img_caroussel/ichigo_car.png" },
      { id: "3", src: "img/img_caroussel/luffy_car.png" },
      { id: "4", src: "img/img_caroussel/zenitsu_car.png" },
      { id: "5", src: "img/img_caroussel/naruto_car.png" },
    ];

    // Ordre actuel des éléments du carrousel
    this.carouselInView = [1, 2, 3, 4, 5];

    // Référence à l'élément du conteneur du carrousel
    this.carouselContainer;

    // État de lecture automatique du carrousel
    this.carouselPlayState;
  }

  // Méthode appelée lors de l'initialisation du carrousel
  mounted() {
    this.setupCarousel();
  }

  // Construit la structure HTML du carrousel
  setupCarousel() {
    const container = document.createElement("div");
    const controls = document.createElement("div");

    // Ajoute le conteneur pour les éléments du carrousel et les contrôles au DOM
    this.el.append(container, controls);
    container.className = "carousel-container";
    controls.className = "carousel-controls";

    // Ajoute chaque élément du carrousel au conteneur
    this.carouselData.forEach((item, index) => {
      const carouselItem = item.src
        ? document.createElement("img")
        : document.createElement("div");

      container.append(carouselItem);

      // Ajoute les attributs à chaque élément du carrousel
      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselItem.src = item.src;
      carouselItem.setAttribute("data-index", `${index + 1}`);
    });

    // Ajoute les boutons de contrôle au conteneur de contrôles
    this.carouselOptions.forEach((option) => {
      const btn = document.createElement("button");
      const axSpan = document.createElement("span");

      axSpan.innerText = option;
      axSpan.className = "ax-hidden";
      btn.append(axSpan);

      btn.className = `carousel-control carousel-control-${option}`;
      btn.setAttribute("data-name", option);

      controls.append(btn);
    });

    // Après le rendu du carrousel dans le DOM, configure les écouteurs d'événements pour les contrôles
    this.setControls([...controls.children]);

    // Stocke la référence au conteneur dans une propriété de la classe
    this.carouselContainer = container;
  }

  // Configure les écouteurs d'événements pour les boutons de contrôle
  setControls(controls) {
    controls.forEach((control) => {
      control.onclick = (event) => {
        event.preventDefault();

        // Gère les actions des contrôles en mettant à jour les données du carrousel et le DOM
        this.controlManager(control.dataset.name);
      };
    });
  }

  // Gère les différentes actions des boutons de contrôle
  controlManager(control) {
    if (control === "previous") return this.previous();
    if (control === "next") return this.next();
    if (control === "add") return this.add();
    if (control === "play") return this.play();

    return;
  }

  // Action pour passer à la diapositive précédente
  previous() {
    // Met à jour l'ordre des éléments dans le tableau de données
    this.carouselData.unshift(this.carouselData.pop());

    // Ajoute le premier élément à la fin du tableau pour que l'élément précédent soit au centre
    this.carouselInView.push(this.carouselInView.shift());

    // Met à jour la classe CSS pour chaque élément du carrousel en vue
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[
        index
      ].className = `carousel-item carousel-item-${item}`;
    });

    // Met à jour le contenu des éléments du carrousel en vue avec les cinq premiers éléments du tableau de données
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  // Action pour passer à la diapositive suivante
  next() {
    // Met à jour l'ordre des éléments dans le tableau de données
    this.carouselData.push(this.carouselData.shift());

    // Prend le dernier élément et l'ajoute au début du tableau pour que l'élément suivant soit au centre
    this.carouselInView.unshift(this.carouselInView.pop());

    // Met à jour la classe CSS pour chaque élément du carrousel en vue
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[
        index
      ].className = `carousel-item carousel-item-${item}`;
    });

    // Met à jour le contenu des éléments du carrousel en vue avec les cinq premiers éléments du tableau de données
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  // Action pour ajouter une nouvelle diapositive
  add() {
    const newItem = {
      id: "",
      src: "",
    };
    const lastItem = this.carouselData.length;
    const lastIndex = this.carouselData.findIndex(
      (item) => item.id == lastItem
    );

    // Affecte les propriétés pour la nouvelle diapositive
    Object.assign(newItem, {
      id: `${lastItem + 1}`,
      src: `http://fakeimg.pl/300/?text=${lastItem + 1}`,
    });

    // Ajoute la nouvelle diapositive à la fin du tableau de données
    this.carouselData.splice(lastIndex + 1, 0, newItem);

    // Décale le carrousel pour afficher la nouvelle diapositive
    this.next();
  }

  // Action pour démarrer ou arrêter la lecture automatique
  play() {
    const playBtn = document.querySelector(".carousel-control-play");
    const startPlaying = () => this.next();

    if (playBtn.classList.contains("playing")) {
      // Retire la classe pour revenir à l'état et à l'apparence du bouton de lecture
      playBtn.classList.remove("playing");

      // Arrête setInterval
      clearInterval(this.carouselPlayState);
      this.carouselPlayState = null;
    } else {
      // Ajoute la classe pour passer à l'état et à l'apparence du bouton de pause
      playBtn.classList.add("playing");

      // Exécute la méthode next une première fois
      this.next();

      // Utilise la propriété de l'état de lecture pour stocker l'ID de l'intervalle et exécute la méthode next toutes les 1,5 secondes
      this.carouselPlayState = setInterval(startPlaying, 1500);
    }
  }
}

// Sélectionne l'élément du DOM pour le carrousel et crée une nouvelle instance de Carousel
const el = document.querySelector(".carousel");
const exampleCarousel = new Carousel(el);

// Initialise le carrousel
exampleCarousel.mounted();
