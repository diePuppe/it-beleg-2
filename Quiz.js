"use strict";

// Elemente abrufen
const knopf1 = document.getElementById("knopf1");
const knopf2 = document.getElementById("knopf2");
const knopf3 = document.getElementById("knopf3");
const knopf4 = document.getElementById("knopf4");
const beendenKnopf = document.getElementById("beendenKnopf");
const frageElement = document.getElementById("frage");
const punkteAnzeige = document.getElementById("punkteAnzeige");
const fortschritt = document.getElementById("fortschritt");

// Variablen initialisieren
let antwortAusgewaehlt = false;
let ausgewaehlterKnopf;
let timer;
let frageLaenge;
const indexArray = Array.from({ length: 32 }, (_, i) => i + 2);
let kategorie = "teil-noten";
let punkte = 0;
let frageIndex;
let ausgewaehlteAntwort;
let frageAnzahl = 0;
const maxFragen = 3;

// Eventlistener hinzufügen
for (let i = 1; i <= 4; i++) {
    knopfListener(i);
}
beendenKnopf.addEventListener("click", beendenSpiel);

// Fetch API - Frage abrufen
function frageHolen() {
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
    fetch(`https://irene.informatik.htw-dresden.de:8888/api/quizzes/${frage.id}/solve`, {
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
                console.log(ausgewaehlteAntwort + " " + frage.id);


            }
            farbeAendern(data.success);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
    if (frageAnzahl < maxFragen) {
        frageHolen();
        const fortschrittProzent = parseFloat((frageAnzahl / maxFragen) * 100).toFixed(2);
        fortschritt.style.width = fortschrittProzent + "%";
        fortschritt.innerText = fortschrittProzent + "%";
        punkteAnzeige.innerText = "Punkte: " + punkte;
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
frageHolen();

// Spiel beenden
function beendenSpiel() {
    window.location.href = "Startseite.html";
    alert("Du hast " + punkte + " Punkte erreicht");
}