var decoded = jwt_decode(window.sessionStorage.getItem('token'));
if(decoded){
    document.getElementById("logout").classList.remove("hide");
}
document.getElementById("logout").addEventListener("click",()=>{
    window.sessionStorage.setItem("token", null);
    location.reload();
})