import Vue from 'vue';

export default Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
});