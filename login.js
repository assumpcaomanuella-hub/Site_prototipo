const loginBtn =
document.getElementById(
"loginBtn"
);

loginBtn.addEventListener(
"click",

() => {

    const username =
    document.getElementById(
    "username"
    ).value;

    const password =
    document.getElementById(
    "password"
    ).value;

    if(
        username === "admin" &&
        password === "1234"

        
    ){

        window.location.href =
        "index.html";

    }

    else{

        alert(
        "Usuário ou senha inválidos."
        );

    }

    localStorage.setItem(
    "isLogged",
    "true"
    );

});