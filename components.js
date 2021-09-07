const form =  {
    data() {
        return {
            categorias:[],
            select: null,
            opened: true,
            dni:'',
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
        }
    }
}


Vue.createApp(form).mount('#contact')