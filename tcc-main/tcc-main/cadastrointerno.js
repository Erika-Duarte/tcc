function onChangeEmail(){

    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" :"block";
    
    toggleRegisterButtonDisabled();
  
}

function onChangePassword(){

    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordMatch();
    toggleRegisterButtonDisabled();
}

function onChangeConfirmPassword(){
    validatePasswordMatch();
    toggleRegisterButtonDisabled();
}

function register(){
    loading();
    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword (email, password).then(() =>{
        hideloading();
        window.location.href = "home.html";
    }).catch(error =>{
        hideloading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error){
    if(error.code == "auth/email-already-in-use"){
        return "E-mail já está em uso"
    }
    return error.message;
}
function validatePasswordMatch(){

    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDiffError().style.display = password == confirmPassword ? "none" : "block";    

}

function toggleRegisterButtonDisabled(){

    form.registerButton().disabled = !isFormValid();
}

function isFormValid(){
    
    const email = form.email().value;
    if(!email || !validateEmail(email)){
        return false;
    }
    const password = form.password().value;
    if(!password || password.length <6 ){
        return false;
    }
    const confirmPassword = form.confirmPassword().value;
    if(password != confirmPassword){
        return false;
    }

    return true;
}

const form = {
    confirmPassword:() => document.getElementById ('confirmPassword'),
    confirmPasswordDiffError: () => document.getElementById('senha-diferente'),


    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalido'),
    emailRequiredError: () => document.getElementById('email-obrigatorio'),
    
    password: () => document.getElementById ('password'),
    passwordRequiredError: () => document.getElementById('senha-invalida'),
    passwordMinLengthError: () => document.getElementById('senha-min-invalida'),
    registerButton: () => document.getElementById('registarusuario')

    
}