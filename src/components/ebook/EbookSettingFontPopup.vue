<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hideFontFamilySetting">
          <span class="icon-down1"></span>
        </div>
        <div class="ebook-popup-title-text">{{$t('book.selectFont')}}</div>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item" v-for="(item, index) of fontFamily" :key="index" @click="setFontFamily(item.font)">
          <div class="ebook-popup-item-text" :class="{'selected': isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-check" v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { FONT_FAMILY } from '../../utils/book'
import { saveFontFamily } from '../../utils/localStorage'
export default {
  data(){
   return {
     fontFamily: FONT_FAMILY
   }
  },
  computed: {
    ...mapGetters(['fontFamilyVisible', 'defaultFontFamily', 'currentBook', 'fileName'])
  },
  methods: {
    hideFontFamilySetting() {
      this.setFontFamilyVisible(false)
    },
    setFontFamily(font) {
      this.setDefaultFontFamily(font)
      if (font === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(font)
      }
      saveFontFamily(this.fileName, font)
    },
    isSelected(item) {
      return item.font === this.defaultFontFamily
    },
    ...mapActions(['setFontFamilyVisible', 'setDefaultFontFamily'])
  }
}
</script>

<style scoped lang='scss'>
@import "../../assets/styles/global";

.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 300;
  font-size: 0;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);
  background-color: #fff;
  .ebook-popup-title {
    position: relative;
    text-align: center;
    padding: px2rem(15);
    border-bottom: px2rem(1) solid #b8b9bb;
    box-sizing: border-box;
    @include center;
    .ebook-popup-title-icon {
      font-size: px2rem(14);
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      width: px2rem(25);
      @include center;
    }
    .ebook-popup-title-text {
      text-align: center;
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {

    .ebook-popup-item {
      display: flex;
      padding: px2rem(15);
      .ebook-popup-item-text {
        font-size: px2rem(14);
        flex: 1;
        text-align: left;
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .ebook-popup-item-check {
        font-size: px2rem(14);
        flex: 1;
        text-align: right;
        color: #346cb9;
      }
    }
  }
}
</style>
