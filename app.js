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

        alert("Téléchargement de la ROM...");

        const response = await fetch(path);

        const zipData = await response.arrayBuffer();

        const zip = await JSZip.loadAsync(zipData);

        let romFile = null;

        Object.keys(zip.files).forEach(file => {

            if (
                file.toLowerCase().endsWith(".md") ||
                file.toLowerCase().endsWith(".bin")
            ) {
                romFile = file;
            }

        });


        if (!romFile) {
            throw new Error("Aucune ROM .md ou .bin trouvée");
        }


        const romData = await zip.files[romFile].async("arrayBuffer");


        alert(
            "ROM prête !\n\n" +
            romFile +
            "\n\nTaille : " +
            Math.round(romData.byteLength / 1024) +
            " Ko"
        );


        // Ici viendra l'émulateur Mega Drive


    }
    catch(error) {

        alert("Erreur : " + error.message);

    }
}


loadGames();
