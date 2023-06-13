"use strict";


// Elemente aus dem DOM abrufen
const frage = document.getElementById("frage");
const knopf1 = document.getElementById("knopf1");
const knopf2 = document.getElementById("knopf2");
const knopf3 = document.getElementById("knopf3");
const knopf4 = document.getElementById("knopf4");
const beendenKnopf = document.getElementById("beendenKnopf");
const punkteAnzeige = document.getElementById("punkteAnzeige");
const prozentAnzeige = document.getElementById("prozentAnzeige");

// Variablen initialisieren
let antwortAusgewaehlt = false;
let ausgewaehlterKnopf;
let fragenListeLaenge;
let kategorie = localStorage.getItem('quizModus');
let punkte = 0;
let zufaelligeFrageIndex = 0;
let ausgewaehlteAntwort;
let zufaelligeFrage;
let fragenListe = [];

// Eventlistener für die Antwortknöpfe hinzufügen
knopf1.addEventListener("click", function () {
    if (!antwortAusgewaehlt) {
        ausgewaehlteAntwort = 1;
        ausgewaehlterKnopf = 1;
        ueberpruefen();
        antwortAusgewaehlt = true;
    }
});

knopf2.addEventListener("click", function () {
    if (!antwortAusgewaehlt) {
        ausgewaehlteAntwort = 2;
        ausgewaehlterKnopf = 2;
        ueberpruefen();
        antwortAusgewaehlt = true;
    }
});

knopf3.addEventListener("click", function () {
    if (!antwortAusgewaehlt) {
        ausgewaehlteAntwort = 3;
        ausgewaehlterKnopf = 3;
        ueberpruefen();
        antwortAusgewaehlt = true;
    }
});

knopf4.addEventListener("click", function () {
    if (!antwortAusgewaehlt) {
        ausgewaehlteAntwort = 4;
        ausgewaehlterKnopf = 4;
        ueberpruefen();
        antwortAusgewaehlt = true;
    }
});

// Eventlistener für den Beenden-Knopf hinzufügen
beendenKnopf.addEventListener("click", function () {
    window.location.href = "Startseite.html";
    alert("Du hast " + punkte + " Punkte erreicht");
});

// Fragen aus der JSON-Datei abrufen (Offline)

fetch('fragen.json')
    .then((res) => {
        return res.json();
    })
    .then((geladeneFragen) => {
        fragenListe = geladeneFragen;
        fragenListeLaenge = fragenListe[kategorie].length;
        zufaelligeFrageAnzeigen(kategorie);
    })
    .catch((err) => {
        console.error(err);
    });

// Funktionen

// Frage und Antwortoptionen anzeigen
function frageAnzeigen(zufaelligeFrage) {
    frage.innerText = zufaelligeFrage.f;
    knopf1.innerText = zufaelligeFrage.l[0];
    knopf2.innerText = zufaelligeFrage.l[1];
    knopf3.innerText = zufaelligeFrage.l[2];
    knopf4.innerText = zufaelligeFrage.l[3];
}

// Zufällige Frage anzeigen
function zufaelligeFrageAnzeigen(kategorie) {
    const fragenListeKategorie = fragenListe[kategorie];
    if (fragenListeKategorie.length > 0) {
        const zufaelligerIndex = Math.floor(Math.random() * fragenListeKategorie.length);
        zufaelligeFrage = fragenListeKategorie[zufaelligerIndex];
        fragenListeKategorie.splice(zufaelligerIndex, 1);
        frageAnzeigen(zufaelligeFrage);
    } else {
        localStorage.setItem('punkte', punkte);
        weiterleiten();
        console.log("Keine Fragen mehr übrig!");
    }
}

// Farbe der Knöpfe ändern
function farbeAendern() {
    let knopf = null;
    let knopfRichtig = null; // Variable deklarieren

    switch (ausgewaehlterKnopf) {
        case 1:
            knopf = knopf1;
            break;
        case 2:
            knopf = knopf2;
            break;
        case 3:
            knopf = knopf3;
            break;
        case 4:
            knopf = knopf4;
            break;
        default:
            console.log("Fehler");
            return;
    }

    if (ausgewaehlteAntwort === zufaelligeFrage.a) {
        knopf.style.backgroundColor = "green";
    } else {
        knopfRichtig = document.getElementById("knopf" + zufaelligeFrage.a);
        knopf.style.backgroundColor = "red";
        knopfRichtig.style.backgroundColor = "green";
    }

    setTimeout(function() {
        knopf.style.backgroundColor = "#3F51B5";
        if (knopfRichtig) { // Überprüfen, ob knopfRichtig definiert ist
            knopfRichtig.style.backgroundColor = "#3F51B5";
        }
        else {
            console.log("Fehler");
        }
    }, 2000);
}

// Antwort überprüfen und Punkte aktualisieren
function ueberpruefen() {
    if (ausgewaehlteAntwort === zufaelligeFrage.a) {
        farbeAendern();
        punkte++;
        punkteAnzeige.innerText = "Punkte: " + punkte;
}
    else {
    farbeAendern();
    }
    setTimeout(function() {
        zufaelligeFrageIndex++;
        naechsteFrage();
    }, 2000);
}


// Nächste Frage anzeigen
function naechsteFrage() {
    const fragenListeKategorie = fragenListe[kategorie];
    zufaelligeFrageAnzeigen(kategorie);
    const fortschritt = document.getElementById("fortschritt");
    console.log(fragenListeLaenge + " " + fragenListe[kategorie].length);
    const fortschrittProzent = parseInt((1 - (( fragenListe[kategorie].length + 2) / (fragenListeLaenge))) * 100);
    fortschritt.style.width = fortschrittProzent + "%";
    prozentAnzeige.innerText = "Frage " + ( (fragenListe[kategorie].length) - fragenListeLaenge)*-1 + " von " + fragenListeLaenge;
    antwortAusgewaehlt = false;
}

// Zur Endseite weiterleiten
function weiterleiten() {
    setTimeout(function () {
        window.location.href = "Ende.html";
    }, 1000);
}