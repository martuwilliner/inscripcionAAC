const form =  {
    data() {
        return {
            categorias:[],
            select: null,
            nombre: '',
            apellido: '',
            email:'',
            dni:0,
            mobileP1:'',
            mobileP2: '',
            mobileP3: '',
            user: '',
            password: '',
            repeat: '',
            category: '',
            especialidad: '',
            institucion: '',
            pais: '',
            certificado: '',
            present: '',
            curso: [],
            direccion: '',
            step: 1
        }
    },
    async created() {
    },
    methods: {
        showList: function () {
            this.opened = !this.opened;
        },
        showDetail:  async function(category) {
            const response = await fetch("categorias.json");
            const data = await response.json();
            const item = data.find(item => item.id == category);
            this.select = item;
            this.showList();
        },
        validate: async function(event) {
            this.dni = parseInt(this.dni); 
            try {
                const server = "https://aac.raxar.com.ar"; // esta es la API que está subida
                const source = `${server}/api/partners/${this.dni}`;
                const response = await fetch(source,{
                    method:"GET",  
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZjIxYjg2ZDExNTNiMGJjODcwNTllMWZmNTg1ZTk3OTNjYjZhMjQ3Y2M5ZTJkOTI1MTNjOWMzMWE2NmI2MzY1NDM5ZTNlZTIwMmNhODA5ZGQiLCJpYXQiOjE2MzA2NzQwNzAuNDA0MjUxLCJuYmYiOjE2MzA2NzQwNzAuNDA0MjU0LCJleHAiOjE2NjIyMTAwNzAuMzk5OTM4LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.MFHIRi5SQv1umsw2lRVdsqtGJhpmuiN-8P81agHgcDiCyXDyY9vEgY5CciFWm9mb0IHNiC9gRrYpV8cUs7IWy-VYHz7_eFRtVpOKi-iJ8sLSk3k8Kg6drVzbrojepO5nq6J_DM5Yjo-84SOYPDB70x_fwFfU4u4Q1778A9619Ou-_mNP7ypq8o8OWN5Fs02Y1MJKcXoXGySU5wnq0TDwslCYrqqNenILj-MMSgppjqwnWvT3ITbYhm57qsDDLOCB0llIb7si3edGsYWOGkt8JOD14vRlpt-faRonW9CDLs28-O_r7n3s3A6Ef2DjeGFR4nFiOGPSX3jj8GM7l01H9fueJU6ebYxSdYhNpHsqkKnPT9gELUkUHfRZtGFcXXviYxL_yqcVeujmb4TwWLhlhEuzKUmH-OlDwYbY4hEwrhnS8sGqZxzwOU9fbR6EZxPp0yehNI_X24pGMC_zzBsdixY2sTysmiyQVtXTu2qQiVqsi55_8-LUgXqSTFQLJawF36JGCT_x876gdj3exnaxdyRQxwk2avvS0DkV8GM_03cduu2AFPpqLM9fSS7kMQB8bwg0NS5TeUjgB2vIPKc_9fAWmcC7mllE7l0jCzK2_09fYfBajJJehcnYLwpNmSRK9F6KviN2GyiX2tJx1GsFRzDDQBZk-yUNl5UwrS-DNh4'
                    })
                });
                const data = await response.json();
                const responseCat = await fetch("categorias.json");
                const dataCat = await responseCat.json();
                const items = dataCat.filter(item => item.id == 1);
                this.categorias = items
            } catch (error) {
                const response = await fetch("categorias.json");
                const data = await response.json();
                const items = error ? data.filter(item => item.id != 1 && item.id != 2 ) : data.find(item => item.id == 1);
                this.categorias = items;
            }
        },
        nextStep: function () {
            this.step += 1
        },
        lastStep: function () {
            this.step -= 1
        },
        showPop: function (event) {
            const target = event.target;
            const element = target.classList.contains("fas") ? target.parentElement : target;
            const data = element.dataset.pop;
            document.querySelectorAll(".popUp").forEach(element => element.classList.remove("active"))
            document.querySelector(`.popUp#${data}`).classList.add("active")
            setTimeout(() => document.querySelectorAll(".popUp").forEach(element => element.classList.remove("active")),3000)
        },
        readFile: (event) => {
            const target = event.target;
            const files = target.files;
            const file =  files[0].type.includes("pdf","jpg", "docx")
            target.value = null;
        }

    }
}


Vue.createApp(form).mount('#contact')