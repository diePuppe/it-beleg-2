
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
let fragenListeLaenge;

let kategorie = "teil-noten";

let punkte = 0;

let zufaelligeFrageIndex = 0;
let ausgewaehlteAntwort;
let zufaelligeFrage;
let fragenListeKategorie;

let fragenListe = [];



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

//Fetch API

// Offline
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

// Online

/* fetch('https://example.com/api/tasks', {
  method: 'GET', 
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});*/

// Funktionen

function frageAnzeigen(zufaelligeFrage) {
    frage.innerText = zufaelligeFrage.f;
    knopf1.innerText = zufaelligeFrage.l[0];
    knopf2.innerText = zufaelligeFrage.l[1];
    knopf3.innerText = zufaelligeFrage.l[2];
    knopf4.innerText = zufaelligeFrage.l[3];
}

function zufaelligeFrageAnzeigen(kategorie) {
    fragenListeKategorie = fragenListe[kategorie];
    if (fragenListeKategorie.length > 0) {
        // Wählen Sie eine zufällige Indexnummer
        let zufaelligerIndex = Math.floor(Math.random() * fragenListeKategorie.length);
        // Wählen Sie die Frage an diesem Index
        zufaelligeFrage = fragenListeKategorie[zufaelligerIndex];

        // Entfernen Sie die Frage aus dem Array, damit sie nicht wiederholt wird
        fragenListeKategorie.splice(zufaelligerIndex, 1);

        // Zeigen Sie die Frage an (Sie müssen diese Funktion entsprechend Ihrer Anwendung anpassen)
        frageAnzeigen(zufaelligeFrage);
    } else {
        console.log("Keine Fragen mehr übrig!");
    }
}

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
            zufaelligeFrageIndex++;
            naechsteFrage();
        }
    },1000); */


function farbeAendern() // Funktion um die Farbe der Knöpfe zu ändern
{
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
    if (ausgewaehlteAntwort == zufaelligeFrage.a) {
        knopf.style.backgroundColor = "green";
    } else {
        knopfRichtig = document.getElementById("knopf" + zufaelligeFrage.a);
        knopf.style.backgroundColor = "red";
        knopfRichtig.style.backgroundColor = "green";

    }

    setTimeout(function() { // Timeout um die Farbe wieder zu ändern
        knopf.style.backgroundColor = "#3F51B5";
        knopfRichtig.style.backgroundColor = "#3F51B5";
    }, 2000);
}
function ueberpruefen() {
    if (ausgewaehlteAntwort == zufaelligeFrage.a) {
        farbeAendern()
        punkte++;
        punkteAnzeige.innerText = "Punkte: " + punkte;
    }
    else {
        console.log("Falsch");
    }
    farbeAendern()


    setTimeout(function() { // Timeout um die Farbe wieder zu ändern
        zufaelligeFrageIndex++;
        naechsteFrage();
    }, 2000);

}

function naechsteFrage() {
    if (!fragenListeKategorie.length == 0) {
        zufaelligeFrageAnzeigen(kategorie);
        let fortschritt = document.getElementById("fortschritt");
        let fortschrittProzent = (fragenListeKategorie.length * 100)/fragenListeLaenge;
        fortschritt.style.width = fortschrittProzent + "%";
        fortschritt.innerText = fortschrittProzent + "%";
        antwortAusgewaehlt = false;
    }
    else {
        weiterleiten();
    }
}


function weiterleiten() {
    setTimeout(function () {
        window.location.href = "Ende.html";
    }, 1000);
}

