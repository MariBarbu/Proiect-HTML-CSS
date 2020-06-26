const container= document.querySelector("#lista-produse");
const adaugaBtn=document.querySelector("#adauga-btn");
//const updateBtn=document.querySelector("#update-btn");
//console.log(updateBtn);




function initMenuItems() {
    const starsArray = document.querySelectorAll(".fa-star"); //lista cu produse favorite
    const trashArray = document.querySelectorAll(".fa-trash"); //lista cu produse de sters
    const buyArray = document.querySelectorAll("#Cumpara"); //lista cu produse de cumparat
    const updArray = document.querySelectorAll(".fa-refresh"); //lista cu elemente de updatat
    const FArray = document.querySelectorAll("#submit"); //pentru feedback
    //console.log(FArray);


    FArray.forEach(ob=>{
        ob.addEventListener("click", async function (){
            let id = ob.parentElement.parentElement.parentElement.dataset.id;
            let F1= ob.parentElement.parentElement.querySelector("#feedback1").value;
            let F2= ob.parentElement.parentElement.querySelector("#feedback2").value;
            let F3= ob.parentElement.parentElement.querySelector("#feedback3").value;
            let feedback={
                id: id,
                F1: F1,
                F2: F2,
                F3: F3,
                user: localStorage.getItem("User curent")
//trimit feedback ul catre server 
            }
            let URL = "http://localhost:5000/update-feedback/";
            const newList = await updateFeedbackProdus(URL, feedback);
//vreau sa afisez produsele pentru care am dat feedback, fara acel form pentru feedback
            afiseazaProduse(newList);
        })
    });

   async function updateFeedbackProdus(url='', data={}){
        const response=await fetch(url, {
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();}


    //console.log(updArray);
    starsArray.forEach(star => {
        star.addEventListener("click", function () {
            star.classList.toggle("favourite"); //facem steluta galbena
        })
    });

    let cumparaturi=[]; //aici o sa am cumparaturile
    let produs=[]; //asta e doar ca sa folosesc si concat:))
    buyArray.forEach(obiect => {
        obiect.addEventListener("click", function () {
            if(cumparaturi.includes(obiect.parentElement.parentElement.dataset.id)) //daca elementul se afla deja in cumparaturi
            {
                let confirm=window.confirm("Adaugati din nou acest produs?");
                if(confirm)
                {
                    produs.push(obiect.parentElement.parentElement.dataset.id);
                    cumparaturi=cumparaturi.concat(produs);
                    produs.pop();
                    alert("Produs adaugat!");
                }
                else{
                    alert("Comanda anulata");
                }

            }
            else
            {
                cumparaturi.push(obiect.parentElement.parentElement.dataset.id);
                let confirm=window.confirm("Adaugati acest produs in cosul de cumparaturi?");
                
                if(confirm) {
                    alert('Produs adaugat cu succes!');
                }
                else
                    {
                        cumparaturi.pop();
                        alert('Comanda anulata!');
                    }
                }
            cumparaturi.sort();
        })
    });
    trashArray.forEach(trash => {
        trash.addEventListener("click", async function () {
            let id = trash.parentElement.parentElement.dataset.id;
            let URL = "http://localhost:5000/sterge-produs/" + id;
            const newObjectList = await deleteProdus(URL);
            afiseazaProduse(newObjectList)
        })
    });

updArray.forEach(obiect=>{
    obiect.addEventListener("click", async function(){
        let id=obiect.parentElement.parentElement.parentElement.dataset.id;
        let URL = "http://localhost:5000/update-produs/";
        const updateBtn=document.querySelector(".update-btn");
        //console.log(this);
        
         updateBtn.addEventListener("click", async function () {
            //console.log(updateBtn);
            //console.log("GOT IT");
            const upnume = document.querySelector("#upnume").value;
            const uppret = document.querySelector("#uppret").value;
            //console.log(upnume);
        
            const UpProdus = {
                id: id,
                upnume,
                uppret
            }
            //console.log("Produs: ", UpProdus);
        const newObjectList = await updateProdus(URL, UpProdus);
        afiseazaProduse(newObjectList);
    } )
})
});
    
}

async function afiseazaProduse(ProduseArray){

    container.innerHTML = ''

    ProduseArray.forEach(produs => {
        let tempProdus="";
        let ok=0;
        for(i of produs.useri){
            if(localStorage.getItem("User curent")== i)
                {ok=1;}
        }
        if(ok==1){
            tempProdus = `<div class="item" data-id=${produs.id}>
            <h3>Nume: ${produs.nume}</h3>
            <h3>Pret: ${produs.pret}</h3>
            <img src="../public/imagini/car4.png" alt="imagine-caine">
            <div class="menu">

                <button id="Cumpara">Cumpara</button>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-trash" aria-hidden="true"></i>
                <div class="dropdown">
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                    <div class="dropdown-form">
                        <span class="label">Nume:</span> <input type="text" id="upnume" /><br>
                        <span class="label">Pret:</span><input type="text" id="uppret"/><br>
                        <br>
                        <button class="update-btn">Update produs</button>
                    </div>
                    </div>
                    <br><br>
                    <div id="fb">
                    <h3> Medie generala: ${produs.MT}</h3>
                    <h3> Medie utilitate: ${produs.M1}</h3>
                    <h3> Medie aspect: ${produs.M2}</h3>
                    <h3> Medie garantie: ${produs.M3}</h3>
                    </div>
            </div>`
        }
        else{
            tempProdus = `<div class="item" data-id=${produs.id}>
            <h3>Nume: ${produs.nume}</h3>
            <h3>Pret: ${produs.pret}</h3>
            <img src="../public/imagini/car4.png" alt="imagine-caine">
            <div class="menu">

                <button id="Cumpara">Cumpara</button>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-trash" aria-hidden="true"></i>
                <div class="dropdown">
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                    <div class="dropdown-form">
                        <span class="label">Nume:</span> <input type="text" id="upnume" /><br>
                        <span class="label">Pret:</span><input type="text" id="uppret"/><br>
                        <br>
                        <button class="update-btn">Update produs</button>
                    </div>
                    </div>
                    <br><br>
                    <div id="fb">
                    <label for="feedback1">Utilitate produse:</label>
                    <input type="range" id="feedback1" name="feedback1" min="0" max="5"><br><br>
                    <label for="feedback2">Aspect produse:</label>
                    <input type="range" id="feedback2" name="feedback2" min="0" max="5"><br><br>
                    <label for="feedback3">Garantie produse:</label>
                    <input type="range" id="feedback3" name="feedback3" min="0" max="5"><br><br>
                    <button id="submit" class="button">Submit feedback</button>
                    <h3> Medie generala: ${produs.MT}</h3>
                    <h3> Medie utilitate: ${produs.M1}</h3>
                    <h3> Medie aspect: ${produs.M2}</h3>
                    <h3> Medie garantie: ${produs.M3}</h3>
                    </div>
            </div>`
            }
            
        container.insertAdjacentHTML("beforeend", tempProdus);
    });

    initMenuItems();


}


adaugaBtn.addEventListener("click", async function () {
    const nume = document.querySelector("#nume").value;
    const pret = document.querySelector("#pret").value;

    const newProdus = {
        nume,
        pret
    }

    const newObjectList = await postData('http://localhost:5000/adauga-produs', newProdus)
    afiseazaProduse(newObjectList)
    //document.querySelector('input').reset();
});

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(response.status==400) //bad request
    {swal.fire({
        title: 'Camp necompletat!',
      text: 'Va rugam sa completati toate campurile',
     icon: 'warning',
     confirmButtonText: 'Got it'

    });
    }
    else{
        return response.json();
    }
}

async function deleteProdus(url = '') {
    const response = await fetch(url, {
        method: 'DELETE'
    });
    return response.json();
}

async function afis(){
    const response = await fetch('http://localhost:5000/lista-produse');
    const ProduseArray = await response.json();
    afiseazaProduse(ProduseArray);
}
afis();
async function updateProdus(url='', data={}){
    const response=await fetch(url, {
        method:'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(response.status==400)
    {swal.fire({
        title: 'Camp necompletat!',
      text: 'Va rugam sa completati cel putin un camp',
     icon: 'warning',
     confirmButtonText: 'Got it'

    });
    }
    else{
        return response.json();
    }
}

let search=document.getElementById("search").value;

