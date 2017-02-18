<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"></img>
        <!--必须使用:src 因为是异步加载src地址，若src，编译时会解析报错-->
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <!--v-if的原因是由于app.vue异步加载数据，所以一开始的seller为空（未加载完成）-->
          <span class="icon" :class="classMap[seller.supports[0].type]">{{seller.supports[0].type}}</span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right" @click="showDetail"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"><!--充满整个父元素-->
    </div>
    <div v-show="detailShow" class="detail">
      <!--固定套路-->
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="closeDetail"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      closeDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0px 8px 0px
          .brand
            /*行内元素声明宽高无效，需要设定为block*/
            vertical-align: top
            display: inline-block
            width: 30px
            height: 18px
            bg-image('brand')
            /*brand后mixin会自动补全@2x @3x*/
            background-size 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .supports
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px
            font-size: 10px

      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap /*不折行*/
      overflow: hidden /*隐藏超出父元素的部分*/
      text-overflow: ellipsis
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px

    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100px
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto /*否则超出屏幕高度部分不能滚动*/
      background: rgba(7, 17, 27, 0.8)
      .detail-wrapper
        width: 100%
        min-height: 100% /*最小也是100%充满屏幕 与这个padding-bottom内边距相配合，留出64px的位置给close图标*/
        .detail-main
          margin-top: 64px
          padding-bottom: 64px /*padding-bottom 使得内容与关闭图标不会重叠*/
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 16px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 30px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              font-size: 14px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto /*原本被100%高度填充的detail-main挤到外面，但是由于padding-bottom的存在使得-64px后可以固定在页面底部*/
        clear: both
        font-size: 32px
</style>
