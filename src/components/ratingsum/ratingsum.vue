<template>
  <div class="list-wrapper">
    <ul v-show="ratings.length">
      <li class="list" v-for="rating in ratings" v-show="(selectType === 2 ? true : rating.rateType === selectType) && (rating.text !== '') === contentType">
        <div class="image-wrapper">
          <img class="avatar" :src="rating.avatar" width="28" height="28" />
        </div>
        <div class="description">
          <p class="username">{{rating.username}}</p>
          <div class="delivery-info">
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
            </div>
            <div v-show="rating.deliveryTime" class="text">{{rating.deliveryTime}}分钟送达</div>
          </div>
          <p v-show="rating.text" class="user-rating">
            {{rating.text}}
          </p>
          <div class="extra">
            <i class="icon" :class="rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down'"></i>
            <recommend v-bind:recommends="rating.recommend" class="recommend"></recommend>
          </div>
        </div>
      </li>
    </ul>
    <div></div>
  </div>
</template>

<script>
  import star from '../star/star.vue';
  import recommend from '../recommend/recommend.vue';

  export default {
    props: {
      ratings: {
        type: Array,
        default: []
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
    components: {
      star,
      recommend
    }
  };
</script>

<style lang="stylus">
  .list-wrapper
    font-size: 0
    .list
      display: flex
      padding: 18px 0
      margin: 0 18px
      border-bottom: 1px solid rgba(147, 153, 159, 0.2)
      .image-wrapper
        flex: 0 0 auto
        margin-right: 12px
        .avatar
          border-radius: 50%
      .description
        flex: 1
        .username
          margin-bottom: 4px
          font-size: 10px
          line-height: 12px
          color: rgb(7, 17, 27)
        .delivery-info
          margin-bottom: 6px
          .star-wrapper
            display: inline-block
            margin-right: 6px
          .text
            display: inline-block
            font-size: 10px
            font-weight: 200
            color: rgb(147, 153, 159)
            line-height: 12px
        .user-rating
          margin-bottom: 8px
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 18px
        .extra
          .icon
            display: inline-block
            vertical-align: top
            margin-right: 8px
            font-size: 12px
            line-height: 16px
            &.icon-thumb_up
              color rgb(0, 160, 220)
            &.icon-thumb_down
              color: rgb(147, 153, 159)
          .recommend
            display: inline-block
            vertical-align: top
</style>
