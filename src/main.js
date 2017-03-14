import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
import goods from 'components/goods/goods.vue';
import seller from 'components/seller/seller.vue';
import ratings from 'components/ratings/ratings.vue';
import 'common/stylus/index.styl';
import '../static/css/reset.css';

Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass: 'active'
});

router.map({
  '/goods': {
    component: goods
  },
  '/seller': {
    component: seller
  },
  '/ratings': {
    component: ratings
  }
});
router.start(app, '#app', function () {
  console.log('render completed!');
});
// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
// Start the router-enabled app. Creates an instance of App and mounts it to el.
 router.go('/goods');
// Programatically navigate to a new route.
