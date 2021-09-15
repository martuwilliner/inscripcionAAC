const form =  {
    data() {
        return {
            categorias:[],
            cursos:[],
            select: null,
            nombre: '',
            apellido: '',
            email:'',
            dni:'',
            mobileP1:'',
            mobileP2: '',
            mobileP3: '',
            user: '',
            password: '',
            repeat: '',
            category: 0,
            especialidad: '',
            institucion: '',
            pais: '',
            certificado: '',
            present: '',
            seleccion: [],
            direccion: '',
            total:0,
            step: 1
        }
    },
    async created() {
        const response = await fetch("cursos.json");
        const data = await response.json();
        this.cursos = data
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
                const endpoint = `${server}/api/partners/${this.dni}`;
                const settings = {
                    method:"GET",  
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2E1NWM5NTQzYjYyMDc0YmY5ZjZkMjc2MjFkN2I3NGI1MGM4NjNkOWRhN2ExNDA3MGI5MGJiZDg3OWM5NDExODE5MDVlNDVjZDZiMTZkMTUiLCJpYXQiOjE2MzE1NDI4NTIuNzMwNTU0LCJuYmYiOjE2MzE1NDI4NTIuNzMwNTU4LCJleHAiOjE2NjMwNzg4NTIuNzI2NDQ0LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.EZdEn-MmML3V9SNqRZCCRVhUi2jB17dNSh--sQ4jTkv7RK1eFkF_MbbSqIc9HwG02o0NywaISC_sCZQOXizw71KRfWVO-2s9R1zEY8dw4C_IFOuX5zijFEPjveEt3QZrjfHGFuC_2YzUeesYW4vilwQlLWFEcEjT3IuY77U3tqdpklOI69dei1Bw2aLFQCNmDH0i1hr3gsDjXy4V4f5tTsl_LQcP0fX_JHqRnQXhS66iyB4Uy7ixFa9Onf8yw1pfszbA_hVsJwpcM3oobduTrYKtZFNVFz7qCS6pGDM441PUddxfQxEC3CBtnB90aiq3VtVR7tZS9MPfTuCiVgdNwbaocHvZ3yEwZkMFnDKM9xIY4f1G01ATkn65V52hm-nZC83zNOOuAc7_zbVi6qszakzALSnQWQWv8SRYLpEc_UIDcM3DKMACrqpzoRgcCD2ZuJwfQgMr_5MrPkoYr3ue4nE1MlmF29IXK3S1vNJGQ6uQZpVSYfcTp1-I6NjmDvQ_s7wUyOnkTuz662Yzv8bYB1lxGQNuOeYFRHpTseaxLhLoxh2VzUxOiXjE6j3vUl_j5oN5LqKRdm1ZWOBZS9ja66TFoboVRialA8GMk4kuAx39dLx2WU1Yj6pWCFbIWplIRHW39IZcGYRKru_xGVNg9qT-Au0Rnlu_S7SdU3Wa35Y'
                    })
                }
                const response = await fetch(endpoint,settings);
                const data = await response.json();
                if(data.balance > 0){
                    this.step = 6
                }
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
            if(this.step <= 4){
                this.step += 1
            }else{
                this.step += 2
            }
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
        },
        showCurse: async function(event) {
            const target = event.target;
            const element = target.classList.contains("fas") ? target.parentElement : target;
            const data = element.dataset.pop;
            document.querySelectorAll(".course-pop").forEach(element => element.classList.remove("active"))
            document.querySelector(`.course-pop#${data}`).classList.add("active")
        },
        cart: function () {
            const precios = [];
            const categoria = this.category;
            for (const curso of this.seleccion) {
                curso.precios.forEach( precio => {
                if(categoria == 1 ){
                    precios.push(parseInt(curso.precios[0].value))
                }else if( categoria == 3 || categoria== 4){
                    precios.push(parseInt(curso.precios[1].value))
                }else{
                    precios.push(parseInt(curso.precios[2].value))
                }

                })
            }
           const sumatoria = precios.reduce((a,b) => parseInt(a) + parseInt(b), 0 )
           this.total = parseInt(sumatoria) / 3 ;
           this.total += parseInt(categoria.value) ;
        },
        registred: async function (){
            if(this.step == 5){
                try {
                    const data = {
                        first_name: this.nombre,
                        last_name: this.apellido,
                        email: this.email,
                        especiality: this.especialidad,
                        institution: this.institucion,
                        country: this.pais,
                        phone: `${this.mobileP1}${this.mobileP2}15${this.mobileP3}`,
                        certificate: this.certificado,
                        category_id: this.category,
                        password: this.password,
                        user: this.user
                    }

                    const server = "https://aac.raxar.com.ar"; // esta es la API que está subida
                    const endpoint = `${server}/api/register`;
                    const settings = {
                        method:"POST",  
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2E1NWM5NTQzYjYyMDc0YmY5ZjZkMjc2MjFkN2I3NGI1MGM4NjNkOWRhN2ExNDA3MGI5MGJiZDg3OWM5NDExODE5MDVlNDVjZDZiMTZkMTUiLCJpYXQiOjE2MzE1NDI4NTIuNzMwNTU0LCJuYmYiOjE2MzE1NDI4NTIuNzMwNTU4LCJleHAiOjE2NjMwNzg4NTIuNzI2NDQ0LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.EZdEn-MmML3V9SNqRZCCRVhUi2jB17dNSh--sQ4jTkv7RK1eFkF_MbbSqIc9HwG02o0NywaISC_sCZQOXizw71KRfWVO-2s9R1zEY8dw4C_IFOuX5zijFEPjveEt3QZrjfHGFuC_2YzUeesYW4vilwQlLWFEcEjT3IuY77U3tqdpklOI69dei1Bw2aLFQCNmDH0i1hr3gsDjXy4V4f5tTsl_LQcP0fX_JHqRnQXhS66iyB4Uy7ixFa9Onf8yw1pfszbA_hVsJwpcM3oobduTrYKtZFNVFz7qCS6pGDM441PUddxfQxEC3CBtnB90aiq3VtVR7tZS9MPfTuCiVgdNwbaocHvZ3yEwZkMFnDKM9xIY4f1G01ATkn65V52hm-nZC83zNOOuAc7_zbVi6qszakzALSnQWQWv8SRYLpEc_UIDcM3DKMACrqpzoRgcCD2ZuJwfQgMr_5MrPkoYr3ue4nE1MlmF29IXK3S1vNJGQ6uQZpVSYfcTp1-I6NjmDvQ_s7wUyOnkTuz662Yzv8bYB1lxGQNuOeYFRHpTseaxLhLoxh2VzUxOiXjE6j3vUl_j5oN5LqKRdm1ZWOBZS9ja66TFoboVRialA8GMk4kuAx39dLx2WU1Yj6pWCFbIWplIRHW39IZcGYRKru_xGVNg9qT-Au0Rnlu_S7SdU3Wa35Y'
                        }),
                        body: JSON.stringify(data)
                    }
                    const response = await fetch(endpoint,settings);
                    const info = await response.json();

                    if(info.success){
                        this.nextStep()
                    }
                    
                } catch (error) {
                    console.log(error)
                }
            }
        } 
    }
}


Vue.createApp(form).mount('#contact')