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


        // Téléchargement du ZIP

        const response = await fetch(path);


        if (!response.ok) {

            throw new Error("ROM introuvable");

        }


        const zipData = await response.arrayBuffer();



        // Ouverture du ZIP

        const zip = await JSZip.loadAsync(zipData);



        let romFile = null;



        // Recherche de la ROM Mega Drive

        Object.keys(zip.files).forEach(file => {


            if (

                file.toLowerCase().endsWith(".md") ||

                file.toLowerCase().endsWith(".bin") ||

                file.toLowerCase().endsWith(".gen")

            ) {

                romFile = file;

            }


        });



        if (!romFile) {

            throw new Error(
                "Aucune ROM .md .bin ou .gen trouvée"
            );

        }



        // Extraction de la ROM

        const romData = await zip.files[romFile]
            .async("arraybuffer");



        alert(

            "ROM prête !\n\n" +

            romFile +

            "\n\nTaille : " +

            Math.round(romData.byteLength / 1024) +

            " Ko"

        );



        // Création d'un fichier temporaire navigateur

        const romBlob = new Blob(

            [romData],

            {
                type: "application/octet-stream"
            }

        );



        const romUrl = URL.createObjectURL(romBlob);



        // Envoi à EmulatorJS

        window.EJS_gameUrl = romUrl;



        window.EJS_player = "#game";

        window.EJS_core = "genesis_plus_gx";

        window.EJS_pathtodata =
            "https://cdn.emulatorjs.org/stable/data/";



        // Chargement du moteur

        if (window.EJS_emulator) {


            window.EJS_emulator.start();


        }
        else {


            // Force le chargement EmulatorJS

            const script = document.createElement("script");


            script.src =
            "https://cdn.emulatorjs.org/stable/data/loader.js";


            document.body.appendChild(script);


        }



    }

    catch(error) {


        alert(
            "Erreur : " + error.message
        );


    }


}



loadGames();