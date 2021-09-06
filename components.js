const stepOne =  {
    data() {
        return {
            categorias:[],
            select: null,
            opened: false
        }
    },
    async created() {
        const response = await fetch("categorias.json");
        const data = await response.json();
        this.categorias = data.filter( (item,index) => index < 2);
    },
    methods: {
        showList: function () {
            this.opened = !this.opened;
        },
        showAllByCategory:  async function(category) {
            const response = await fetch("categorias.json");
            const data = await response.json();
            const items = category != 1 ? data.filter(item => item.id != 1) : this.categorias;
            this.categorias = items;
        }
    }
}


Vue.createApp(stepOne).mount('#one')