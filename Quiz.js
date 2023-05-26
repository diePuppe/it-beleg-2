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
let frageLaenge;

let kategorie = "teil-noten";

let punkte = 0;

let frageIndex = 0;
let ausgewaehlteAntwort;
let frage;
let frageAnzahl = 0;




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
/* fetch('frage.json')
    .then((res) => {
        return res.json();
    })
    .then((geladenefrage) => {
        frage = geladenefrage;
        frageLaenge = frage[kategorie].length;
        frageAnzeigen(kategorie);
    })
    .catch((err) => {
        console.error(err);
    });
*/

// Online

function frageHolen() {
    fetch('https://irene.informatik.htw-dresden.de:8888/api/quizzes/2', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('test@gmail.com:secret')
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
            frage = data;
            console.log(frage);
            frageAnzeigen(frage);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};


// Funktionen

function frageAnzeigen(frage) {
    frage.innerText = frage.text;
    knopf1.innerText = frage.options[0];
    knopf2.innerText = frage.options[1];
    knopf3.innerText = frage.options[2];
    knopf4.innerText = frage.options[3];
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
            frageIndex++;
            naechsteFrage();
        }
    },1000); */


function farbeAendern() // Funktion um die Farbe der Knöpfe zu ändern
{
    let knopf = null;
    knopfRichtig = document.getElementById("knopf" + frage.id);

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
    if (ausgewaehlteAntwort == frage.id) {
        knopf.style.backgroundColor = "green";
    } else {
        knopf.style.backgroundColor = "red";
        knopfRichtig.style.backgroundColor = "green";

    }

    setTimeout(function() { // Timeout um die Farbe wieder zu ändern
        knopf.style.backgroundColor = "#3F51B5";
        knopfRichtig.style.backgroundColor = "#3F51B5";
    }, 2000);
}
function ueberpruefen() {
    if (ausgewaehlteAntwort == frage.id) {
        farbeAendern()
        punkte++;
        punkteAnzeige.innerText = "Punkte: " + punkte;
    }
    else {
        console.log("Falsch");
    }
    farbeAendern()


    setTimeout(function() { // Timeout um die Farbe wieder zu ändern
        frageIndex++;
        naechsteFrage();
    }, 2000);

}

function naechsteFrage() {
    if (frageAnzahl < 3) {
        frageHolen();
        let fortschritt = document.getElementById("fortschritt");
        let fortschrittProzent = (frageAnzahl + 1) * 33.33;
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

frageHolen();