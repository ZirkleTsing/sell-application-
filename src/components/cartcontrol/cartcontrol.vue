<template>
  <div class="cartcontrol">
    <div v-show="food.count>0" class="cart-decrease" @click.stop.prevent="cartRemove" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
    <div class="inner cart-add icon-add_circle" @click.stop.prevent="cartAdd">
    </div>
  </div>
</template>

<script>
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
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3D(0, 0, 0)
        .inner
          display: inline-block
          color: rgb(0, 160, 200)
          font-size: 24px
          line-height: 24px
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter, &.move-leave
        opacity: 0
        transform: translate3D(24px,0,0)
        .inner
          transform: rotate(180deg)
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
