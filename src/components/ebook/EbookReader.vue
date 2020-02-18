<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div class="mask">
      <div class="left" @click="prevPage"></div>
      <div class="center" @click="toggleTitleAndMenu"></div>
      <div class="right" @click="nextPage"></div>
    </div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import {
    getFontFamily,
    saveFontFamily,
    getFontSize,
    saveFontSize,
    getTheme,
    saveTheme,
    getLocation, saveMetadata
  } from '../../utils/localStorage'
  import {ebookMixin} from "../../utils/mixin";

  global.ePub = Epub

  export default {
    data() {
      return {}
    },
    mixins: [ebookMixin],
    methods: {
      prevPage() {
        if (this.rendition) {
          this.rendition.prev()
          this.hideTitleAndMenu()
        }
      },
      nextPage() {
        if (this.rendition) {
          this.rendition.next()
          this.hideTitleAndMenu()
        }
      },
      toggleTitleAndMenu() {
        if (this.menuVisible) {
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        }
        this.setMenuVisible(!this.menuVisible)
      },
      initFontFamily() {
        const font = getFontFamily(this.fileName)
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
          this.rendition.themes.font(font)
          this.setDefaultFontFamily(font)
        }
      },
      initFontSize() {
        const fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize)
        } else {
          this.rendition.themes.fontSize(fontSize)
          this.setDefaultFontSize(fontSize)
        }
      },
      initTheme() {
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        let defaultTheme = getTheme(this.fileName)
        if (!defaultTheme) {
          defaultTheme = this.themeList[0].name
          saveTheme(this.fileName, defaultTheme)
        }
        this.setDefaultTheme(defaultTheme)
        this.rendition.themes.select(defaultTheme)
      },
      parseBook() {
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
          saveMetadata(this.fileName, metadata)
        })
        this.book.loaded.cover.then(cover => {
          this.book.archive.createUrl(cover).then(url => {
            this.setCover(url)
          })
        })

        this.book.loaded.navigation.then(nav => {
          const navItem = (function flatten(arr) {
            return [].concat(...arr.map(v => [v, ...flatten(v.subitems)]))
          })(nav.toc)

          function find(item, v = 0) {
            const parent = navItem.filter(it => it.id === item.parent)[0]
            return !item.parent ? v : (parent ? find(parent, ++v) : v)
          }

          navItem.forEach(item => {
            item.level = find(item)
            item.total = 0
            item.pagelist = []
            if (item.href.match(/^(.*)\.html$/)) {
              item.idhref = item.href.match(/^(.*)\.html$/)[1]
            } else if (item.href.match(/^(.*)\.xhtml$/)) {
              item.idhref = item.href.match(/^(.*)\.xhtml$/)[1]
            }
          })

          this.setNavigation(navItem)
        })
      },
      initRendition() {
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        this.rendition.hooks.content.register(contents => {
          Promise.all([
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`)
          ]).then(() => {
          })
        })
        this.display(getLocation(this.fileName), () => {
          this.initFontFamily()
          this.initFontSize()
          this.initTheme()
          this.initGlobalTheme()
          this.parseBook()
        })
      },
      initEpub() {
        const url = process.env.VUE_APP_EPUB_URL + this.fileName + '.epub'
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRendition()
        this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
        }).then(() => {
          this.setBookAvailable(true)
          this.refreshLocation()
        })
      },
    },
    mounted() {
      const fileName = this.$route.params.fileName.split('|').join('/')
      this.setFileName(fileName).then(() => {
        this.initEpub()
      })
    }
  }
</script>

<style scoped lang='scss'>
  @import "../../assets/styles/global.scss";

  .ebook-reader {
    position: relative;

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      display: flex;

      .left {
        flex: 1;
      }

      .center {
        flex: 1;
      }

      .right {
        flex: 1;
      }
    }
  }
</style>
