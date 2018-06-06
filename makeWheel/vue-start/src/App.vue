<template>
    <router-view></router-view>
</template>
<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import todoList from './components/todo/todoList.vue';
    // import home fom
    export default {
        data() {
            return {
                hello: 'hello vue!!'
            };
        },
        components: {todoList}
    };
</script>
<style>

</style>

