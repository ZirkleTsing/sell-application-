<template>
  <div class="seller-wrapper" v-el:seller>
    <div>
      <div class="seller">
        <div class="main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="detail">
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="rating-count">({{seller.ratingCount}})</span><span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <ul class="desc">
          <li class="list">
            <h2 class="info">起送价</h2>
            <span class="num">{{seller.minPrice}}</span><span class="text">元</span>
          </li>
          <li class="list">
            <h2 class="info">商家配送</h2>
            <span class="num">{{seller.deliveryPrice}}</span><span class="text">元</span>
          </li>
          <li class="list">
            <h2 class="info">平均配送时间</h2>
            <span class="num">{{seller.deliveryTime}}</span><span class="text">元</span>
          </li>
        </ul>
        <div class="icon">
          <i @click="toggleFavorite" class="icon-favorite" :class="{'favorite': favorite}"></i>
          <h2 class="text">{{isFavorite}}</h2>
        </div>
      </div>
      <bounder></bounder>
      <div class="bulletin-wrapper">
        <h1 class="bulletin-header">公告与活动</h1>
        <p class="text">{{seller.bulletin}}</p>
      </div>
      <div v-if="seller.supports" class="sellerInfo">
        <div v-for="element in seller.supports" :class="classMap[element.type]" class="sellerInfo-detail">
          <span :class="classMap[seller.supports[$index].type]" class="seller-icon"></span>
          <span class="seller-text">{{seller.supports[$index].description}}</span>
          <!--可以用element.type 和element.description-->
        </div>
      </div>
      <bounder></bounder>
      <div class="scene">
        <h1 class="text">商家实景</h1>
        <div class="image-wrapper" v-el:image-wrapper>
          <ul v-el:image-desc>
            <li class="image" v-for="pic in seller.pics" >
              <img
                height="90"
                width="120"
                :src="pic"
              />
            </li>
          </ul>
        </div>
      </div>
      <bounder></bounder>
      <div class="infos">
        <h1 class="head">商家信息</h1>
        <ul>
          <li class="info" v-for="info in seller.infos">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import bounder from '../bounder/bounder.vue';
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from 'common/js/localStorage';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
            return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      isFavorite() {
        var res = this.favorite === true ? '已收藏' : '收藏';
        return res;
      }
    },
    watch: {
      'seller'() {
        this._initScroll();
        this._initImage();
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      _initScroll() {
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$els.seller, {
            click: true
          });
        } else {
           this.sellerScroll.refresh();
        }
      },
      _initImage() {
          if (this.seller.pics) {
            let len = this.seller.pics.length;
            let width = (120 + 6) * len - 6;
            this.$els.imageDesc.style.width = width + 'px';
            this.$nextTick(() => {
                if (!this.picScroll) {
                  this.picScroll = new BScroll(this.$els.imageWrapper, {
                    scrollX: true
                  });
                } else {
                  this.picScroll.refresh();
                }
            });
          }
      },
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
    ready() {
      this._initScroll();
      this._initImage();
    },
    components: {
      star,
      bounder
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller-wrapper
    position: absolute
    top: 174px
    bottom: 0px
    width: 100%
    overflow: hidden
    .seller
      padding: 18px 18px 0 18px
      .main
        padding-bottom: 10px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .name
          margin-bottom: 8px
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
        .detail
          font-size: 10px
          line-height: 18px
          color: rgb(77, 85, 93)
          .star
            display: inline-block
            vertical-align: top
            margin-right: 8px
          .rating-count
            margin-right: 12px

      .desc
        display: flex
        padding: 18px 0px
        .list
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-right: none
          .info
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
      .icon
        position: absolute
        top: 18px
        right: 5px
        width: 50px
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 4px
          font-size: 24px
          color: rgb(77, 85, 93)
          line-height: 24px
          &.favorite
            color: rgb(230, 20, 20)
        .text
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 10px
    .bulletin-wrapper
      padding: 18px 18px 0 18px
      .bulletin-header
        margin-bottom: 8px
        line-height:14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        padding: 0 12px 16px 12px
        line-height: 24px
        font-weight: 200px
        font-size: 12px
        color: rgb(240, 20, 20)
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .sellerInfo
      padding: 0 18px
      .sellerInfo-detail
        padding: 16px 12px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        font-size: 0
        &:last-child
          border-bottom: none
        .seller-icon
          display: inline-block
          vertical-align: top
          margin-right: 6px
          width: 16px
          height: 16px
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .seller-text
          font-size: 12px
          font-weight: 200
          line-height: 16px
          color: rgb(7, 17, 27)
    .scene
      padding: 18px
      .text
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
        margin-bottom: 12px
      .image-wrapper
        width: 100%
        white-space: nowrap
        overflow: hidden
        .image
          display: inline-block
          margin-right: 6px
    .infos
      padding: 18px
      .head
        padding-bottom: 12px
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
        border-1px(rgba(7, 17, 27, 0.1))
      .info
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
        color: rgb(7, 17, 27)
        font-weight: 200
        line-height: 16px
        &:last-child
          border-none()
</style>
