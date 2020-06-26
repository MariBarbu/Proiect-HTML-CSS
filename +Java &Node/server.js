const express = require('express');
const cors = require('cors');
const app = express();
const swal=require('sweetalert2');
let ejs = require('ejs');
var fs = require('fs');
 var bodyParser = require('body-parser');
app.use(express.static('public'))
app.use(express.static('views'))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;
const uid = require('uid');
let users=[
    {
        id: uid(10),
        nume: "",
        email:  "",
        parola: "",
        parola2: "",
        sex: "",
        car: "",
        feedback: "",
        mode: ""
     }
]

let produse = [
    {
        id: uid(10),
        nume: "Ulei-motor",
        pret: "100",
        src: "../imagini/car4.png",
        MT: "3",
        M1: "3",
        M2: "3",
        M3: "3",
        useri:[]

    },
    {
        id: uid(10),
        nume: "Ambreiaj",
        pret: "1000",
        src: "../imagini/car4.png", 
        MT: "3",
        M1: "3",
        M2: "3",
        M3: "3",
        useri:[]
    },
    {
        id: uid(10),
        nume: "Set-motoare",
        pret: "79",
        src: "../imagini/car4.png",
        MT: "3",
        M1: "3",
        M2: "3",
        M3: "3",
        useri:[]
    },
    {
        id: uid(10),
        nume: "Baterie",
        pret: "280",
        src: "../imagini/car4.png",
        MT: "3",
        M1: "3",
        M2: "3",
        M3: "3",
        useri:[]
    },
    {
        id: uid(10),
        nume: "kit-siguranta",
        pret: "159",
        src: "../imagini/car4.png",
        MT: "3",
        M1: "3",
        M2: "3",
        M3: "3",
        useri:[]
    },
    {
        id: uid(10),
        nume: "Anvelope",
        pret: "708",
        src: "../imagini/car4.png",
        MT: "3",
        M1: "3",
        M2: "3",
        M3: "3",
        useri:[]
    }
]

//Formular inregistrare

app.post('/adauga-user', (req, res) => {
    const userData = req.body;
    userData.id = uid(10);
    users.push(req.body);
    res.statusCode = 201; //created
    res.send(users);
    });
//Conectare

app.get('/find-user', (req, res) => {
    res.send(users);
});
//READ
app.get('/lista-produse', (req, res) => {
    res.send(produse);
});
//CREATE
app.post('/adauga-produs', (req, res) => {
    const produsData = req.body;
    if(!req.body.nume || !req.body.pret){
        return res.status(400).json({ msg: 'Introduceti un produs valid' });
}
    else{
        produsData.src="../imagini/car4.png";
        produsData.id = uid(10);
        produsData.MT = "3";
        produsData.M1 = "3";
        produsData.M2 = "3";
        produsData.M3 = "3";
        produsData.f=0;
        produse.push(req.body);
        res.statusCode = 201; //created
        res.send(produse);
    }
});
//DELETE
app.delete('/sterge-produs/:id', (req, res) => {
    console.log("sterge", req.params.id)
    produse = produse.filter(produs => produs.id !== req.params.id); //filtrare dupa id
    res.send(produse);
});


//UPDATE
app.put('/update-produs/', (req, res) => {
    console.log(req.body);
    if(!req.body.upnume && !req.body.uppret){
        console.log("Camp necompletat");
        return res.status(400).json({ msg: 'Update la cel putin o informatie' });
}
    else{
        produse.forEach(produs=>{
            if(produs.id===req.body.id)
            { 
                //console.log("Am gasit");
                produs.nume=req.body.upnume;
                produs.pret=req.body.uppret;
                res.statusCode = 201;
                res.send(produse); //returnez toate produsele
            }
    })
    }
});


//Folosesc un fisier unde salvez feedback-ul
class FeedbackRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Eroare: Nu ai specificat un nume de fisier.');
        }
        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }

    // citeste si returneaza toate datele din fisier
    async getAll() {
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })
        );
    }

    // scrie un array intr-un fisier
    async writeAll(feedback) {
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(feedback, null, 2)
        );

    }

    // Adaugam un nou feedback si apelam functia pentru scrierea in fisier
    async addFeedback(f) {
        const feedback = await this.getAll();
        feedback.push(f);
        await this.writeAll(feedback);
    }
}
//Update-feedback

const file=new FeedbackRepository('feedback-produse.json');

app.put('/update-feedback/', async function(req, res) {
   await file.addFeedback(req.body);
    let data= await file.getAll();
    let nr=0;
    let MT=0;
    let M1=0;
    let M2=0;
    let M3=0;
    for(i of data){
        if(i.id==req.body.id){
            nr++;
            MT+=Number(i.F1)+Number(i.F2)+Number(i.F3);
            M1+=Number(i.F1);
            M2+=Number(i.F2);
            M3+=Number(i.F3);

        }
    }
    MT/=nr*3;
    M1/=nr; M2/=nr; M3/=nr;
    for(i of produse){
        if(i.id==req.body.id){
            i.MT=MT;
            i.M1=M1;
            i.M2=M2;
            i.M3=M3;
            i.useri.push(req.body.user);
        }
    }
    res.send(produse);
      
});

app.get('*', function(req, res){
    res.status(404).sendFile(__dirname +'/views/pagina404.html'); //pagina 404
});
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

// app.set('view engine', 'ejs');
// app.get('/search/:userQuery', (req, res)=>{
//     res.render('oferte');
// });
