
const SubmitBtn = document.querySelector("#btn");
SubmitForm= async function (event) {
    event.preventDefault();
    let nume= document.getElementById('nume').value;
    let email= document.getElementById('email').value;
    let parola=document.getElementById('password').value;
    let parola_verificare=document.getElementById('password2').value;
    let sex= check_radio_gender().value;
    let car= document.getElementById('cars').value;
    let feedback= document.getElementById('feedback').value;
    let mode=check_radio_mode().value;

    let expreg1=new RegExp('[a-z]+'); //parola sa contina litere mici
    let expreg2=new RegExp('[A-Z]+');//parola sa contina litere mari
    let expreg3=new RegExp('[0-9]+');//parola sa contina cifre
    let expreg4=new RegExp('[@#$%^&*_-~?!/.><}{]') ;//parola sa contina caractere speciale
    let answer=expreg1.test(parola)&& expreg2.test(parola)&&expreg3.test(parola)&& expreg4.test(parola);
    document.getElementById('password').onkeyup=function(){
        if(answer)
        {document.getElementById('password').style.color='green';
    }
    else{
        document.getElementById('password').style.color='red';
    }
}
    if(nume && email && parola && check_terms)
    {   if(answer)
        {   if(parola==parola_verificare)
                {let user={
                    nume: nume,
                    email: email,
                    parola: parola,
                    sex: sex,
                    car: car,
                    feedback: feedback,
                    mode: mode
                    }

                    const newUsersList = await postDataForm('http://localhost:5000/adauga-user', user)
                    document.querySelector('form').reset();

                    console.log("Data", newUsersList)
                }
                else{
                    Swal.fire({
                        title: 'Parola nu se potriveste',
                        text: 'Introduceti o parola valida',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })

                }
                }

            else{
                Swal.fire({
                            title: 'Parola nu este suficient de puternica',
                            text: 'Parola trebuie sa contina litera mare, litera mica, cifra si caractere speciale',
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
        
            }
    }
    else{
        Swal.fire({
                    title: 'Camp necompletat',
                    text: 'Va rugam sa completati toate campurile',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })

    }
};
async function postDataForm(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
        return response.json();
}

// const inregistrare=(event)=>{
//     event.preventDefault();
//     let nume= document.getElementById('nume').value;
//     let email= document.getElementById('email').value;
//     let parola= document.getElementById('password').value;
//     console.log(parola);
//     let sex= check_radio_gender().value;
//     let car= document.getElementById('cars').value;
//     let feedback= document.getElementById('feedback').value;
//     let parola_verificare=document.getElementById('password2').value;
//     let mode=check_radio_mode().value;
//     let expreg1=new RegExp('[a-z]+'); //parola sa contina litere mici
//     let expreg2=new RegExp('[A-Z]+');//parola sa contina litere mari
//     let expreg3=new RegExp('[0-9]+');//parola sa contina cifre
//     let expreg4=new RegExp('[@#$%^&*_-~?!/.><}{]') ;//parola sa contina caractere speciale
//     //let expreg=new RegExp('^[A-Z]+[a-z]*[0-9]*');//parola sa contina litere mici, sa inceapa cu litera mare, sa contina cifre
//     //answer=expreg.test(parola);
//     //Aici parola ar fi putut contine doar o litera mare la inceput si ar fi fost acceptata
//     console.log(expreg1.test(parola));
//     console.log(expreg2.test(parola));
//     console.log(expreg3.test(parola));
//     console.log(expreg4.test(parola));

//     let answer=expreg1.test(parola)&& expreg2.test(parola)&&expreg3.test(parola)&& expreg4.test(parola);
//     console.log(answer);
//     if(nume && email && parola && check_terms)
//     {   if(answer)
//         {   if(parola==parola_verificare)
//                 {let user={
//                     nume: nume,
//                     email: email,
//                     parola: parola,
//                     sex: sex,
//                     car: car,
//                     feedback: feedback
//                     }
            
//                 if(mode=="light")
//                 {
//                     console.log("ALB");
//                     light_mode();
//                     localStorage.setItem('mode');
//                 }
//                 else{
//                     dark_mode();
//                     localStorage.setItem('mode');
//                 }
//                 users.push(user);
//                 document.querySelector('form').reset();
//                 console.warn('added', {users});

//                 //salvez in localStorage
//                 localStorage.setItem('UserList', JSON.stringify(users));
//                 }
//             else{
//                 alert("Parola nu se potriveste");
//             }
//         }
//         else{
//             alert("Parola trebuie sa contina cel putin o litera mare, o litera mica, un numar si un caracter");
//         }
//     }
//     else{
//         //  Swal.fire({
//         // title: 'Camp necompletat',
//         //     text: 'Va rugam sa completati toate campurile',
//         //     icon: 'error',
//         //     confirmButtonText: 'Cool'
//         //    })
//         //alert("Camp necompletat!");
//     }
// }

function check_terms(){
    if(document.getElementById('terms').checked== true)
        {return true;}
}
function check_radio_gender() {
    if(document.getElementById('male').checked == true)
        {return male;}
    else if(document.getElementById('female').checked == true)
        {return female;}
        else
            {return other;}
  }

  function check_radio_mode(){
      if(document.getElementById('light' ).checked==true)
      {return light;}
      else
      {return dark;}
  }

  SubmitBtn.addEventListener("click", SubmitForm);
  window.addEventListener("keypress", async function(event){
      if(event.keyCode=== 13)
      {SubmitBtn.click();}
  });

