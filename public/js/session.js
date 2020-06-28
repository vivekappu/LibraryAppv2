var decoded = jwt_decode(window.sessionStorage.getItem('token'));

let navitems=document.querySelectorAll(".nav-item");
navitems=[...navitems]
navitems.forEach(
    (item)=>{
       if(decoded){
           item.classList.remove("hide");
       }
      
    }
)

if(decoded){
    document.getElementById("logout").classList.remove("hide");
    //don't show signin signup when logged
    console.log("here")
    document.querySelector(".navbar-nav .nav-item[href='/signin']").classList.add("hide");
    document.querySelector(".navbar-nav .nav-item[href='/signup']").classList.add("hide");

}

document.getElementById("logout").addEventListener("click",()=>{
    window.sessionStorage.setItem("token",null);
    //throw out to index when logged out from editbook,editauthor,addbook,addauthor
    if(window.location.pathname.split('/')[1]=="editbook"||window.location.pathname.split('/')[1]=="addbook"||window.location.pathname.split('/')[1]=="editauthor"||window.location.pathname.split('/')[1]=="addauthor"){
       
        window.location.href="/";
    }
    else{
    location.reload();
    }
})

let edit=document.getElementById("edit");
if(edit){
    if(decoded){
        edit.classList.remove("hide");
    }
}
