"use strict";
// Initialisiere die Bestenliste
let bestList = localStorage.getItem('bestList');
if (!bestList) {
    bestList = [];
} else {
    bestList = JSON.parse(bestList);
}

// Event-Listener für das Formular
document.getElementById("nameForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Verhindert, dass die Seite neu lädt
    let name = document.getElementById("nameInput").value;
    let score = localStorage.getItem('punkte');

    // Füge den neuen Eintrag zur Bestenliste hinzu
    bestList.push({name: name, score: parseInt(score)});

    // Speichere die aktualisierte Bestenliste
    localStorage.setItem('bestList', JSON.stringify(bestList));

    // Zeige die aktualisierte Bestenliste
    displayBestList();
});

// Funktion zum Anzeigen der Bestenliste
function displayBestList() {
    let leaderboardElement = document.getElementById("leaderboard");

    // Lösche alle vorherigen Einträge der Bestenliste
    while (leaderboardElement.rows.length > 1) {
        leaderboardElement.deleteRow(1);
    }

    // Sortiere die Bestenliste in absteigender Reihenfolge der Punkte
    bestList.sort((a, b) => b.score - a.score);

    for (let i = 0; i < bestList.length; i++) {
        let entry = bestList[i];
        let row = leaderboardElement.insertRow(-1);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerText = (i + 1).toString();  // Platz
        cell2.innerText = entry.name;  // Name
        cell3.innerText = entry.score.toString();  // Punkte
    }
}

// Zeige die Bestenliste beim ersten Laden der Seite
displayBestList();

// Zeige Punkte
let punkteAnzeige = document.getElementById("punkteAnzeige"); 
let punkte = localStorage.getItem('punkte');
punkteAnzeige.innerText = "Du hast " + punkte + " Punkte erreicht!";

// Event Listener for Restart Button
document.getElementById("restartButton").addEventListener("click", function () {
    window.location.href = "./Startseite.html";
});
