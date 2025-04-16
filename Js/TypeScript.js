const txtArray = [
  "Discover and collect unique NFT's",
  "Buy, sell and stock",
  "Your NFT's",
];

// Sélection des éléments HTML avec la classe "anim-txt"
const divText = document.querySelectorAll(".anim-txt");

// Indice de message actuel
let currentIndex = 0;

// Fonction pour animer le texte
function typeText() {
  // Vérifie si tous les messages ont été affichés
  if (currentIndex < txtArray.length) {
    const element = divText[currentIndex]; // Élément HTML actuel
    let charIndex = 0; // Indice de caractère actuel dans le message
    const text = txtArray[currentIndex]; // Message actuel
    element.classList.add("afterActive"); // Ajoute la classe pour l'effet visuel

    // Utilisation de setInterval pour ajouter les caractères un par un
    const intervalId = setInterval(() => {
      element.textContent += text[charIndex]; // Ajout du caractère
      charIndex++;

      // Lorsque tous les caractères du message ont été ajoutés
      if (charIndex === text.length) {
        clearInterval(intervalId); // Arrête l'intervalle

        // Attente de 1,5 secondes, puis passage au message suivant
        setTimeout(() => {
          element.classList.remove("afterActive"); // Supprime la classe pour l'effet visuel
          currentIndex++; // Passe au message suivant
          typeText(); // Appel récursif pour animer le message suivant
        }, 1500);
      }
    }, 50); // Ajoute un caractère toutes les 50 millisecondes
  }
}

// Démarrage de l'animation avec un délai initial de 1 seconde
setTimeout(typeText, 1000);

  