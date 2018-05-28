let log = console.log;
let warn = console.warn;

import Vue from 'vue';

let data = {
    message: 'hello Vue.js !',
    groceryList: [
        {id: 0, text: 'Vegetables'},
        {id: 1, text: 'Cheese'},
        {id: 2, text: 'Whatever else humans are supposed to eat'}
    ],
    newMsg: ''
};

let vm = new Vue({
    el: '#app',
    data,
    methods: {
        outerEvent: function () {
            log('outerEvent');
        },
        innerEvent: function () {
            log('innerEvent');
        }
    },
    watch: {
        message: function (val) {
            this.newMsg = 'new msg of ' + this.message;
        }
    },
    computed: {
        reversedMessage: function () {
            return this.message.split('').reverse().join('');
        }
    }
});

setTimeout(() => {
    vm.message = 'world !!';
}, 2000);