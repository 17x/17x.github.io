<template>
    <ol>
        <todoItem v-for="item in todos"
                  :key="item.id"
                  :todo="item"></todoItem>
    </ol>
</template>
<script>
    import todoItem from './todoItem.vue';

    export default {
        data: function () {
            return {
                todos: [
                    {id: 1, title: 'mike'},
                    {id: 2, title: 'amanda'},
                    {id: 3, title: 'linda'}
                ]
            };
        },
        components: {todoItem}
    };
</script>
<style>

</style>