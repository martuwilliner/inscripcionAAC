// Selection
const btnSteps = Array.from(document.querySelectorAll("button[data-step]"))
const steps = Array.from(document.querySelectorAll(".step"))
const present = Array.from(document.querySelectorAll('input[name="present"]'))
const popUps = Array.from(document.querySelectorAll('.popUp'))
const btnPop = Array.from(document.querySelectorAll('button[data-pop]'))
const categories = Array.from(document.querySelectorAll('input[name="category"]'))
const catLabel = document.querySelector('p[data-select="on"]')
// Functions

const showStep = (id) => {
    steps.forEach(step => step.classList.remove("active"));
    const step = steps.find(step => step.getAttribute("id") == id)
    if(!step.classList.contains('active')){
        step.classList.add('active');
    }
    console.clear();
    console.log(step);
}

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


btnSteps.forEach(btn => btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const target = e.target;
    const step = target.dataset.step
    showStep(step)
}))

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


catLabel.addEventListener('click',(e) => {
    e.preventDefault();
    const target = e.target;
    const fieldset = target.parentElement;
    const select = fieldset.querySelector(".select");
    const classList = select.getAttribute('class')
    const classes = classList.split(" ")
 
    if(classes.includes('active')){
        select.setAttribute('class','select')
    }else{
        select.setAttribute('class','select active')
    }
})


categories.forEach(input => input.addEventListener('input',(e)=>{
    e.preventDefault()
    const target = e.target;
    const value = String(target.value).trim();
    const label = target.parentElement;
    const item = label.parentElement;
    const list = item.parentElement;
    const fieldset = list.parentElement;
    const select = fieldset.querySelector(".select");
    const paragraph = fieldset.querySelector("p");
    const card = fieldset.nextElementSibling;
    const cardCategory = card.querySelector("h3")
    const selectClassList = select.getAttribute('class')
    const selectClasses = selectClassList.split(" ")
    const cardClassList = card.getAttribute('class')
    const cardClasses = cardClassList.split(" ")
 
    if(selectClasses.includes('active')){
        select.setAttribute('class','select')
    }else{
        select.setAttribute('class','select active')
    }


    card.setAttribute('class','card active')
    
    
    if(value.length > 0){
        cardCategory.innerHTML = value;
        paragraph.innerText = value;
    }

    console.clear();
    console.log(card)
}))