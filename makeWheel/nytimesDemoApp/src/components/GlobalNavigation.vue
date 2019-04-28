<template>
    <div id="global-navigation">
        <layout>
            <Menu mode="horizontal" theme="dark" active-name="1">
                <div class="layout-logo"></div>
                <div class="layout-nav">
                    <MenuItem name="1">
                        <Icon type="ios-navigate"></Icon>
                        <router-link to="/">Home</router-link>
                    </MenuItem>
                    <MenuItem name="2">
                        <Icon type="ios-keypad"></Icon>
                        <router-link to="/books">Books</router-link>
                    </MenuItem>
                    <MenuItem name="3">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                    </MenuItem>
                    <MenuItem name="4">
                        <Icon type="ios-paper"></Icon>
                        Item 4
                    </MenuItem>
                </div>
            </Menu>
        </layout>
    </div>
</template>
<script>
  module.exports = {
    data: function () {
      return {
        greeting: 'Hello'
      };
    }
  };
</script>
<style>

</style>