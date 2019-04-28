<style scoped>

</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h1>
                    <!--<img src="../images/logo.png">-->
                </h1>
                <h2>
                    <p>{{greetingWord}}</p>
                    <Button @click="handleStart">Start iView</Button>
                </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
  import {getBooksList} from '../api';

  export default {
    data() {
      return {
        greetingWord: ''
      };
    },
    method() {

    },
    beforeMount() {

      getBooksList({
        date: '2018-04-05',
        list: 'hardcover-fiction'
      }).then(resp => {
        console.log(resp);
      });
    },
    beforeDestroy() {

    },
    methods: {
      handleStart() {
        this.$Message.info('This is a info tip');
      }
    }
  };
</script>