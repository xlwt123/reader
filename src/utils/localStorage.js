import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function getLocalStorage(key) {
  return localStorage.get(key)
}

export function setLocalStorage(key, value, expire = 30 * 24 * 3600) {
  return localStorage.set(key, value, { exp: expire })
}

export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

export function getBookObject(fileName, key) {
  if (getLocalStorage(`${fileName}-info`)) {
    return getLocalStorage(`${fileName}-info`)[key]
  } else {
    return null
  }
}

export function setBookObject(fileName, key, value) {
  let book = {}
  if (getLocalStorage(`${fileName}-info`)) {
    book = getLocalStorage(`${fileName}-info`)
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getFontFamily(fileName) {
  return getBookObject(fileName, 'fontFamily')
}

export function saveFontFamily(fileName, fontFamily) {
  setBookObject(fileName, 'fontFamily', fontFamily)
}

export function getFontSize(fileName) {
  return getBookObject(fileName, 'fontSize')
}

export function saveFontSize(fileName, fontSize) {
  setBookObject(fileName, 'fontSize', fontSize)
}

export function getLocale() {
  return getLocalStorage('locale')
}

export function saveLocale(locale) {
  return setLocalStorage('locale', locale)
}

export function getTheme(fileName) {
  return getBookObject(fileName, 'theme')
}

export function saveTheme(fileName, theme) {
  setBookObject(fileName, 'theme', theme)
}

export function saveLocation(fileName, location) {
  setBookObject(fileName, 'location', location)
}

export function getLocation(fileName) {
  return getBookObject(fileName, 'location')
}

export function saveReadTime(fileName, time) {
  setBookObject(fileName, 'time', time)
}

export function getReadTime(fileName) {
  return getBookObject(fileName, 'time')
}

export function saveMetadata(fileName, metadate) {
  setBookObject(fileName, 'metadate', metadate)
}

export function getMetadate(fileName) {
  return getBookObject(fileName, 'meatdate')
}

export function getHome() {
  return getLocalStorage('home')
}

export function saveHome(home) {
  return setLocalStorage('home', home, 1800)
}