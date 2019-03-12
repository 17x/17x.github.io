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
  export default {
    data() {
      return {
        greetingWord: ''
      };
    },
    method() {

    },
    beforeMount() {
      const currTimeRaw = new Date().toLocaleString('en-GB').split(', ')[1].replace(/\s(PM|AM)/g, '');
      const currHour = currTimeRaw.split(':')[0];
      let greetingWord = '欢迎你，勇士！';

      if (currHour > 0 && currHour < 6) {
        greetingWord = '代码出BUG啦 ？';
      } else if (currHour >= 6 && currHour < 12) {
        greetingWord = '早啊，吃了没 ？';
      } else if (currHour >= 12 && currHour < 14) {
        greetingWord = '中午好，吃了没 ？';
      } else if (currHour >= 14 && currHour < 18) {
        greetingWord = '下午好，吃了没 ？';
      } else if (currHour > 18 && currHour <= 23) {
        greetingWord = '还在加班，有加班费吗 ？';
      }

      this.greetingWord = greetingWord;
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