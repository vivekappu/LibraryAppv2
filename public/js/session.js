var decoded = jwt_decode(window.sessionStorage.getItem('token'));
if(decoded){
    document.getElementById("logout").classList.remove("hide");
}
document.getElementById("logout").addEventListener("click",()=>{
    window.sessionStorage.setItem("token", null);
    location.reload();
})
let navitems=document.querySelectorAll(".nav-item");
navitems=[...navitems]
navitems.forEach(
    (item)=>{
       if(decoded){
           item.classList.remove("hide");
       }
      
    }
)
let edit=document.getElementById("edit");
if(edit){
    if(decoded){
        edit.classList.remove("hide");
    }
}