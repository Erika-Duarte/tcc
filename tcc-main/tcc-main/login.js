function onChangeEmail(){
    toggleButtonsDisabled();
    toggleEmailErrors();
}

function onChangePassword(){
    toggleButtonsDisabled();
    togglePasswordErrors ();
}

function logado(){
    loading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value).then(() => {        
            hideloading();
            window.location.href = "home.html";
            }).catch(error =>{
                hideloading();
                alert(getErrorMessage(error));
        });
}

function getErrorMessage(error) {
        if (error.code == "auth/user-not-found") {
            return "Usuário Não Encontrado";
        }
        if (error.code == "auth/wrong-password"){
            return "Senha Incorreta"
        }
        return error.message;
}

function loginInterno(){
      window.location.href = "login.html";

}

function logout(){
    firebase.auth().signOut().then(() =>{
        window.location.href = "login.html";
    }).catch(() => {
        alert('Erro ao fazer LogOut');
    })
    

}

function NovoCadastro(){
        loading();
        window.location.href = "cadastroInterno.html";
}
    
function encaminhamento(){
        window.location.href = "encaminhamento.html";

}

function agenda(){
        window.location.href = "agenda.html";

}

function cadpaciente(){
        window.location.href = "cadastropaciente.html";

}

function cadempresa(){
        window.location.href = "cadastroempresa.html";

}

function irExames(){
        window.location.href = "encaminhamento-exames.html";

}
function isEmailValid(){
        const email = form.email().value;
        if(!email){
            return false;
        }
        return validateEmail(email);
}

function toggleEmailErrors(){
        const email = form.email().value;
        form.emailobrigatorio().style.display = email ? "none" : "block";
        form.emailinvalido().style.display = validateEmail(email) ? "none" : "block";
        
}

function togglePasswordErrors(){
        const password = form.password().value;
        form.senhainvalida().style.display = password ? "none" : "block";
       
}

function toggleButtonsDisabled(){

        const emailValid = isEmailValid();
        const passwordValid = isPasswordValid();
        form.loginButton().disabled = !emailValid || !passwordValid;

}

function isPasswordValid(){
        const password = form.password().value;
        if(!password){
            return false;
        }
        return true;
}
    
   

const form = {

        email: () =>document.getElementById('email'),
        emailinvalido: () => document.getElementById('email-invalido'),
        emailobrigatorio: () => document.getElementById('email-obrigatorio'),
        password: () =>document.getElementById('password'),
        loginButton: () => document.getElementById('entrar'),
        senhainvalida: () =>document.getElementById('senha-invalida'),
}
