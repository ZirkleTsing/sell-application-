<template>
  <div class="menu">
    <div class="menu-bar" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="detail food-list-hook" :class="{'current' : currentIndex===$index}"
            @click="selectMenu($index,$event)">
          <span class="detail-content">
            <span v-if="goods[$index].type>0" :class="classMap[goods[$index].type]" class="icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="menu-detail" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-list food-item food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul class="form">
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
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let ordered = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              console.log(food.name);
              ordered.push(food);
            }
          });
        });
        return ordered;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          /* 计算DOM相关的东西时，一定要保证DOM已经渲染好，改变数据会改变dom 所以要等渲染好在做下面的事情，比较安全 */
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
        /* 屏蔽掉原生点击事件派发 */
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          probeType: 3,
          click: true
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      shopcart,
      cartcontrol
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
        &.current
          position: relative
          margin-top: -1px
          z-index: 10
          background: #fff
          font-weight: 700
          .text
            border-none()
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
        .form
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
              .cartcontrol-wrapper
                position: absolute
                right: 0
                bottom: 0
                padding-bottom: 10px

</style>
