let toSignIn = document.querySelector('#toSignIn')
let signIn = document.querySelector('#signIn')
let toSignUp = document.querySelector('#toSignUp')
let emailNotExist = document.querySelector('#emailNotExist')
let incorrectPassword = document.querySelector('#incorrectPassword')

let signUp = document.querySelector('#signUp')
let changeFace = document.querySelector('.change-face')
let inputEmail = document.querySelector('#inputEmail')
let inputPassword = document.querySelector('#inputPassword')
let firstName = document.querySelector('#firstName')
let firstNameError = document.querySelector('#firstNameError')
let lastName = document.querySelector('#lastName')
let lastNameError = document.querySelector('#lastNameError')
let emailAddress = document.querySelector('#emailAddress')
let emailAddressError = document.querySelector('#emailAddressError')
let password = document.querySelector('#password')
let passwordError = document.querySelector('#passwordError')
let confirmPassword = document.querySelector('#confirmPassword')
let confirmPasswordError = document.querySelector('#confirmPasswordError')

let inputPasswordEye = document.querySelector('#inputPasswordEye')
let passwordEye = document.querySelector('#passwordEye')
let confirmPasswordEye = document.querySelector('#confirmPasswordEye')
let users='';
let index ='';



function passwordShow(img,input){
    if(img.getAttribute('src')=="images/eye-slash-regular.svg"){
        img.setAttribute('src','images/eye-regular.svg')       
        input.setAttribute('type','text')
    } else {
        img.setAttribute('src','images/eye-slash-regular.svg')       
        input.setAttribute('type','password')
    }}

    inputPasswordEye.addEventListener('click',()=>{
        passwordShow(inputPasswordEye,inputPassword)
    })
    passwordEye.addEventListener('click',()=>{
        passwordShow(passwordEye,password)
    })
    confirmPasswordEye.addEventListener('click',()=>{
        passwordShow(confirmPasswordEye,confirmPassword)
    })

if (localStorage.getItem('usersList') == null) {
     users = [];
} else {
     users = JSON.parse(localStorage.getItem('usersList'));
}

//clear form
function clearData(){
  firstName.value=''
lastName.value=''
  password.value=''
  confirmPassword.value=''
emailAddress.value=''
inputEmail.value=''
 inputPassword.value=''

}



// change face
toSignUp.addEventListener('click',rotate180);
toSignIn.addEventListener('click',rotate0);
function rotate180(){
changeFace.classList.add('rotate180')
}
function rotate0(){
changeFace.classList.remove('rotate180')
}

//validation
function firstNameValidation(){
    let regex=/^[a-zA-Z]{2,8}$/gi;
    if(regex.test(firstName.value)){
    firstNameError.classList.add('invisible')
    return true
    } else{ 
        firstNameError.classList.remove('invisible')
        return false
    }
}
firstName.addEventListener('change',firstNameValidation)

function lastNameValidation(){
    let regex=/^[a-zA-Z]{2,8}$/gi;
    if(regex.test(lastName.value)){
    lastNameError.classList.add('invisible')
    return true
    } else{ 
        lastNameError.classList.remove('invisible')
        return false
    }
}
lastName.addEventListener('change',lastNameValidation)


function emailValidation(){
    let emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(emailRegex.test(emailAddress.value)){
    emailAddressError.classList.add('invisible')
    emailAlreadyInUse()
    return true
    } else{ 
        emailAddressError.classList.remove('invisible')
        emailAddressError.innerHTML='Please enter a valid email address .'

        return false
    }

}
function emailAlreadyInUse(){
if(users.length!=0){
    for (let i = 0; i < users.length; i++) {
        if(emailAddress.value!=users[i].emailAddress){

            emailAddressError.classList.add('invisible')


            return true
            

        } else{
            emailAddressError.classList.remove('invisible')
            emailAddressError.innerHTML='Email address already in use .'

            return false
        }
    }} else {
        return true
    }
}
emailAddress.addEventListener('change',emailValidation)


function passwordValidation(){
    let passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W|.*_).{10,}$/g;
    if(passwordRegex.test(password.value)){
        if(passwordError.classList.contains('invisible')){
            return true
        } else{
                passwordError.classList.add('invisible')
                return true
        }
    } else{ 
        passwordError.classList.remove('invisible')
        return false
    }
}

password.addEventListener('change',passwordValidation)


function confirmPasswordValidation(){
    if(password.value===confirmPassword.value){
        if(confirmPasswordError.classList.contains('invisible')){
            return true
        } else{
            confirmPasswordError.classList.add('invisible')
                return true
        }
    } else{ 
        C=confirmPasswordError.classList.remove('invisible')
        return false
    }
}

confirmPassword.addEventListener('change',confirmPasswordValidation);


//sign up
function  signUpValidation (){
    if(firstNameValidation()===true&&lastNameValidation()===true&&emailValidation()===true&&emailAlreadyInUse()===true&&passwordValidation()===true&&confirmPasswordValidation()===true){
let newUser={firstName:firstName.value,
    LastName:lastName.value,
    password:password.value,
    emailAddress:emailAddress.value
}
users.push(newUser);
localStorage.setItem('usersList',JSON.stringify(users))
setTimeout(rotate0,500)
clearData()

    } 
}
signUp.addEventListener('click',signUpValidation)



///sign in
function checkEmail(){

if(users.length!=0){
    for (let i = 0; i < users.length; i++) {
        if(users[i].emailAddress===inputEmail.value){
index = i
emailNotExist.classList.add('invisible')

        } else{
emailNotExist.classList.remove('invisible')
        }
        
    }
} else {
    emailNotExist.classList.remove('invisible')

}




}
inputEmail.addEventListener('change',checkEmail)


function checkPassword (i){
    if(users[i].password===inputPassword.value){
signIn.setAttribute('href','home.html')
   incorrectPassword.classList.add('invisible')
   sessionStorage.setItem("userName",users[i].firstName);
   clearData()
} else{
    incorrectPassword.classList.remove('invisible')

    }
}
signIn.addEventListener('click',()=>{
    checkPassword(index)
}
)
