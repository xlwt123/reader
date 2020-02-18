<template>
  <div class="store-home">
    <search-bar @showFlapCard="showFlapCard"></search-bar>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
      <div>111111111111111111111111111111</div>
    </scroll>
    <flap-card v-if="ifFlapCardShow" @close="closeFlapCard" :data="random" ref="flapCard"></flap-card>
  </div>
</template>

<script>
  import SearchBar from "../../components/home/SearchBar";
  import Scroll from "../../components/Scroll";
  import FlapCard from "../../components/home/FlapCard";
  import {storeHomeMixin} from "../../utils/mixin"
  import { home2 } from '../../api/book'
  import {getHome, getLocalStorage, saveHome, setLocalStorage} from "../../utils/localStorage";
  import {realPx} from "../../utils/utils";
  export default {
    name: "BookHome.vue",
    mixins: [storeHomeMixin],
    components: {
      SearchBar,
      Scroll,
      FlapCard
    },
    data() {
      return {
        scrollTop: 94,
        ifFlapCardShow: false,
        ifShowSearchPage: false,
        ifShowHotSearch: true,
        data: null,
        guessYouLike: null,
        bannerStyle: null,
        recommend: null,
        featured: null,
        categoryList: null,
        categories: null,
        random: null,
        randomList: null,
        bookListOffsetY: 0
      }
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
        if (offsetY > 0) {
          this.scrollTop = 52
        } else {
          this.scrollTop = 94
        }
        this.$refs.scroll.refresh()
      },
      showFlapCard() {
        this.ifFlapCardShow = true
        const randomNumber = parseInt(Math.random() * this.randomList.length)
        this.random = this.randomList[randomNumber]
        this.$nextTick(() => {
          this.$refs.flapCard.startAnimation()
        })
      },
      closeFlapCard() {
        this.$refs.flapCard.stopAnimation()
        this.ifFlapCardShow = false
      },
      parseHomeData(data) {
        this.data = data
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
        this.randomList = data.random
        this.bannerStyle = {
          backgroundImage: 'url(' + data.banner + ')'
        }
        this.$nextTick(() => {
          if (this.bookListOffsetY) {
            this.$refs.bookListWrapper.scrollTo(0, this.bookListOffsetY)
          }
        })
      }
    },
    mounted() {
      const home = getHome()
      if (home) {
        this.parseHomeData(home)
      } else {
        home2().then(response => {
          if (response.status === 200 && response.data) {
            this.parseHomeData(response.data)
            saveHome(response.data)
          }
        })
      }
      this.$refs.bookListWrapper.style.height = window.innerHeight - realPx(52) + 'px'
      this.$refs.bookListWrapper.addEventListener('scroll', this.handleBookListScroll)
      this.bookListOffsetY = getLocalStorage('offsetY')
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (from.path === '/book-store/list' && from.query.keyword) {
          vm.ifShowSearchPage = true
          vm.$refs.searchBar.setKeyword(from.query.keyword)
        }
      })
    },
    beforeDestroy() {
      if (this.bookListOffsetY && !this.isBack) {
        setLocalStorage('offsetY', this.bookListOffsetY)
      } else {
        setLocalStorage('offsetY', 0)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>