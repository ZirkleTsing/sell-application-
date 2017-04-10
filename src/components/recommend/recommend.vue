<template>
  <div v-show="recommends.length" class="recommend-wrapper">
    <ul>
      <li class="recommend-list" v-for="recommend in filter">
        <div class="detail">{{favourate(recommend)}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      recommends: {
        type: Array,
        default: []
      }
    },
    methods: {
      favourate(recommend) {
        if (recommend.length > 4) {
          return recommend.slice(0, 4) + '...';
        }
        return recommend;
      }
    },
    computed: {
      filter() {
        if (this.recommends.length > 3) {
          return this.recommends.slice(0, 3);
        }
        return this.recommends;
      }
    }
  };
</script>

<style lang="stylus">
  .recommend-wrapper
    .recommend-list
      display: inline-block
      margin-right: 8px
      .detail
        padding: 0 6px
        font-size: 9px
        color: rgb(147, 153, 159)
        line-height: 16px
        border: 1px solid rgba(7, 17, 27, 0.1)
        border-radius: 2px
        background-color: #fff
</style>
