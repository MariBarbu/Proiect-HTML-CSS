


//Nume utilizator -->ex 16 Nivel 1
let text=""; 
function Start(){
let nume= prompt("Introduceti numele, va rog: ", "Justin Bieber");
if (nume == null || nume == "") {
    text = "De ce nu ne spuneti numele?:((";
  } else {
    text = "Salut, " + nume + "! Esti bine?";
  }
  console.log(text);
  document.getElementsByTagName("span")[0].innerHTML=text;
  setTimeout(function(){document.getElementsByTagName("span")[0].innerHTML='4Car'; }, 3000);
}
//varsta utilizator -->ex 1 Nivel 2
const trimite = document.querySelector("#trimite");
submit_data= async function (event){
  let data= document.getElementById('data').value;
  let day=Number(data[0]+data[1]);
  let month=Number(data[3]+data[4]);
  let year=Number(data[6]+data[7]+data[8]+data[9]);
  let today=new Date();
  let varsta=String(today.getFullYear() -year)+" Ani " +String(today.getMonth()-month+1)+" Luni "+ String(today.getDate()-day)+" Zile "+
  String(today.getHours())+" Ore " + String(today.getMinutes())+ " Minute "+String(today.getSeconds())+" Secunde";
  document.getElementsByClassName("varsta")[0].innerHTML=varsta;
  setTimeout(submit_data, 1000);
  
}
trimite.addEventListener("click", submit_data);

//intrebare input -->ex 8 Nivel 2

var ok =0;
const raspunde=document.querySelector("#raspunde");
raspunde.onclick = function(){
  ok= 1;
}
function intreaba(){
  setTimeout(function(){
    console.log(ok);
    if(ok)
    {
        document.getElementById("intrebare").disabled = true;
        document.getElementsByClassName("rezultat")[0].innerHTML="Felicitari!";
    }
    else
    {   
        alert("Timpul a expirat");
        document.getElementById("intrebare").disabled = true;
        document.getElementsByClassName("rezultat")[0].innerHTML="Ai gresit!";
    }
    setTimeout(function(){
        var x= document.getElementById("div_intrebare");
        console.log(x);
        x.remove();
     }, 1500);
  }, 3000);
  
}

//dimensiune text -->ex 10 nivel 2

//dimensiunea in local Storage
var dim=localStorage.getItem("dimensiune");
dimensiuneText(dim);

const alege=document.querySelector("#alege");

alege_dim= function(){
  let dimensiune= document.getElementById('dim').value;
  dimensiuneText(dimensiune);
}
function dimensiuneText(marime){
  console.log("mare");
  if(marime=="mare")
  {document.getElementById("dim_text").style.fontSize = "xx-large";
  document.getElementById("dim_text1").style.fontSize = "xx-large";
  localStorage.setItem("dimensiune", "mare");
  document.getElementById("dim").value="mare";
}
else if(marime=="mic"){
  console.log("mic");
  document.getElementById("dim_text").style.fontSize = "small";
  document.getElementById("dim_text1").style.fontSize = "small";
  localStorage.setItem("dimensiune", "mic");
  document.getElementById("dim").value="mic";
}
else{
  console.log("mediu");
  document.getElementById("dim_text").style.fontSize = "medium";
  document.getElementById("dim_text1").style.fontSize = "medium";
  localStorage.setItem("dimensiune", "mediu");
  document.getElementById("dim").value="mediu";
}
}






alege.addEventListener("click", alege_dim);
