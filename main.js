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
    if(value.length >7){ //1er if para verificar que escribio y hay dígitos a comproabr
        const server = "https://aac.raxar.com.ar"; // esta es la API que está subida
        const source = `${server}/api/partners/${value}`; 
        console.log(source);
        const request = await fetch(source,{
            method:"GET",   
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZjIxYjg2ZDExNTNiMGJjODcwNTllMWZmNTg1ZTk3OTNjYjZhMjQ3Y2M5ZTJkOTI1MTNjOWMzMWE2NmI2MzY1NDM5ZTNlZTIwMmNhODA5ZGQiLCJpYXQiOjE2MzA2NzQwNzAuNDA0MjUxLCJuYmYiOjE2MzA2NzQwNzAuNDA0MjU0LCJleHAiOjE2NjIyMTAwNzAuMzk5OTM4LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.MFHIRi5SQv1umsw2lRVdsqtGJhpmuiN-8P81agHgcDiCyXDyY9vEgY5CciFWm9mb0IHNiC9gRrYpV8cUs7IWy-VYHz7_eFRtVpOKi-iJ8sLSk3k8Kg6drVzbrojepO5nq6J_DM5Yjo-84SOYPDB70x_fwFfU4u4Q1778A9619Ou-_mNP7ypq8o8OWN5Fs02Y1MJKcXoXGySU5wnq0TDwslCYrqqNenILj-MMSgppjqwnWvT3ITbYhm57qsDDLOCB0llIb7si3edGsYWOGkt8JOD14vRlpt-faRonW9CDLs28-O_r7n3s3A6Ef2DjeGFR4nFiOGPSX3jj8GM7l01H9fueJU6ebYxSdYhNpHsqkKnPT9gELUkUHfRZtGFcXXviYxL_yqcVeujmb4TwWLhlhEuzKUmH-OlDwYbY4hEwrhnS8sGqZxzwOU9fbR6EZxPp0yehNI_X24pGMC_zzBsdixY2sTysmiyQVtXTu2qQiVqsi55_8-LUgXqSTFQLJawF36JGCT_x876gdj3exnaxdyRQxwk2avvS0DkV8GM_03cduu2AFPpqLM9fSS7kMQB8bwg0NS5TeUjgB2vIPKc_9fAWmcC7mllE7l0jCzK2_09fYfBajJJehcnYLwpNmSRK9F6KviN2GyiX2tJx1GsFRzDDQBZk-yUNl5UwrS-DNh4'
            })
        })
        const data = await request.json();
        const {balance} = data;
        console.log(balance);

        const siguiente = document.querySelector('#next');

        if(balance > 0){
            siguiente.setAttribute("data-step","error")  //toma dos atributos, devuelve el segundo
            siguiente.click(); // para que solo al poner el dni salte si hay o no error
        }
    }   
    } catch (error) {
        console.log(error)
        if(error != undefined){
            const siguiente = document.querySelector('#next');
            siguiente.setAttribute("data-step","two")  //toma dos atributos, devuelve el segundo
            /* siguiente.click(); */ // para que solo al poner el dni salte si hay o no error
        }
    }
})

/* fin validación */


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


categories.forEach(input => input.addEventListener('input',async (e)=>{
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
    const cardPrice = card.querySelector("p")
    const selectClassList = select.getAttribute('class')
    const selectClasses = selectClassList.split(" ")
    const cardClassList = card.getAttribute('class')
    const cardClasses = cardClassList.split(" ")
 
    if(value == "Socio"){
    
            cardCategory.innerHTML = value;
            
            paragraph.innerText = value;

            const source = "categorias.json";
            const request = await fetch(source,{
            method:"GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
            })
            const data = await request.json();

            const search = data.find(element => element.nombre.includes("socio"))

            cardPrice.innerHTML = search.value;

            if(selectClasses.includes('active')){
                select.setAttribute('class','select')
            }else{
                select.setAttribute('class','select active')
            }

            card.setAttribute('class','card active')
    }else if(value == "no"){
     

        list.innerHTML = null;

        const source = "categorias.json";
        const request = await fetch(source,{
            method:"GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        const data = await request.json();

        const filter = data.filter(element => element.value > 0 && element.nombre.includes("socio") != true  )
        filter.forEach(element => {
            list.innerHTML += `<li class="option">
            <label for="category${element.id}">
                <input type="radio" name="category" id="category${element.id}" value="${element.nombre}">
                <span class="name">${element.nombre}</span>
                <span class="price">$ ${element.value}</span>
            </label>
            </li>`;
        });

        console.clear();
        console.log(data)
    }else{
        const source = "categorias.json";
        const request = await fetch(source,{
        method:"GET",
        headers: new Headers({
            'Content-Type': 'application/json'
        })
        })
        const data = await request.json();

        const search = data.find(element => element.nombre.includes(value))

        cardPrice.innerHTML = search.value;

        cardCategory.innerHTML = search.nombre;

        paragraph.innerText = search.nombre;


        if(selectClasses.includes('active')){
            select.setAttribute('class','select')
        }else{
            select.setAttribute('class','select active')
        }
    }



  
}))