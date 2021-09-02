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

const showStep = (id) => {
    steps.forEach(step => step.classList.remove("active"));
    const step = steps.find(step => step.getAttribute("id") == id)
    if(!step.classList.contains('active')){
        step.classList.add('active');
    }
    console.clear();
    console.log(step);
}

/* validación */
const inputAll = Array.from(document.querySelectorAll('input'));
const dni = inputAll.find(input => input.getAttribute("id").toLowerCase().includes("dni"));
dni.addEventListener("blur",async function (e){
    e.preventDefault();
    try {
    const input = e.target;
    const value = input.value;
    if(value.length > 7){ //1er if para verificar que escribio y hay dígitos a comproabr
        const server = "https://aac.raxar.com.ar"; // esta es la API que está subida
        const source = `${server}/api/partners/${value}`;
        console.log(source);
        const request = await fetch(source,{
            method:"GET",
            mode: 'no-cors',
            credentials: 'include',
            cache: "no-cache",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYjFiZjJkYzU5NzYwZWM5ZjM2YTNkMDYyNDc4Yzc1YjQzNDJmYTViNmE0NmQxZjc5NjRlNWEyYjNhZjZkZGMzNjIwNWQ4ZDRiMDQxNWM2NmUiLCJpYXQiOjE2MzA1OTM1NTEuMjYyMzYyLCJuYmYiOjE2MzA1OTM1NTEuMjYyMzY1LCJleHAiOjE2NjIxMjk1NTEuMjU3NzgxLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.ApG91Btqg3yeePSui2UGZrHCMmRJXmXdLfPGN9RC_BqDXPf9KO8laNDNWlJY9pYX9pNkWNt7T_dMEVIbk4DJLzP4inQTSaR0R1KWdtc4zcHr8QPQdy3OW4Qs9JgLUrbdyZqQTouTUEJx_YPnRRV0v1IXoiY3VRdoFlIZL6sYVahSCqlmTP5jCpwecj4iDu7zazS8Dma3VzNFeH91PPtTOioDg2dK2IlKADPknmrHktGvAH8hPtoGiAXEzgl7RYk4ltGZYSJIQLb2zNYbBdRe_CTAj6RFb-6mMS7jgzaudz1B0koLNe7RqtCS16LzGY5z1lRNog-8hqCZxBa8APAPKIxBG0pQMaCEO9e276A5rkwH6UElKS1QftwqoM8X4d3G-RVuedK5Yl7gGDBF66oRm2X8H-zLlmU1mwL4WlHFhKoaSJrXZaZ97mNERGMCVTGm2jQE1rUPz-FWSxhXJNhPIooV9_eofdspqEnJ3E4AjlM5VQPGtWy4z6vKet8Kog7Y7-Wrj1wRZ2vPOcVh1BF7Tl7P3p4wf9R_Q5Txaq8sqm06oSEDg_Qz_mMBMSi-a_jL2uR9oolkNjhhZ0zgCNx5oDZ67HuCiF3TdK1r_aCLPoNzQ8KCVyj1qaWgYDhaUIB9MjdivSS88JyNx7pxHSbgO3_uZATF8kmUDmwU1AuX7sc'
            })
        })
        const data = await request.json();
        console.log(data)
    }
    } catch (error) {
        console.log(error)
    }
})  //blur es cuando sale del input, para cuando ingresa era focus. Cuando escribe es input o change

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