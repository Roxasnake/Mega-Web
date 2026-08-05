async function loadGames() {

    const response = await fetch("data/games.json");
    const games = await response.json();

    const container = document.getElementById("games");

    games.forEach(game => {

        const div = document.createElement("div");
        div.className = "game";

        div.innerHTML = `
            <h2>🎮 ${game.name}</h2>
            <p>${game.year}</p>
            <button onclick="loadRom('${game.rom}')">
                JOUER
            </button>
        `;

        container.appendChild(div);
    });
}


async function loadRom(path) {

    try {

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error("ROM introuvable");
        }

        const data = await response.arrayBuffer();

        alert(
            "ROM chargée ! Taille : " +
            Math.round(data.byteLength / 1024) +
            " Ko"
        );

    }
    catch(error) {

        alert(error.message);

    }
}


loadGames();
