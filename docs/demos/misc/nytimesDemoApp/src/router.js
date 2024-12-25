const routers = [
  {
    path: '/',
    meta: {
      title: ''
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
  },{
    path: '/books',
    meta: {
      title: ''
    },
    component: (resolve) => require(['./views/books.vue'], resolve)
  },
];

export default routers;