import Vue from 'vue';
import {
  Row,
  Icon,
  Input,
  Select,
  LoadingBar,
  layout,
  MenuItem,
  Sider,
  Message,
} from 'iview';

const iview = {
  install: function (Vue) {
    Vue.component('Row', Row);
    Vue.component('Icon', Icon);
    Vue.component('Input', Input);
    Vue.component('Select', Select);
    Vue.component('LoadingBar', LoadingBar);
    Vue.component('layout', layout);
    Vue.component('MenuItem', MenuItem);
    Vue.component('Sider', Sider);
  }
};

Vue.prototype.$Message = Message;

export default iview;