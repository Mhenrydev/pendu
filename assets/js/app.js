const MOT_DEVINE = document.getElementById("mot");
const LETTRE_ERROR = document.getElementById("lettre-erreur");
const BTN_REJOUER = document.getElementById("play-bouton");
const MESSAGE = document.getElementById("message-element");
const NOTIF_DOUBLE = document.getElementById("notification-element");
const MESSAGE_FIN = document.querySelector("h2");
const PERSO = document.querySelectorAll(".perso");
const MESSAGE_START = document.getElementById("message-debut");
const BTN_START = document.getElementById("play");
const MOTS = [
  "PORTRAITURERAT",
  "DEBARBOUILLERA",
  "FORNIQUERAIENT",
  "PLANCHEIAIRENT",
  "MILITARISASSES",
  "ENGARGOUSSAMES",
  "CONTREBUTERAIS",
  "TREILLISSERONS",
  "THESAURISERAIS",
  "SURHAUSSERIONS",
  "CLAIRONNERIONS",
  "IMPATRONISERAI",
  "DACTYLOGRAPHIE",
  "COSMOPOLITISME",
];

// Choix d'un mot.
let motSelectionner = MOTS[Math.floor(Math.random() * MOTS.length)];
console.log(motSelectionner);

// Deux tableaux vide, l'un va contenir les mauvaises lettres.
//L'autre les bonnes lettres que devraient contenir le mot selectionné
const lettreCorrectes = [];
const lettreIncorrectes = [];

//Afficher mot

function afficherMot() {
  MOT_DEVINE.innerHTML = `
     ${motSelectionner
       .split("")
       .map(
         (lettre) => `
          <span class="lettre">
            ${lettreCorrectes.includes(lettre) ? lettre : ""}
          </span>
        `
       )
       .join("")}
`;

//on replace nos lettre ensemble sur la meme ligne
  const MOT_INTERNE = MOT_DEVINE.innerText.replace(/\n/g, "");
  console.log(MOT_DEVINE.innerText, MOT_INTERNE);

  //Si mot interne est égal au mot selectionné aleatoirement
  if (MOT_INTERNE == motSelectionner) {
    // MESSAGE_FIN.innerText = 'Bravo! Tu as gagné. ';
    MESSAGE.style.display = "flex";
  }
}

//Lettre incorrect

function updateMauvaiseLettre() {
  // Afficher les mauvaise lettres
  LETTRE_ERROR.innerHTML = `
    ${lettreIncorrectes.map((LETTRE) => `<span> ${LETTRE}</span>`)}  
  `;
  // Afficher le perso

  PERSO.forEach((element, index) => {
    const erreur = lettreIncorrectes.length;

    if (index < erreur) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });

  // Verifier si on a perdu

  if (lettreIncorrectes.length === PERSO.length) {
    MESSAGE_FIN.innerText = "Perdu";
    MESSAGE.style.display = "flex";
  }
}

//Afficher la notification

function afficherNotification() {
  NOTIF_DOUBLE.classList.add("afficher");

  setTimeout(() => {
    NOTIF_DOUBLE.classList.remove("afficher");
  }, 2000);
}

//Evenement d'écoute sur les touches préssé, A-Z keycode compris en 65 et 90

window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    //convertire les keycode en lettre
    const LETTRE = e.key.toUpperCase();

    if (motSelectionner.includes(LETTRE)) {
      if (!lettreCorrectes.includes(LETTRE)) {
        lettreCorrectes.push(LETTRE);

        afficherMot();
      } else {
        afficherNotification();
      }
    } else {
      if (!lettreIncorrectes.includes(LETTRE)) {
        lettreIncorrectes.push(LETTRE);

        updateMauvaiseLettre();
      } else {
        afficherNotification();
      }
    }
  }
});

// Reaload

BTN_REJOUER.addEventListener("click", () => {
  //clear les variable et tableau
  lettreCorrectes.splice(0);
  lettreIncorrectes.splice(0);

  motSelectionner = motSelectionner =
    MOTS[Math.floor(Math.random() * MOTS.length)];
  afficherMot();

  updateMauvaiseLettre();

  MESSAGE.style.display = "none";
});

afficherMot();

BTN_START.addEventListener("click", () => {
 
  MESSAGE_START.style.display = "none";
});

