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


        alert("Téléchargement ROM...");



        const response = await fetch(path);



        if (!response.ok) {

            throw new Error("ROM introuvable");

        }



        const zipBuffer =
            await response.arrayBuffer();




        alert("Ouverture ZIP...");



        const zip =
            await JSZip.loadAsync(zipBuffer);




        let romFile = null;




        for (const fileName of Object.keys(zip.files)) {



            if (

                fileName.toLowerCase().endsWith(".md") ||

                fileName.toLowerCase().endsWith(".bin") ||

                fileName.toLowerCase().endsWith(".gen")

            ) {


                romFile = fileName;

                break;

            }


        }




        if (!romFile) {


            throw new Error(
                "ROM Mega Drive introuvable"
            );


        }




        const rom =
            await zip.files[romFile]
            .async("arraybuffer");





        alert(

            "ROM prête !\n\n" +

            romFile +

            "\n\n" +

            Math.round(rom.byteLength / 1024) +

            " Ko"

        );





        const blob =
            new Blob(

                [rom],

                {
                    type:
                    "application/octet-stream"
                }

            );





        const url =
            URL.createObjectURL(blob);





        /*
          Passage de la ROM à EmulatorJS
        */


        window.EJS_gameUrl = url;



        alert("Démarrage EmulatorJS...");



        /*
          On recharge le loader après
          avoir donné la ROM
        */


        const loader =
            document.createElement("script");



        loader.src =
        "https://cdn.emulatorjs.org/stable/data/loader.js";



        document.body.appendChild(loader);



    }

    catch(error) {


        alert(
            "Erreur : " +
            error.message
        );


    }


}





loadGames();