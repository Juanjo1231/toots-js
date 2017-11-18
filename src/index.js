const toast       = require('./tts_modules/toast/')
const Loader      = require('./tts_modules/loader/')
const customAlert = require('./tts_modules/customAlert/')
const TSwitch     = require('./tts_modules/switch/')
const Pagination  = require('./tts_modules/pagination/')
const color       = require('./tts_modules/codeColor')
const resize      = require('./tts_modules/box_resize')

const scripts = document.getElementsByClassName('toots-code')
function colorCode() {
  for(let a = 0; a < scripts.length; a++){
    color(scripts[a])
  }
}
colorCode()

//-- LOADER --//
let loader1 = document.getElementById('loader_1')
let loader2 = document.getElementById('loader_2')
let loader3 = document.getElementById('loader_3')

let l1 = new Loader({
  parent: loader1
})
l1.show()

let l2 = new Loader({
  parent: loader2
})
l2.show()

let l3 = new Loader({
  parent: loader3
})
l3.show()

//-- PAGINATION --//
let pag1 = document.getElementById('pagination_1')
let pag2 = document.getElementById('pagination_2')
let pag3 = document.getElementById('pagination_3')

function updatePage(res) {
  document.getElementById('page_tag').textContent = `Page No.${res.page}`
}

let p1 = new Pagination({
  parent: pag1,
  pages: 12,
  limit: 5,
  callback: updatePage
})

let p2 = new Pagination({
  parent: pag2,
  pages: 8,
  limit: 3,
  callback: updatePage
})

//-- SWITCH --//
let container = document.getElementById('switch_1')

let sw = new TSwitch({
  parent: container,
  options: ["Option 1", "Option 2"]
})

//-- ALERT --//
let btn = document.getElementById('alert_btn')

btn.onclick = () => {
  customAlert({
    title: 'Custom alert',
    buttons: ["Accept", "Cancel"],
    content: "<p>Test content. Can be plain text or a HTML node</p>"
  })
}

//-- BOX RESIZE --//
let bx = document.getElementById('boxResize_1')
let box_resize_1 = new resize(bx)

