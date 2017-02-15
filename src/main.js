import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import goods from 'components/goods/goods.vue';
import seller from 'components/seller/seller.vue';
import ratings from 'components/ratings/ratings.vue';
import 'common/stylus/index.styl';

Vue.use(VueRouter);

let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass: 'active'
});

router.map({
  '/goods': {
    component: goods
  },
  'seller': {
    component: seller
  },
  'ratings': {
    component: ratings
  }
});

router.start(app, '#app');

router.go('/goods');
