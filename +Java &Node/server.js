const express = require('express');
const cors = require('cors');
const app = express();
const swal=require('sweetalert2');
let ejs = require('ejs');

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
        src: "../imagini/car4.png"

    },
    {
        id: uid(10),
        nume: "Ambreiaj",
        pret: "1000",
        src: "../imagini/car4.png"
    },
    {
        id: uid(10),
        nume: "Set-motoare",
        pret: "79",
        src: "../imagini/car4.png"
    },
    {
        id: uid(10),
        nume: "Baterie",
        pret: "280",
        src: "../imagini/car4.png"
    },
    {
        id: uid(10),
        nume: "kit-siguranta",
        pret: "159",
        src: "../imagini/car4.png"
    },
    {
        id: uid(10),
        nume: "Anvelope",
        pret: "708",
        src: "../imagini/car4.png"
    }
]

//Formular

app.post('/adauga-user', (req, res) => {
    const userData = req.body;
    userData.id = uid(10);
    users.push(req.body);
    res.statusCode = 201;
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
        produse.push(req.body);
        res.statusCode = 201;
        res.send(produse);
    }
});
//DELETE
app.delete('/sterge-produs/:id', (req, res) => {
    console.log("sterge", req.params.id)
    produse = produse.filter(produs => produs.id !== req.params.id);
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
                console.log("Am gasit");
                produs.nume=req.body.upnume;
                produs.pret=req.body.uppret;
                res.statusCode = 201;
                res.send(produse);
            }
    })
    }
});


app.get('*', function(req, res){
    res.status(404).sendFile(__dirname +'/views/pagina404.html');
});
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

// app.set('view engine', 'ejs');
// app.get('/search/:userQuery', (req, res)=>{
//     res.render('oferte');
// });