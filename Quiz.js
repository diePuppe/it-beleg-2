
let frage = document.getElementById("frage");


let knopf1 = document.getElementById("knopf1");
let knopf2 = document.getElementById("knopf2");
let knopf3 = document.getElementById("knopf3");
let knopf4 = document.getElementById("knopf4");
let pauseKnopf = document.getElementById("pauseKnopf");
let beendenKnopf = document.getElementById("beendenKnopf");



let antwortAusgewaehlt = false;
let punkteAnzeige = document.getElementById("punkteAnzeige");
let ausgewaehlterKnopf;
let timer;

let punkte = 0;

let aktuelleFrageIndex = 0;
let ausgewaehlteAntwort;

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

// Eventlistener

knopf1.addEventListener("click", function () {
    if(antwortAusgewaehlt == false) {
        ausgewaehlteAntwort = 1;
        ausgewaehlterKnopf = 1;
        ueberpruefen();
        antwortAusgewaehlt = true;
    }
});

knopf2.addEventListener("click", function () {
    if(antwortAusgewaehlt == false) {
        ausgewaehlteAntwort = 2;
        ausgewaehlterKnopf = 2;
        ueberpruefen();
        antwortAusgewaehlt = true;
    }
});

knopf3.addEventListener("click", function () {
    if(antwortAusgewaehlt == false) {
        ausgewaehlteAntwort = 3;
        ausgewaehlterKnopf = 3;
        ueberpruefen();
        antwortAusgewaehlt = true;
    }
});

knopf4.addEventListener("click", function () {
    if(antwortAusgewaehlt == false) {
        ausgewaehlteAntwort = 4;
        ausgewaehlterKnopf = 4;
        ueberpruefen();
        antwortAusgewaehlt = true;
    }
});


beendenKnopf.addEventListener("click", function () {
    window.location.href = "Startseite.html";
    alert("Du hast " + punkte + " Punkte erreicht");

});



// Funktionen

function frageAnzeigen() {
    let aktuelleFrage = fragenListe[aktuelleFrageIndex];
    frage.innerText = aktuelleFrage.frage;
    knopf1.innerText = aktuelleFrage.auswahl1;
    knopf2.innerText = aktuelleFrage.auswahl2;
    knopf3.innerText = aktuelleFrage.auswahl3;
    knopf4.innerText = aktuelleFrage.auswahl4;

 /*   clearInterval(timer);
    let sekunden = 10;
    timer = setInterval(function () {
        sekunden--;
        if (sekunden < 10) {
            sekunden = "0" + sekunden;
        }
        document.getElementById("sekunden").innerText = sekunden;
        if (sekunden == 0) {
            clearInterval(timer);
            aktuelleFrageIndex++;
            naechsteFrage();
        }
    },1000); */
}

function farbeAendern() // Funktion um die Farbe der Knöpfe zu ändern
{
    let aktuelleFrage = fragenListe[aktuelleFrageIndex];
    let knopf = null;

    switch (ausgewaehlterKnopf) { // Switch-Case um den ausgewählten Knopf zu ermitteln
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
            return;  // Verlässt die Funktion oder den CodeblocK
    }
    if (ausgewaehlteAntwort == aktuelleFrage.antwort) {
        knopf.style.backgroundColor = "green";
    } else {
        knopf.style.backgroundColor = "red";
    }

    setTimeout(function() { // Timeout um die Farbe wieder zu ändern
        knopf.style.backgroundColor = "#3F51B5";
    }, 2000);
}
function ueberpruefen() {
    let aktuelleFrage = fragenListe[aktuelleFrageIndex];

    if (ausgewaehlteAntwort == aktuelleFrage.antwort) {
        farbeAendern()
        punkte++;
        punkteAnzeige.innerText = "Punkte: " + punkte;
    }
    else {
        console.log("Falsch");
    }
    farbeAendern()


    setTimeout(function() { // Timeout um die Farbe wieder zu ändern
        aktuelleFrageIndex++;
        naechsteFrage();
    }, 2000);

}

function naechsteFrage() {
    if (aktuelleFrageIndex < fragenListe.length) {
        frageAnzeigen();
        let fortschritt = document.getElementById("fortschritt");
        let fortschrittProzent = (aktuelleFrageIndex / fragenListe.length) * 100;
        fortschritt.style.width = fortschrittProzent + "%";
        fortschritt.innerText = parseInt(fortschrittProzent) + "%";
        antwortAusgewaehlt = false;
    }
    else {
        console.log("Ende");
        weiterleiten();
    }
}







function weiterleiten() {
    setTimeout(function () {
        window.location.href = "Ende.html";
    }, 1000);
}

frageAnzeigen();