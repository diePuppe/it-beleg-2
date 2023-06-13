"use strict";

// Elemente abrufen
const frageElement = document.getElementById("frage");
const knopf1 = document.getElementById("knopf1");
const knopf2 = document.getElementById("knopf2");
const knopf3 = document.getElementById("knopf3");
const knopf4 = document.getElementById("knopf4");
const beendenKnopf = document.getElementById("beendenKnopf");
const punkteAnzeige = document.getElementById("punkteAnzeige");
const fortschritt = document.getElementById("fortschritt");
const kategorie = localStorage.getItem('quizModus');

// Variablen initialisieren
let antwortAusgewaehlt = false;
let ausgewaehlterKnopf;
const indexArray = Array.from({ length: 32 }, (_, i) => i + 2);
let punkte = 0;
let frageIndex;
let ausgewaehlteAntwort;
let frageAnzahl = 0;
const maxFragen = 3;
let fragenListe = [];
let fragenListeLaenge;

// Eventlistener hinzufügen
for (let i = 1; i <= 4; i++) {
    knopfListener(i);
}
beendenKnopf.addEventListener("click", beendenSpiel);

// Fragen aus der JSON-Datei abrufen (Offline) oder über die API (Online)
function frageHolen() {
    if (kategorie === 'quiz') {
        fetch(`https://irene.informatik.htw-dresden.de:8888/api/quizzes/${zufaelligerIndex()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa('test@gmail.com:secret')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                frageAnzeigen(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
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
    }
}
function zufaelligeFrageAnzeigen(kategorie) {
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
// Eventlistener für Antwort-Buttons hinzufügen
function knopfListener(nummer) {
    document.getElementById(`knopf${nummer}`).addEventListener("click", function () {
        if (!antwortAusgewaehlt) {
            ausgewaehlteAntwort = nummer;
            ausgewaehlterKnopf = nummer;
            ueberpruefen();
            antwortAusgewaehlt = true;
        }
    });
}

// Frage und Antwortmöglichkeiten anzeigen
function frageAnzeigen(frage) {
    frageElement.innerText = frage.text;
    knopf1.innerText = frage.options[0];
    knopf2.innerText = frage.options[1];
    knopf3.innerText = frage.options[2];
    knopf4.innerText = frage.options[3];
}

// Antwort überprüfen
function ueberpruefen() {
    if (kategorie === 'quiz') {
        fetch(`https://irene.informatik.htw-dresden.de:8888/api/quizzes/${frageIndex}/solve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa('test@gmail.com:secret')}`
            },
            body: JSON.stringify({
                answer: ausgewaehlteAntwort - 1
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    punkte++;
                    punkteAnzeige.innerText = "Punkte: " + punkte;
                    console.log("punkte");
                } else {
                    console.log(ausgewaehlteAntwort + " " + frageIndex);
                }
                farbeAendern(data.success);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        if (ausgewaehlteAntwort == fragenListe[zufaelligeFrageIndex].a) {
            punkte++;
            punkteAnzeige.innerText = "Punkte: " + punkte;
        }
        farbeAendern();
    }
}

// Zufälligen Index aus dem Index-Array auswählen
function zufaelligerIndex() {
    frageIndex = choice(indexArray);
    indexArray.splice(indexArray.indexOf(frageIndex), 1);
    return frageIndex;
}

// Zufälliges Element aus einem Array auswählen
function choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Hintergrundfarbe der Buttons ändern
function farbeAendern(istRichtig) {
    const knopf = document.getElementById(`knopf${ausgewaehlterKnopf}`);
    const knopfRichtig = document.getElementById("knopf1");

    if (knopf === knopfRichtig) {
        knopf.style.backgroundColor = "green";
    } else {
        knopf.style.backgroundColor = "red";
        knopfRichtig.style.backgroundColor = "green";
    }

    setTimeout(function () {
        knopf.style.backgroundColor = "#3F51B5";
        knopfRichtig.style.backgroundColor = "#3F51B5";

        // Nächste Frage anzeigen, nachdem die Farben zurückgesetzt wurden
        frageAnzahl++;
        naechsteFrage();
    }, 2000);
}

// Nächste Frage anzeigen oder zum Ende weiterleiten
function naechsteFrage() {
    if (kategorie === 'quiz' && frageAnzahl < maxFragen) {
        frageHolen();
        const fortschrittProzent = parseFloat((frageAnzahl / maxFragen) * 100).toFixed(2);
        fortschritt.style.width = fortschrittProzent + "%";
        fortschritt.innerText = fortschrittProzent + "%";
        punkteAnzeige.innerText = "Punkte: " + punkte;
        antwortAusgewaehlt = false;
    } else if (kategorie !== 'quiz' && zufaelligeFrageIndex < fragenListe.length - 1) {
        zufaelligeFrageIndex++;
        frageAnzeigen(fragenListe[zufaelligeFrageIndex]);
        const fortschrittProzent = parseInt(((zufaelligeFrageIndex + 1) / fragenListe.length) * 100);
        fortschritt.style.width = fortschrittProzent + "%";
        fortschritt.innerText = fortschrittProzent + "%";
        prozentAnzeige.innerText = "Frage " + (zufaelligeFrageIndex + 1) + " von " + fragenListe.length;
        antwortAusgewaehlt = false;
    } else {
        weiterleiten();
    }
}

// Zum Spielende weiterleiten
function weiterleiten() {
    setTimeout(function () {
        localStorage.setItem('punkte', punkte);
        window.location.href = "Ende.html";
    }, 1000);
}

// Spiel starten
if (kategorie === 'quiz') {
    frageHolen();
} else {
    // Fragen aus der JSON-Datei abrufen (Offline)
    fetch('fragen.json')
        .then((res) => {
            return res.json();
        })
        .then((geladeneFragen) => {
            fragenListe = geladeneFragen[kategorie];
            fragenListeLaenge = fragenListe.length;
            frageHolen();
        })
        .catch((err) => {
            console.error(err);
        });
}

// Spiel beenden
function beendenSpiel() {
    window.location.href = "Startseite.html";
    alert("Du hast " + punkte + " Punkte erreicht");
}
