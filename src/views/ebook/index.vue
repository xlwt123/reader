<template>
  <div class="ebook">
    <ebook-header></ebook-header>
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-footer></ebook-footer>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookMenu from '../../components/ebook/EbookMenu'
import EbookHeader from '../../components/ebook/EbookHeader'
import EbookFooter from '../../components/ebook/EbookFooter'
import {getReadTime, saveReadTime} from "../../utils/localStorage";
import { ebookMixin } from "../../utils/mixin";

export default {
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu,
    EbookHeader,
    EbookFooter
  },
  mixins: [ebookMixin],
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 60 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>