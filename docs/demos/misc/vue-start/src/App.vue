<template>
    <div id="app">
        <h1>Hello App!</h1>

        <p>
            <router-link to="/home">Go to Home</router-link>
            <router-link to="/about">Go to About</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>
<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import home from './pages/home/index.vue';
    import todoList from './components/todo/todoList.vue';

    export default {
        name: 'app',
        data() {
            return {
                hello: 'hello vue!!'
            };
        },
        components: {
            todoList,
        }
    };
</script>
<style>

</style>

