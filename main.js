// Selection
const btnSteps = Array.from(document.querySelectorAll("button[data-step]"))
const steps = Array.from(document.querySelectorAll(".step"))
const present = Array.from(document.querySelectorAll('input[name="present"]'))
const popUps = Array.from(document.querySelectorAll('.popUp'))
const btnPop = Array.from(document.querySelectorAll('button[data-pop]'))
const categories = Array.from(document.querySelectorAll('input[name="category"]'))
const catLabel = document.querySelector('p[data-select="on"]')
const formulario = document.querySelector('#form-contact');
// Functions



/* validación */

const showPopUp = (id) => {
    const pop = popUps.find(pop => pop.getAttribute("id") == id);
    if(!pop.classList.contains('active')){
        popUps.forEach(pop => pop.classList.remove("active"));
        pop.classList.add('active');
    }else{
        popUps.forEach(pop => pop.classList.remove("active"));
    }

    setTimeout(()=>{
        pop.classList.remove("active");
    },2500)
    
    console.clear();
    console.log(pop);
}




present.forEach(input => input.addEventListener('input',(e)=>{
    e.preventDefault()
    const target = e.target;
    const pop = target.dataset.pop;
    showPopUp(pop);
}))

btnPop.forEach(btn => btn.addEventListener('click',(e)=>{
    e.preventDefault()
    const target = e.target;
    let pop = target.dataset.pop;
    if(pop == undefined){
        pop = target.parentElement.dataset.pop
    }
    showPopUp(pop);
    console.clear();
}))




