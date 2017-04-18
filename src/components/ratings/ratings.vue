<template>
  <div class="ratings-wrapper"  v-el:rating-wrapper>
    <div>
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
      <bounder></bounder>
      <div v-if="ratings.length" class="food-rating">
        <div class="wrapper">
          <div @click="selectButton(2,$event)" class="all-wrapper" :class="{'active':selectType === 2}">
            <span class="all">全部</span><span class="number">{{ratings.length}}</span>
          </div>
          <div @click="selectButton(0,$event)" class="recommend-wrapper"
               :class="{'active' :selectType === 0}">
            <span class="recommend">推荐</span><span class="number">{{getRatings.countRecommend}}</span>
          </div>
          <div @click="selectButton(1,$event)" class="critical-wrapper"
               :class="{'active' :selectType === 1}">
            <span class="critical">吐槽</span><span class="number">{{getRatings.countCritical}}</span>
          </div>
        </div>
      </div>
      <div class="showContent">
        <span @click="toggleContent" class="icon-check_circle" :class="{'active': contentType}"></span><span class="extra">查看有内容的评价</span>
      </div>
      <ratingsum class="rating-sum" :ratings="ratings" :select-type="selectType" :content-type="contentType"></ratingsum>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import bounder from '../bounder/bounder.vue';
  import ratingsum from '../ratingsum/ratingsum.vue';
  import BScroll from 'better-scroll';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      },
      selectType: {
        type: Number,
        default: 2
      },
      contentType: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        ratings: []
      };
    },
    methods: {
      selectButton(selectType, event) {
          this.selectType = selectType;
      },
      toggleContent() {
          this.contentType = !this.contentType;
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$els.ratingWrapper, {
              click: true
            });
          });
        }
      });
    },
    computed: {
      getRatings() {
        let countRecommend = 0;
        let countCritical = 0;
        this.ratings.forEach(function (ele) {
          if (ele.rateType === 0) {
            countRecommend++;
          } else {
            countCritical++;
          }
        });
        return {
          countRecommend: countRecommend,
          countCritical: countCritical
        };
      }
    },
    components: {
      star,
      bounder,
      ratingsum
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings-wrapper
    position: absolute
    top: 174px
    left: 0
    bottom: 0px
    width: 100%
    overflow: hidden
    .general
      display: flex
      font-size: 0
      padding: 18px 0
      .score
        text-align: center
        flex: 0 0 137px
        padding: 6px 0
        border-right: 1px solid rgba(147, 153, 159, 0.4)
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
        padding: 6px 0 6px 24px
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
    .food-rating
      padding: 18px 0
      margin: 0 18px
      border-bottom: 1px solid rgba(147, 153, 159, 0.2)
      .wrapper
        padding-top: 12px
        .all-wrapper, .recommend-wrapper, .critical-wrapper
          display: inline-block
          padding: 8px 12px
          border-radius: 12px
          font-size: 12px
          line-height: 16px
          .number
            font-size: 8px
        .all-wrapper, .recommend-wrapper
          margin-right: 8px
          background-color: rgba(0, 160, 220, 0.2)
          color: rgb(77, 85, 93)
          &.active
            background-color: rgb(0, 160, 220)
            color: #fff
        .critical-wrapper
          background-color: rgba(77, 85, 93, 0.2)
          &.active
            background-color: rgb(77, 85, 93)
            color: #fff
    .showContent
      padding: 12px 18px
      border-bottom: 2px solid rgba(147, 153, 159, 0.2)
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
        color: rgb(147, 153, 159)
        line-height: 24px
        &.active
          color: rgb(0, 160, 220)
      .extra
        display: inline-block
        vertical-align: top
        font-size: 12px
        color: rgb(147, 153, 159)
        line-height: 24px
</style>
