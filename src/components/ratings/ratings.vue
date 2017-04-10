<template>
  <div class="ratings-wrapper">
    <div class="general">
      <div class="score">
        <p class="seller-score">{{seller.score}}</p>
        <div class="text">综合评分</div>
        <div class="extra-text">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="extra">
        <div class="discription">
          <span class="text">服务态度</span>
          <div class="star-wrapper">
            <star :size="36" :score="seller.serviceScore"></star>
          </div>
          <div class="extra-score">{{seller.serviceScore}}</div>
        </div>
        <div class="discription">
          <span class="text">食品评分</span>
          <div class="star-wrapper">
            <star :size="36" :score="seller.serviceScore"></star>
          </div>
          <div class="extra-score">{{seller.foodScore}}</div>
        </div>
        <div class="delivery">
          <span class="text">送达时间</span>
          <span class="time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';

  export default {
    props: {
      seller: Object
    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings-wrapper
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    .general
      display: flex
      font-size: 0
      padding: 18px 0
      .score
        text-align: center
        flex: 0 0 137px
        padding: 6px 0
        .seller-score
          font-size: 24px
          color: rgb(255, 153, 0)
          line-height: 28px
          margin-bottom: 6px
        .text
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 12px
          margin-bottom: 8px
        .extra-text
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
      .extra
        flex: 1
        padding: 6px 24px 6px 0
        .discription
          margin-bottom: 8px
          .text
            display: inline-block
            vertical-align: top
            margin-right: 12px
            padding-top: 3px
            font-size: 12px
          .star-wrapper
            display: inline-block
            vertical-align: top
            margin-right: 12px
          .extra-score
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
            line-height: 18px
        .delivery
          font-size: 12px
          line-height: 12px
          .text
            color: rgb(7, 17, 27)
            margin-right: 12px
          .time
            color: rgb(147, 153, 159)
</style>
