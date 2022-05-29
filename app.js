const X_CLASS = "x";
const CIRKEL_CLASS = "cirkel";
const VINST_KOMBINATIONER = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const rutaElements = document.querySelectorAll("[data-ruta]");
const spelplan = document.getElementById("spelplan");
const vinnarMeddelandeElement = document.getElementById("vinnarMeddelande");
const restartButton = document.getElementById("restartButton")
const vinnarTextMeddelandeElement = document.querySelector(
  "[data-vinnar-meddelande-text]");
let cirkelTur;

startaSpel();

restartButton.addEventListener("click", startaSpel)

function startaSpel() {
  cirkelTur = false;
  rutaElements.forEach((ruta) => {
      ruta.classList.remove(X_CLASS)
      ruta.classList.remove(CIRKEL_CLASS)
      ruta.removeEventListener("click", hanteraClick)
    ruta.addEventListener("click", hanteraClick, { once: true });
  });
  setSpelplanHoverClass();
  vinnarMeddelandeElement.classList.remove("show")
}

function hanteraClick(e) {
  const ruta = e.target;
  const currentClass = cirkelTur ? CIRKEL_CLASS : X_CLASS;
  placeraMark(ruta, currentClass);
  if (kollaVinst(currentClass)) {
    slutaSpel(false);
  } else if (isDraw()) {
    slutaSpel(true);
  } else {
    bytTur();
    setSpelplanHoverClass();
  }
}

function slutaSpel(draw) {
  if (draw) {
      vinnarTextMeddelandeElement.innerText = "Oavgjort!"
  } else {
    vinnarTextMeddelandeElement.innerText = `${cirkelTur ? "O" : "X"} vinner!`;
  }
  vinnarMeddelandeElement.classList.add("show");
}

function isDraw() {
    return [...rutaElements].every(ruta => {
        return ruta.classList.contains(X_CLASS) || 
        ruta.classList.contains(CIRKEL_CLASS)
    })
}

function placeraMark(ruta, currentClass) {
  ruta.classList.add(currentClass);
}

function bytTur() {
  cirkelTur = !cirkelTur;
}

function setSpelplanHoverClass() {
  spelplan.classList.remove(X_CLASS);
  spelplan.classList.remove(CIRKEL_CLASS);
  if (cirkelTur) {
    spelplan.classList.add(CIRKEL_CLASS);
  } else {
    spelplan.classList.add(X_CLASS);
  }
}

function kollaVinst(currentClass) {
  return VINST_KOMBINATIONER.some((combinations) => {
    return combinations.every((index) => {
      return rutaElements[index].classList.contains(currentClass);
    });
  });
}
