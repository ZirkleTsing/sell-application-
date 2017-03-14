<template>
  <div v-show="showFlag" class="food" transition="move">
    <div class="image-wrapper">
      <img class="image"
           :src="food.image">
    </div>
    <div class="header">
      <div class="icon-wrapper" @click="hide">
        <i class="icon-arrow_lift"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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

</style>
