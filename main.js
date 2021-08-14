const form = document.querySelector("#form-contact");


form.addEventListener("submit",(e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    //fetch("./email.php").then(res => res.json()).then(data => console.log(data) )
   
})