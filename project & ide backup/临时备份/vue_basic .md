### basic  

```js

let log = console.log;

let data={
    message: 'Hello Vue!'
};

//component define before new Vue
//use : <todo-item
//     v-for="item in groceryList"
//      v-bind:todo="item"
//      v-bind:key="item.id">
//    </todo-item>
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>This is a todo</li>'
});

// instance of Vue
let vm = new Vue({
  //render to element
  el: '#app',
  data,
  methods:{
      doSth:function(){
          //do sth on this.someProperty
      }
  }
})

vm.message == data.message // true
```
###freeze data

```js
Object.freeze(data)

vm.$data
vm.$el
vm.$watch('message', function (newValue, oldValue) {
  // This callback will be called when `vm.message` changes
})
```

###lifecycle hooks

```js
methods.created:function(){log('created')}
methods.mounted:function(){log('mounted')}
methods.destroyed:function(){log('destroyed')}

// Don’t use arrow functions on an options property or callback
```

###basic use
```js
v-bind:key
v-bind:STRING
v-on:click="doSth"
v-model="data1"
v-bind:id
v-bind:id="'list-' + id"
v-bind:disabled
v-bind:href="url"
//Here href is the argument, which tells the v-bind directive to bind the element’s href attribute to the value of the expression url.
//never change
<span v-once>This will never change: {{ msg }}</span>
//render html tag
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
    
//Modifiers are special postfixes denoted by a dot, which indicate that a directive should be bound in some special way. For example, the .prevent modifier tells the v-on directive to call event.preventDefault() on the triggered event:
<form v-on:submit.prevent="onSubmit"> ... </form>
```
###Shorthand
```js
v-bind:href
//to
:href

v-on:click="doSth"
//to
@click="doSth"

//computed
computed: {
    reversedMessage: function () {
        return this.message.split('').reverse().join('');
    }
}
//Computed properties are by default getter-only, but you can also provide a setter when you need it:

computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
log(vm.reversedMessage); //! sj.euV olleh


//  example
new Vue({
    el: '#app',
    data: {
        question: '输入问题',
        answer: ''
    },
    methods: {
        getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
                this.answer = '没有问号!';
                return;
            }

            this.answer = '等一下啊';
            let vm = this;
            axios.get('a.html')
                .then(resp => {})
                .catch(err => {
                    vm.answer = '出错了';
                });
        }
    },
    created: function () {
        this.debouncedGetAnswer = debounce(this.getAnswer, 500);
    },
    watch: {
        question: function () {
            this.answer = '你输完了就有结果了.';
            this.debouncedGetAnswer();
        }
    }
});

// :class
<p class="text" :class="{active:isActive,error:hasError}">information</p>
//or 
<p class="text" :class="classObject">information</p>
computed: {
    classObject: function () {
        return {
            active: this.isActive,
            error: this.hasError
        };
    }
}
// or
<div v-bind:class="[{active:isActive}, errorClass]"></div
// or 
<p class="text" :class="[{active:isActive},errClass]">information</p>

//
Vue.component('item-block', {
    template: '<p class="myclass">item-block</p>'
});
<item-block :class="'bingo'"></item-block>
<p class="myclass bingo">item-block</p>

//style
//Auto-prefixing
data.styleObject: {
    color: 'red',
    fontSize: '13px'
}
<div v-bind:style="styleObject"></div>
//array style
<div v-bind:style="[baseStyles, overridingStyles]"></div>

//conditional rendering
<h1 v-if="condition1">condition1</h1>
<h1 v-else-if="condition2">condition2</h1>
<h1 v-else>condition1 === false</h1>

//key
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>

<h1 v-show="ok">Hello!</h1>

//for
//list
<li v-for="(item,index) in items">
    {{parentMessage}} + {{index}} + {{item.message}}
</li>

// todolist

<div id="app">
    <p>
        <b @click="changeShowType('all')" :class="{active:showType==='all'}">all</b>
        <b @click="changeShowType('active')" :class="{active:showType==='active'}">active</b>
        <b @click="changeShowType('completed')" :class="{active:showType==='completed'}">completed</b>
    </p>
    <ul>
        <li v-for="(value,index) in filterTodoList">
            <span>{{value.title}}</span>
            <b @click="activeTodo(value.id)"
               class="manipulation color-grey"
               v-if="value.status==='completed'">active</b>

            <b @click="completeTodo(value.id)"
               class="manipulation color-grey"
               v-if="value.status==='active'">complete</b>
    
            <b @click="removeTodo(value.id)"
               class="manipulation color-grey">&times;</b>
        </li>
    </ul>
    <p>
        <!--new todo item-->
        <input type="text" ref="newTodoTitle" v-model="newTodoTitle" />
        <button @click="addTodo">add todo</button>
        <!--new todo item end-->
    </p>
</div>

new Vue({
    el: '#app',
    data: {
        showType: 'all',
        todoList: [
            {
                id: 1,
                title: 'Do the dishes',
                status: 'active'
            }, {
                id: 2,
                title: 'Take out the trash',
                status: 'active'
            }, {
                id: 3,
                title: 'Mow the lawn',
                status: 'active'
            }
        ],
        newTodoTitle: ''

    },
    created: function () {
        // this.newTodoId =
        this.newTodoId = Math.max.apply(Math, this.todoList.map(function (o) {return o.id;})) + 1;
    },
    methods: {
        changeShowType: function (type) {
            // console.log(type);
            this.showType = type;
        },
        addTodo: function () {
            this.todoList.push({
                id: this.newTodoId,
                title: this.newTodoTitle,
                status: 'active'
            });
            this.newTodoId++;
            this.newTodoTitle = '';
            this.$nextTick(() => this.$refs.newTodoTitle.focus());
        },
        removeTodo: function (id) {
            this.todoList = this.todoList.filter(val => val.id !== id);
        },
        completeTodo: function (id) {
            this.todoList = this.todoList.map(val =>
                val.id === id
                    ? {...val, status: 'completed'}
                    : val);
        },
        activeTodo: function (id) {
            this.todoList = this.todoList.map(val =>
                val.id === id
                    ? {...val, status: 'active'}
                    : val);
        }
    },
    
    computed: {
        filterTodoList: function () {
            let arr = [];
            switch (this.showType) {
                case 'active':
                    arr = this.todoList.filter((val, index) =>
                        val.status === 'active'
                    );
                    break;
                case 'completed':
                    arr = this.todoList.filter((val, index) =>
                        val.status === 'completed'
                    );
                    break;
                case 'all':
                default:
                    arr = this.todoList;
            }
            console.log(arr);
            return arr;
        }
    }
});
// todolist end

//event handle
<!-- the click event's propagation will be stopped -->
<a v-on:click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form v-on:submit.prevent></form>

<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div v-on:click.capture="doThis">...</div>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div v-on:click.self="doThat">...</div>

//Event Modifiers
.stop
.prevent
.capture
.self
.once
.passive


//event example
<div id="app">
    <div id="outer" @click.self="clickOuter">
        outer
        <div id="inner" @click.stop="clickInner">inner</div>
        <div @click="outerA">
            <a href="https://www.bing.com" @click.stop.prevent>aaaaa</a>
        </div>
        <hr>
        <form v-on:submit.prevent="sumitForm" id="myForm">
            <p>myform</p>
            <input type="text" />
            <button type="submit">submit button</button>
        </form>
        <hr>
        <div @click.once="onceEvent">once</div>
    </div>
    <div id="scrollA"
         style="height: 200px;overflow-y: scroll;width: 500px;"
         >
        <div id="scrollB"
             style="height: 800px;overflow-y: scroll;width: 400px;"
             @scroll.passive="scrollA">
            <p style="height: 800px;"></p>
        </div>
    </div>
</div>

new Vue({
    el: '#app',
    data: {
        showType: 'all',
        newTodoTitle: ''
    },
    methods: {
        clickOuter: function () {
            log('clickOuter');
        },
        clickInner: function () {
            log('clickInner');
        },
        outerA: function () {
            alert('outerA');
        },
        sumitForm: function () {
            log('sumitForm');
        },
        onceEvent: function () {
            log('onceEvent');
        },
        scrollA: function () {
            log('scrollA');
        }
    }
});

// keyboard
.enter
.tab
.delete (captures both “Delete” and “Backspace” keys)
.esc
.space
.up
.down
.left
.right
```


```

```