<template>
    <li @click="greetings()">{{todo.title}}</li>
</template>
<script>
    export default {
        props: ['todo'],
        data: function () {
            return {
                biubiubiu:'dududu...'
            };
        },
        methods:{
            greetings: function () {
                // log(this.biubiubiu);
            }
        }
    };
</script>
<style>

</style>