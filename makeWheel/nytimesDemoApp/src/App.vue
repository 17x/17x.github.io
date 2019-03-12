<style scoped>
    @import '../node_modules/iview/dist/styles/iview.css';
    @import 'style/common.css';
</style>
<template>
    <div>
        <layout>
            <Sider>
                <GlobalNavigation></GlobalNavigation>
            </Sider>
            <Content>
                <router-view></router-view>
            </Content>
        </layout>
    </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    method() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>