export default function(url) {
    return {
        data() {
            return {
            html: ''
            };
        },
        mounted() {
            fetch(url)
            .then(res => res.text())
            .then(html => {
                this.html = html;
            });
        },
        template: `<div v-html="html"></div>`
    };
}