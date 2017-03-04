<template>
  <div class="cartcontrol">
    <div v-show="food.count>0" class="cart-decrease icon-remove_circle_outline" @click="cartRemove"></div>
    <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="cartAdd"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      cartAdd(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      cartRemove(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      color: rgb(0, 160, 200)
      font-size: 24px
      line-height: 24px
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      text-align: center
      font-size: 10px
      line-height: 24px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      color: rgb(0, 160, 200)
      font-size: 24px
      line-height: 24px

</style>
