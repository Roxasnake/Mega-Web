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

            <button onclick="playGame('${game.rom}')">
                JOUER
            </button>

        `;


        container.appendChild(div);


    });

}



function playGame(rom) {


    window.location.href =
        "play.html?rom=" +
        encodeURIComponent(rom);


}



loadGames();