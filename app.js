async function loadGames() {


    const response = await fetch("data/games.json");

    const games = await response.json();


    const container =
        document.getElementById("games");



    games.forEach(game => {


        const div =
            document.createElement("div");

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


        alert("Téléchargement ROM...");



        const response =
            await fetch(path);



        if (!response.ok) {

            throw new Error(
                "ROM introuvable"
            );

        }




        const zipBuffer =
            await response.arrayBuffer();




        alert("Extraction ZIP...");



        const zip =
            await JSZip.loadAsync(zipBuffer);




        let romFile = null;




        for (const file of Object.keys(zip.files)) {


            if (

                file.toLowerCase().endsWith(".md") ||

                file.toLowerCase().endsWith(".bin") ||

                file.toLowerCase().endsWith(".gen")

            ) {


                romFile = file;

                break;

            }

        }




        if (!romFile) {


            throw new Error(
                "Aucune ROM trouvée"
            );

        }




        const romData =
            await zip.files[romFile]
            .async("arraybuffer");





        alert(

            "ROM prête !\n\n" +

            romFile +

            "\n\nTaille : " +

            Math.round(
                romData.byteLength / 1024
            ) +

            " Ko"

        );





        const romBlob =
            new Blob(

                [romData],

                {
                    type:
                    "application/octet-stream"
                }

            );





        const romUrl =
            URL.createObjectURL(
                romBlob
            );





        // Donne la ROM à EmulatorJS

        window.EJS_gameUrl =
            romUrl;



        alert(
            "Chargement de l'émulateur..."
        );




        // Charge EmulatorJS maintenant

        const script =
            document.createElement(
                "script"
            );



        script.src =
        "https://cdn.emulatorjs.org/stable/data/loader.js";



        document.body.appendChild(script);



    }


    catch(error) {


        alert(
            "Erreur : " +
            error.message
        );


    }


}





loadGames();