<template>
  <div class="search-bar-wrapper">
    <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': !shadowVisible}">
      <transition name="title">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title': !titleVisible}">
        <span class="icon-back icon"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input type="text" class="input" :placeholder="$t('home.hint')" v-model="searchText">
        </div>
      </div>
    </div>
    <transition name="host-search">
      <div class="hot-search-wrapper" v-if="ifShowSearchPage && ifShowHotSearch" ref="searchMaskWrapper">
        <hot-search :label="$t('home.hotSearch')" :btn="$t('home.change')" :hotSearch="searchList.hotSearch"></hot-search>
        <div class="line"></div>
        <hot-search :label="$t('home.historySearch')" :btn="$t('home.clear')" :hotSearch="searchList.historySearch"></hot-search>
      </div>
    </transition>
  </div>

</template>

<script>
  import {storeHomeMixin} from "../../utils/mixin";
  import HotSearch from "./HotSearch";

  export default {
    name: "SearchBar",
    mixins: [storeHomeMixin],
    components: {
      HotSearch
    },
    data() {
      return {
        searchText: '',
        titleVisible: true,
        shadowVisible: false,
        searchList: {
          hotSearch: [
            {
              type: 1,
              text: 'Self-Reported Population Health',
              num: '1.8万'
            },
            {
              type: 1,
              text: 'Library and Information Sciences',
              num: '1.1万'
            },
            {
              type: 1,
              text: 'Global Business Strategy',
              num: '1.3万'
            },
            {
              type: 1,
              text: 'Corporate Data Quality',
              num: '1.0万'
            },
            {
              type: 1,
              text: 'Verrechnungspreise',
              num: '3.9万'
            }
          ],
          historySearch: [
            {
              type: 2,
              text: 'Computer Science'
            },
            {
              type: 1,
              text: 'Building the Infrastructure for Cloud Security'
            },
            {
              type: 2,
              text: 'ePub'
            },
            {
              type: 2,
              text: 'api'
            },
            {
              type: 2,
              text: 'Vue.js'
            },
            {
              type: 2,
              text: 'Nginx'
            },
            {
              type: 2,
              text: 'Java'
            },
            {
              type: 2,
              text: 'hdfs'
            },
            {
              type: 2,
              text: 'vuejs'
            },
            {
              type: 2,
              text: 'es6'
            },
            {
              type: 2,
              text: 'Intel'
            },
            {
              type: 1,
              text: 'Pro Git'
            },
            {
              type: 2,
              text: 'imooc'
            },
            {
              type: 2,
              text: 'Education'
            },
            {
              type: 2,
              text: 'Springer'
            },
            {
              type: 2,
              text: 'Environment'
            }
          ]
        },
      }
    },
    watch: {
      offsetY(offsetY) {
        if (offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      }
    },
    methods: {
      hideTitle() {
        this.titleVisible = false
      },
      showTitle() {
        this.titleVisible = true
      },
      hideShadow() {
        this.shadowVisible = false
      },
      showShadow() {
        this.shadowVisible = true
      },
      showFlapCard() {
        this.$emit('showFlapCard')
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .search-bar {
    width: 100%;
    height: px2rem(94);
    position: relative;
    z-index: 150;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);

    &.hide-title {
      height: px2rem(52);
    }

    &.hide-shadow {
      box-shadow: none;
    }

    .search-bar-title-wrapper {
      position: relative;
      width: 100%;
      height: px2rem(42);

      .title-text-wrapper {
        @include center;
        height: 100%;
        width: 100%;

        .title-text {
          font-size: px2rem(16);
        }
      }

      .title-icon-shake-wrapper {
        position: absolute;
        top: 0;
        right: px2rem(15);
        height: 100%;
        width: px2rem(24);
        @include center;
      }
    }

    .title-icon-back-wrapper {
      position: absolute;
      top: 0;
      left: px2rem(15);
      width: px2rem(24);
      height: px2rem(42);
      @include center;
      transition: linear height $homeAnimationTime;

      &.hide-title {
        height: px2rem(52);
      }
    }

    .search-bar-input-wrapper {
      width: 100%;
      height: px2rem(52);
      padding: px2rem(10);
      box-sizing: border-box;
      display: flex;
      position: absolute;
      top: px2rem(42);
      left: 0;
      transition: $homeAnimationTime top linear;

      &.hide-title {
        top: 0;
      }

      .search-bar-blank {
        flex: 0 0 0;
        width: 0;
        transition: all linear $homeAnimationTime;

        &.hide-title {
          flex: 0 0 px2rem(31);
          width: px2rem(31);
        }
      }

      .search-bar-input {
        flex: 1;
        /*width: 100%;*/
        background: #fdfdfd;
        border-radius: px2rem(20);
        padding: px2rem(5) px2rem(15);
        box-sizing: border-box;
        border: 1px solid #eee;
        @include left;

        .icon-search {
          color: #999;
        }

        .input {
          width: 100%;
          height: px2rem(22);
          border: none;
          background: transparent;
          margin-left: px2rem(10);
          font-size: px2rem(12);
          color: #666;

          &:focus {
            outline: none;
          }

          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }

  .hot-search-wrapper {
    width: 100%;
    height: 100%;
    background: white;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }

    .line {
      width: 100%;
      height: 0;
      border-top: px2rem(1) solid #eee;
      margin: px2rem(10) 0;
    }
  }
</style>