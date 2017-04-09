<template>
  <ul>
    <li class="user-list" v-for="rating in filters">
      <div>
        <div class="rating-time">2016-07-04 12:34</div>
        <div class="user-rating">
          <span :class="[{'recommend': rating.rateType === 0}, rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down','icon']"></span><span class="extra">{{rating.text}}</span>
        </div>
        <div class="user-detail">
          <span class="user-name">{{rating.username}}</span><img class="avatar" width="16" height="16"
                                                                 :src="rating.avatar"/>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      ratings: {
        type: Array
      },
      selectType: {
        type: Number,
        default: 2
      },
      contentType: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      filters() {
        return this.ratings.filter((elem) => {
            if (this.selectType === 2) {
                if (this.contentType) {
                    return elem.text !== '';
                }
                return elem;
            } else {
                if (this.contentType) {
                    return elem.text !== '' && elem.rateType === this.selectType;
                }
                return elem.rateType === this.selectType;
            }
        });
      },
      content() {
          return this.contentType;
      }
    },
    data() {
        return {
        };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .user-list
    position: relative
    padding: 16px 0px
    margin: 0 18px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .rating-time
      font-size: 10px
      color: rgb(147, 153, 159)
      line-height: 12px
      margin-bottom: 6px
    .user-rating
      .icon
        font-size: 12px
        line-height: 24px
        margin-right: 4px
        &.icon-thumb_down
          color: rgb(147, 153, 159)
        &.recommend
          color: rgb(0, 160, 220)
      .extra
        font-size: 12px
        color: rgb(7, 17 ,27)
        line-height: 16px
    .user-detail
      position: absolute
      top: 16px
      right: 0
      .user-name
        display: inline-block
        vertical-align: top
        font-size: 10px
        color: rgb(147, 153, 159)
        line-height: 12px
        margin-right: 6px
      .avatar
        display: inline-block
        vertical-align: top
</style>
