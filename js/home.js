var logOut = document.querySelector('#logOut');
var toSignIn = document.querySelector('#toSignIn');
var userName 
window.onload=preventAccess
function preventAccess(){
    if(sessionStorage.getItem('userName')!=null){
    userName = sessionStorage.getItem('userName');
    document.getElementById("userName").innerHTML =userName.toLocaleUpperCase() ;
} else{
    window.open(`${window.location.href.replace('home.html','')}`,"_self");
}
}

logOut.addEventListener('click',toSignInPage);
function toSignInPage(){
    toSignIn.setAttribute('href','index.html')
    sessionStorage.removeItem('userName')

}