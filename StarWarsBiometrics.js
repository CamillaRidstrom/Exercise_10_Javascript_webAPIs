const characterNameInput = document.getElementById('characterName');
const outputTextArea = document.getElementById('output');
const fetchButton = document.getElementById('fetchButton');

function getAPI(){
    const characterName = characterNameInput.value.trim().toLowerCase();
    if (characterName === "") {
        alert("Ange en Star Wars-karaktär.");
        return;
    }
    const fullURI = 'https://www.swapi.tech/api/people/?name=' + characterName;

    fetch(fullURI, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then((res) => { //res = response
            if (!res.ok) {
                throw new Error("Något gick fel vid inhämtning av data.");
            }
            return res.json();
        })

        .then((data) => {
            //console.log(data);
            if (data.result.length > 0) {
                const resultText = data.result.map(character => `Name:\t\t${character.properties.name}\nHeight:\t\t${character.properties.height}\nMass:\t\t${character.properties.mass}\nGender:\t\t${character.properties.gender}\nHair color:\t${character.properties.hair_color}`);
                /* ForEach-lösning som jag fick av Jonathan (funkar också): */
                // let resultText = "";
                // data.result.forEach(character =>{
                //      resultText += `Name:\t\t${character.properties.name}\nHeight:\t\t${character.properties.height}\nMass:\t\t${character.properties.mass}\nGender:\t\t${character.properties.gender}\nHair color:\t${character.properties.hair_color}`
                // });
                outputTextArea.value = resultText;
            }
            else {
             outputTextArea.value = "Ingen information hittades för den angivna karaktären.";
            }   
         
        })
        .catch((err) => {
            console.error(err);
            outputTextArea.value = "Ett fel uppstod vid hämtning av data.";
        });
}

fetchButton.addEventListener('click', getAPI);{}

