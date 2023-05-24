let frage = document.getElementById("frage");	
let antwort1 = document.getElementById("antwort1");
let antwort2 = document.getElementById("antwort2");
let antwort3 = document.getElementById("antwort3");
let antwort4 = document.getElementById("antwort4");

let aktuelleFrageIndex = 0;

let fragenListe = [
    {
        frage: "Was macht man mit einem Hund ohne Beine",
        auswahl1: "Gassi gehen",
        auswahl2: "Um die Häuser ziehen",
        auswahl3: "Nichts, der kommt eh nicht",
        auswahl4: "Ihn streicheln",
        antwort: 2
    },
    {
        frage: "Was ist der Unterschied zwischen einem Keks und einem Elefanten",
        auswahl1: "Der Keks ist kleiner",
        auswahl2: "Der Elefant ist größer",
        auswahl3: "Der Keks ist zum Essen da",
        auswahl4: "Der Elefant ist ein Tier",
        antwort: 3
    },
    {
        frage: "Wer ist ein ET?",
        auswahl1: "Ein Außerirdischer",
        auswahl2: "Ein Mensch",
        auswahl3: "Ein Tier",
        auswahl4: "Ein Roboter",
        antwort: 1
    }
];

function weiterleiten() {
    setTimeout(function () {
        console.log("Weiterleitung");
    }, 1000);
}

function frageAnzeigen() {
    let aktuelleFrage = fragenListe[aktuelleFrageIndex];
    frage.innerText = aktuelleFrage.frage;
    antwort1.innerText = aktuelleFrage.auswahl1;
    antwort2.innerText = aktuelleFrage.auswahl2;
    antwort3.innerText = aktuelleFrage.auswahl3;
    antwort4.innerText = aktuelleFrage.auswahl4;
}

frageAnzeigen();