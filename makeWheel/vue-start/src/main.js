import Vue from 'vue';
import VueRouter from 'vue-router';
// import './components/todo/todoItem';

Vue.use(VueRouter);

//放在new Vue之前
Vue.component('todo-item', {
    props: ['item'],
    template: '<li>{{item.text}}</li>'
});

let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        nickname: 'nicholas',
        showName: false,
        todos: [
            {id: 0, text: 'Vegetables'},
            {id: 1, text: 'Cheese'},
            {id: 2, text: 'Whatever else humans are supposed to eat'}
        ]
    },
    methods: {
        toggleShowNickname: () => {
            this.showName = !this.showName;
        }
    }
});

/*

setTimeout(() => {
    app.todos.push({text: 'sleep'});
}, 2000);*/
