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
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDMxYzY0NGRmNDI3YTdjYTI5ZTE1YjZhNjE3ODgxNTdkYTJkOTRhMzJiMzM1ZWJmMjAxYjRhNWYxM2Y3YzZiZTJlNGFiZDNhYTdkZjdlZDMiLCJpYXQiOjE2MzE3MTU0NjcuNTQ4MTY5LCJuYmYiOjE2MzE3MTU0NjcuNTQ4MTczLCJleHAiOjE2NjMyNTE0NjcuNTQyNzA3LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.Ihp1nORdcI7ftvjIdinqJD1_LUkQ68_9QcPVfvlSsPoGJMIKCqO774DgF2IGpbLq38gNfLk2lzG0nwb7jvnRr0iC7n0y0TTRodFqOuhdnvcA7v5Fte3U4461Lc9-OCCnYMO0_mhIOGvyiZ8FuS7KJXppyW4z4SFz44J4UGDuH93sK9r53oxCGkqAR5GH9_Rs6ZsLait1iRoBpMp5HKXI7jCFFQUnfyO0QjSW2-eTq5rtrQhRkVaavuNvDKOyH2lFxRzhJf83CljgvtcRvhPk-buAe5_5v0Y50TXiEHL47lWuxNpTOWmcnUihadRGCF206NYjCO9zYGaUrULO-DQgncthz5oEUvMecGHJOkLkonTkzxwzUS5YjpbIBUJid1dUev9kK9r008SA1DU60mLMXGCs3ReyRfTgFg9coHYgptxxflNbSELT6td3nmGobzw7ugYicYQncqeMVmRjiDLaoSKOmQt5AgcA7oy1brQhu8ev_RcRtmAdvvW1pg_r1YBg5TZNi3eXnTE9CNdQTk87hYUj4qo1hcfvuYRjPyOLdJjGZZjhMNShsDPTmgPXdJo5585BCEVMPE1BZExGcqsSZhP654w1Oi-fD_Em7pjmv3Ln4Z9v9EKWLtp-KWdLANzJN-sxB6Gs9UuEEeeqWtmpoNVMl5JYbQNarEYa4Ljdioo'
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
            setTimeout(() => document.querySelectorAll(".popUp").forEach(element => element.classList.remove("active")),6000)
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
                        user: this.user,
                        is_admin:null,
                        status: this.category != 1 ? "disable" :"enable"
                    }

                    const server = "https://aac.raxar.com.ar"; // esta es la API que está subida
                    const endpoint = `${server}/api/register`;
                    const settings = {
                        method:"POST",  
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDMxYzY0NGRmNDI3YTdjYTI5ZTE1YjZhNjE3ODgxNTdkYTJkOTRhMzJiMzM1ZWJmMjAxYjRhNWYxM2Y3YzZiZTJlNGFiZDNhYTdkZjdlZDMiLCJpYXQiOjE2MzE3MTU0NjcuNTQ4MTY5LCJuYmYiOjE2MzE3MTU0NjcuNTQ4MTczLCJleHAiOjE2NjMyNTE0NjcuNTQyNzA3LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.Ihp1nORdcI7ftvjIdinqJD1_LUkQ68_9QcPVfvlSsPoGJMIKCqO774DgF2IGpbLq38gNfLk2lzG0nwb7jvnRr0iC7n0y0TTRodFqOuhdnvcA7v5Fte3U4461Lc9-OCCnYMO0_mhIOGvyiZ8FuS7KJXppyW4z4SFz44J4UGDuH93sK9r53oxCGkqAR5GH9_Rs6ZsLait1iRoBpMp5HKXI7jCFFQUnfyO0QjSW2-eTq5rtrQhRkVaavuNvDKOyH2lFxRzhJf83CljgvtcRvhPk-buAe5_5v0Y50TXiEHL47lWuxNpTOWmcnUihadRGCF206NYjCO9zYGaUrULO-DQgncthz5oEUvMecGHJOkLkonTkzxwzUS5YjpbIBUJid1dUev9kK9r008SA1DU60mLMXGCs3ReyRfTgFg9coHYgptxxflNbSELT6td3nmGobzw7ugYicYQncqeMVmRjiDLaoSKOmQt5AgcA7oy1brQhu8ev_RcRtmAdvvW1pg_r1YBg5TZNi3eXnTE9CNdQTk87hYUj4qo1hcfvuYRjPyOLdJjGZZjhMNShsDPTmgPXdJo5585BCEVMPE1BZExGcqsSZhP654w1Oi-fD_Em7pjmv3Ln4Z9v9EKWLtp-KWdLANzJN-sxB6Gs9UuEEeeqWtmpoNVMl5JYbQNarEYa4Ljdioo'
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


Vue.createApp(form).mount('#content')