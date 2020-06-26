
const LogBtn = document.querySelector("#sign");
//self.location="file:///E:/Tehnici%20Web/Magazin%20Online/views/Conectare.html";
LogArray=JSON.parse(localStorage.getItem('log in')) || [];
console.log(LogArray);
LogBtn.addEventListener("click", async function (event) {
    event.preventDefault();
    const email= document.getElementById('email').value;
    const parola= document.getElementById('password').value;
    let user={
        email,
        parola
    };
    localStorage.setItem("User curent", email);
    const array = await findUser('http://localhost:5000/find-user');
    //console.log("UsersArray", array)
        let ok=0;
        array.forEach(data=>{
            console.log("User: ", user.email);
            console.log("Data", data.email);
            if(user.email===data.email && user.parola===data.parola && user.email &&user.parola)
                {
                   // console.log(user);
                    ok=1;
                    if(data.mode=='light')
                    {light_mode();
                    }
                    else{
                        dark_mode();
                    }
                    LogArray.push(data);
                    localStorage.removeItem('log in');
                    localStorage.setItem('log in', JSON.stringify(LogArray));
                    window.location.replace('../views/Acasa.html');
                }
        })
        // if(ok==0){
        //         Swal.fire({
        //             title: 'Parola sau email invalid',
        //             text: 'Daca nu aveti un cont, inregistrati-va!',
        //             icon: 'error',
        //             confirmButtonText: 'Cool'
        //         })
        //     }
});

async function findUser(url = '') {
    const response = await fetch(url);
    //console.log("response", response)
    const UsersArray= await response.json();
    return UsersArray;

}

  function light_mode(){
      document.body.style.backgroundColor="white";
      document.body.style.color="black";
  }

  function dark_mode(){
    document.body.style.backgroundColor="black";
    document.body.style.color="white";
}

