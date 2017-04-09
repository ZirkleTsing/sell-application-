<template>
  <div v-show="showFlag" class="food" transition="move" v-el:food>
    <div class="food-content">
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
        <cartcontrol class="cartcontrol" :food="food"></cartcontrol>
        <div v-show="!food.count || food.count == 0"
             @click="addFood($event)"
             class="button-wrapper" transition="show">
          <div class="shop-button">加入购物车</div>
        </div>
      </div>
      <div class="info-wrappers">
        <bounder v-show="food.info"></bounder>
        <div v-show="food.info" class="info-wrapper">
          <div class="introduction">商品介绍</div>
          <div class="food-detail">{{food.info}}</div>
        </div>
        <bounder></bounder>
        <div v-if="food.ratings" class="food-rating">
          <div class="rating">商品评价</div>
          <div class="wrapper">
            <div @click="selectButton(ALL,$event)" class="all-wrapper" :class="{'active':selectType === ALL}">
              <span class="all">全部</span><span class="number">{{food.ratings.length}}</span>
            </div>
            <div @click="selectButton(1,$event)" class="recommend-wrapper"
                 :class="{'active' :selectType === 1}">
              <span class="recommend">推荐</span><span class="number">{{getRatings.countRecommend}}</span>
            </div>
            <div @click="selectButton(2,$event)" class="critical-wrapper"
                 :class="{'active' :selectType === 2}">
              <span class="critical">吐槽</span><span class="number">{{getRatings.countCritical}}</span>
            </div>
          </div>
        </div>
        <div class="border"></div>
        <div class="showContent">
          <span class="icon-check_circle" :class="{'active':contentType}"></span><span class="extra">查看有内容的评价</span>
        </div>
        <rating :ratings="food.ratings"></rating>
      </div>
      <div class="header">
        <div class="icon-wrapper" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import bounder from '../bounder/bounder.vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import Vue from 'vue';
  import rating from '../rating/rating.vue';

  const ALL = 0;
  /*  const Recommend = 1;
   const Critical = 2;*/

  export default {
    props: {
      food: {
        type: Object
      },
      contentType: {
        type: Boolean,
        default: true
      },
      selectType: {
        type: Number,
        default: ALL
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
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$els.food, {
              click: true
            });
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFood(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      selectButton(selectType, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = selectType;
      }
    },
    computed: {
      getRatings() {
        let countRecommend = 0;
        let countCritical = 0;
        this.food.ratings.forEach(function (ele) {
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
      bounder,
      cartcontrol,
      rating
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
    .food-content
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
          color: rgb(7, 17, 27)
          font-weight: 700
          margin-bottom: 8px
        .extra
          font-size: 10px
          color: rgb(147, 153, 159)
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
        .button-wrapper
          position: absolute
          bottom: 18px
          right: 18px
          padding: 10px 12px
          border-radius: 12px
          background-color: rgb(0, 160, 220)
          transition: all 0.2s
          .shop-button
            font-size: 15px
            line-height: 12px
            color: rgb(255, 255, 255)
          &.show-transition
            opacity: 1
          &.show-enter, &.show-leave
            opacity: 0
        .cartcontrol
          position: absolute
          bottom: 18px
          right: 18px
      .info-wrappers
        .info-wrapper
          padding: 18px
          .introduction
            font-size: 18px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-weight: 700
            margin-bottom: 8px
          .food-detail
            padding: 0px 8px
            font-size: 12px
            font-weight: 200
            color: rgb(77, 85, 93)
            line-height: 24px
        .food-rating
          padding: 18px
          .rating
            font-size: 18px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-weight: 700
            margin-bottom: 6px
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
        .border
          margin: 0 18px
          display: block
          height: 0
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .showContent
          padding: 16px 18px
          color: rgb(147, 153, 159)
          line-height: 24px
          border-bottom: 2px solid rgba(7, 17, 27, 0.1)
          .icon-check_circle
            display: inline-block
            vertical-align: top
            font-size: 24px
            margin-right: 4px
            &.active
              color: rgb(0, 160, 220)
          .extra
            display: inline-block
            vertical-align: top
            font-size: 12px
</style>
