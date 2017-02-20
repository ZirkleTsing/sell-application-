<template>
  <div class="menu">
    <div class="menu-bar" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="detail">
          <span class="detail-content">
            <span v-if="goods[$index].type>0" :class="classMap[goods[$index].type]" class="icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="menu-detail" v-el:foods-wrapper>
      <ul v-for="item in goods" class="menu-list">
        <h1 class="title">{{item.name}}</h1>
        <ul class="food-item">
          <li v-for="food in item.foods" class="item">
            <div class="icon">
              <img width="54" height="54" :src="food.icon">
            </div>
            <div class="info">
              <h2 class="name">{{food.name}}</h2>
              <div class="desc">
                <div v-if="food.description !==''" class="desc-detail">{{food.description}}</div>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span><span v-if="food.oldPrice !==''" class="old">
                  ￥{{food.oldPrice}}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {});

        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .menu
    position: absolute
    display: flex
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-bar
      flex: 0 0 80px
      width: 80px
      background: #F3F5F7
      .detail
        display: table
        width: 56px
        height: 54px
        line-height: 14px
        padding: 0 12px
        .detail-content
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
    .menu-detail
      flex: 1 1 auto
      width: 100%
      .menu-list
        .title
          padding-left: 14px
          height: 26px
          border-left: 2px solid #d9dde1
          background: #f3f5f7
          font-size: 12px
          color: rgb(147, 153, 159)
          line-height: 26px
        .food-item
          .item
            display: flex
            margin: 18px
            padding-bottom: 18px
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              border-none()
              margin-bottom: 0
            .icon
              flex: 0 0 54px
              margin-right: 10px
            .info
              flex: 1 1 auto
              .name
                padding: 2px 0 8px 0
                height: 14px
                font-size: 14px
                color: rgb(7, 17, 27)
                line-height: 14px
              .desc
                font-size: 10px
                color: rgb(147, 153, 159)
                line-height: 10px
                margin-bottom: 4px
                .desc-detail
                  margin-bottom: 8px
                .extra
                  .sellCount
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
