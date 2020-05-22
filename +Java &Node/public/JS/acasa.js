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
