async function loadGames() {

    const response = await fetch("data/games.json");
    const games = await response.json();

    const container = document.getElementById("games");

    games.forEach(game => {

        const div = document.createElement("div");
        div.className = "game";

        div.innerHTML = `
            <div>🎮 ${game.name}</div>
            <div>${game.year}</div>
            <button onclick="launchGame('${game.name}')">
                JOUER
            </button>
        `;

        container.appendChild(div);

    });
}


function launchGame(name) {

    alert(
        "Préparation du lancement de : " + name
    );

}


loadGames();
