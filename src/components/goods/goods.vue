<template>
  <div class="menu">
    <div class="menu-bar">
      <ul>
        <li v-for="item in goods" class="detail">
          <span class="detail-content">
            <span v-if="goods[$index].type>0" :class="classMap[goods[$index].type]" class="icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="menu-detail"></div>
  </div>
</template>

<script type="text/ecmascript-6">
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
        }
      });
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
          width:56px
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
</style>
