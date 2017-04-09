<template>
  <ul v-show="filters && filters.length">
    <li class="user-list" v-for="rating in hook">
      <div>
        <div class="rating-time">{{rating.rateTime | formatDate}}</div>
        <div class="user-rating">
          <span :class="[{'recommend': rating.rateType === 0}, rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down','icon']"></span><span class="extra">{{rating.text}}</span>
        </div>
        <div class="user-detail">
          <span class="user-name">{{rating.username}}</span><img class="avatar" width="12" height="12"
                                                                 :src="rating.avatar"/>
        </div>
      </div>
    </li>
  </ul>
  <div v-show="!filters || !filters.length" class="no-rate">暂无评价</div>
</template>

<script>
  import {formatDate} from '../../common/js/date';

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
        default: true
      }
    },
    computed: {
      hook() {
        var temp = this.filters;
        this.$emit('refresh');
        return temp;
      },
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
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
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
        line-height: 16px
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
        border-radius: 50%
  &.no-rate
    padding: 16px 18px
    color: rgb(147, 153, 159)
    font-size: 12px
</style>
