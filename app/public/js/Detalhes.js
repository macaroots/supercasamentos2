export default {
    props: {
        estudantes: Array
    },
    setup(props, {emit}) {
        const route = VueRouter.useRoute();
        let id = route.params.id;
        const estudante = {id, nome: 'a'}; //props.estudantes.value.filter(e => { return e.id == id; })[0];
        return {
            estudante
        }
    },
    template: `
    <h2>Detalhes</h2>
    {{estudante.id}}
    {{estudante.nome}}
    `
}