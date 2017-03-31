<template>
  <div v-show="showFlag" class="food" transition="move">
    <div class="image-wrapper">
      <img class="image"
           :src="food.image">
    </div>
    <div class="food-info">
      <div class="name">{{food.name}}</div>
      <div class="extra">
        <span class="sell-count">月售{{food.sellCount}}份</span><span class="ratings">好评率{{food.rating}}%</span>
      </div>
      <div class="price">
        <span class="now">￥{{food.price}}</span><span v-if="food.oldPrice !==''" class="old">￥{{food.oldPrice}}</span>
      </div>
    </div>
    <div class="header">
      <div class="icon-wrapper" @click="hide">
        <i class="icon-arrow_lift"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        console.log('closed!');
        this.showFlag = false;
        console.log(this.showFlag);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-transition
      transform: translateX(0)
      transition: all 0.2s linear
    &.move-enter, &.move-leave
      transform: translateX(100%)
    .header
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 30px
      background: #141d27
      opacity: 0.8
      font-size: 0
      .icon-wrapper
        position: absolute
        top: 0
        left: 0
        padding: 8px 8px
      .icon-arrow_lift
        font-size: 14px
        line-height: 14px
        color: #fff
    .image-wrapper
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      .image
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    .food-info
      position: relative
      padding: 18px
      .name
        font-size: 14px
        line-height: 14px
        color: rgb(7,17,27)
        font-weight: 700
        margin-bottom: 8px
      .extra
        font-size: 10px
        color: rgb(147,153,159)
        line-height: 10px
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          font-size: 14px
          color: rgb(240, 20, 20)
          margin-right: 8px
        .old
          font-size: 10px
          color: rgb(147, 153, 159)
</style>
