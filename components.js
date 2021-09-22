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
            step: 1,
            firma: '',
            referencia:''
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

           var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
           
           this.referencia ="91congresoAAC2021/" + this.dni;  /* andres le paso response que referencia con agregue de PERO ADEMAS TODA LA URL DEL RESPONSE Y LO GUARDE COMO LOG */
           
           this.firma = MD5("I3Rr3bxSjfDqyQI7Yt0OOhOJUG"+"~"+"555520"+"~"+this.referencia+"~"+ this.total +"~"+ "ARS");
           let firmaSin= ("I3Rr3bxSjfDqyQI7Yt0OOhOJUG"+"~"+"555520"+"~"+this.referencia+"~"+ this.total +"~"+ "ARS");
        
            
           console.log(this.total,this.firma,firmaSin);
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
                        /* method:"POST",  
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDMxYzY0NGRmNDI3YTdjYTI5ZTE1YjZhNjE3ODgxNTdkYTJkOTRhMzJiMzM1ZWJmMjAxYjRhNWYxM2Y3YzZiZTJlNGFiZDNhYTdkZjdlZDMiLCJpYXQiOjE2MzE3MTU0NjcuNTQ4MTY5LCJuYmYiOjE2MzE3MTU0NjcuNTQ4MTczLCJleHAiOjE2NjMyNTE0NjcuNTQyNzA3LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.Ihp1nORdcI7ftvjIdinqJD1_LUkQ68_9QcPVfvlSsPoGJMIKCqO774DgF2IGpbLq38gNfLk2lzG0nwb7jvnRr0iC7n0y0TTRodFqOuhdnvcA7v5Fte3U4461Lc9-OCCnYMO0_mhIOGvyiZ8FuS7KJXppyW4z4SFz44J4UGDuH93sK9r53oxCGkqAR5GH9_Rs6ZsLait1iRoBpMp5HKXI7jCFFQUnfyO0QjSW2-eTq5rtrQhRkVaavuNvDKOyH2lFxRzhJf83CljgvtcRvhPk-buAe5_5v0Y50TXiEHL47lWuxNpTOWmcnUihadRGCF206NYjCO9zYGaUrULO-DQgncthz5oEUvMecGHJOkLkonTkzxwzUS5YjpbIBUJid1dUev9kK9r008SA1DU60mLMXGCs3ReyRfTgFg9coHYgptxxflNbSELT6td3nmGobzw7ugYicYQncqeMVmRjiDLaoSKOmQt5AgcA7oy1brQhu8ev_RcRtmAdvvW1pg_r1YBg5TZNi3eXnTE9CNdQTk87hYUj4qo1hcfvuYRjPyOLdJjGZZjhMNShsDPTmgPXdJo5585BCEVMPE1BZExGcqsSZhP654w1Oi-fD_Em7pjmv3Ln4Z9v9EKWLtp-KWdLANzJN-sxB6Gs9UuEEeeqWtmpoNVMl5JYbQNarEYa4Ljdioo'
                        }),
                        body: JSON.stringify(data) */
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