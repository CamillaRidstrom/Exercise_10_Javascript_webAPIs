const outputTextArea2 = document.getElementById('xOutput');
const xButton = document.getElementById('xButton');

function getAPI(){
    
    const fullURI = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1'


    fetch(fullURI, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then((res) => { //res = response
            if (!res.ok) {
                console.log('Något gick fel vid inhämtning av data.');
                throw new Error("Något gick fel vid inhämtning av data.");
            }
            return res.json();
        })

        .then((data) => {
        //console.log(data);
            if (data.cards.length > 0) {
                const resultText = data.cards.map(kort => `Suit:\t\t\t${kort.suit}\nValue:\t\t${kort.value}\nAdress:\t\t${kort.image}`);
                outputTextArea2.value = resultText;
                let minURL1 = ""; //Används till Lösning 1
                let minURL2 = ""; //Används till Lösning 2
                let minALT = ""; 
                data.cards.forEach(Banan =>{
                    minURL1 = `"${Banan.image}"`; //Används till Lösning 1
                    minURL2 = `${Banan.image}`;   //Används till Lösning 2
                    minALT = `"Ett spelkort som visar ${Banan.value} ${Banan.suit}"`;
                    
                    //console.log(minURL1); 
                    //console.log(minURL2);
                    //console.log(minALT);
                });
                /* Lösning 1: Löser uppgiften - men utan createElement */

                // var myConcatinate = "<img src=" + minURL1 + " alt=" + minALT + ">";
                // var imageHtml = "'" + myConcatinate + "'";
                // //console.log(myConcatinate);
                // //console.log(imageHtml);
                // var dynamicContentDiv = document.getElementById("dynamic-content");
                // dynamicContentDiv.innerHTML = imageHtml;

                /* Lösning 2: Löser uppgiften - MED createElement: */

                let newImage = document.createElement("img");
                newImage.setAttribute("src", minURL2);
                newImage.setAttribute("alt", minALT);

                let dynamicContentDiv = document.getElementById("dynamic-content");
                dynamicContentDiv.innerHTML = "";
                dynamicContentDiv.appendChild(newImage);
            }
            else {
             outputTextArea2.value = "Ingen information hittades om det dragna kortet.";
            }   
         
        })
        .catch((err) => {
            console.error(err);
            outputTextArea2.value = "Ett fel uppstod vid hämtning av data.";
        });
}

xButton.addEventListener('click', getAPI);{}

