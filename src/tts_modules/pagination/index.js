module.exports = class toots_pagination{
  constructor(options = {}){
    //--Pagination--//
    this.parent      = options.parent
    this.container   = document.createElement("div")
    this.navFirst    = document.createElement("div")
    this.navLast     = document.createElement("div")
    this.navPrev     = document.createElement("div")
    this.navNext     = document.createElement("div")
    this.rail        = document.createElement("ul")
    this.limit       = options.limit || 5
    this.pages       = options.pages || 1
    this.valuesCount = options.valuesCount || 0
    this.offset      = options.offset || 0
    this.valuesLimit = options.valuesLimit || this.valuesCount
    //--Page details--//
    this.showDetails = options.showDetails || false
    this.detailsBox  = document.createElement("div")
    this.detailsBox.classList.add("page-detail")
    //-- Basic Options --//
    this.container.classList.add("toots-pagination")
    this.container.id = options.id || this.defineId()
    
    this.navFirst.classList.add("navBtn")
    this.navFirst.classList.add("material-icons")
    this.navFirst.textContent = "first_page"
    
    this.navPrev.classList.add("navBtn")
    this.navPrev.classList.add("material-icons")
    this.navPrev.textContent = "navigate_before"

    this.navNext.classList.add("navBtn")
    this.navNext.classList.add("material-icons")
    this.navNext.textContent = "navigate_next"
    
    this.navLast.classList.add("navBtn")
    this.navLast.classList.add("material-icons")
    this.navLast.textContent = "last_page"

    this.rail.classList.add("rail")
    //--User callback on page change--//
    this.callback = options.callback
    //--Build pagination object
    if(this.parent){
      this.build()
    }else{
      throw new Error("toots-pagination: Parent element not defined")
    }
  }

  defineId(){
    let existing = document.getElementsByClassName("toots-pagination")
    let len      = Object.keys(existing).length
    return `${this.parent.id}_toots_pagination_${len}`
  }

  build(){
    //this.container.appendChild(this.navFirst)
    this.container.appendChild(this.navPrev)
    this.container.appendChild(this.rail)
    this.container.appendChild(this.navNext)
    //this.container.appendChild(this.navLast)
    this.parent.appendChild(this.container)
    
    this.navPrev.addEventListener("click", this.previousPage.bind(this, this.navPrev))
    this.navNext.addEventListener("click", this.nextPage.bind(this, this.navNext))
    
    this.setPages()

    this.selectPage(this.rail.children[0], true)
  }
  
  cleanActive(){
    let actives = this.rail.querySelectorAll("li.active")
    actives.forEach(el =>{
      el.classList.remove("active")
    })
  }
  
  setPages(n){
    this.rail.innerHTML = ""
    let a = 1
    this.pages = n ? Number(n) : this.pages
    while(a <= this.pages && a <= this.limit){
      let btn = document.createElement("li")
      btn.textContent = a
      btn.addEventListener("click", this.selectPage.bind(this, btn, false))
      this.rail.appendChild(btn)
      a++
    }

    this.rail.children[0].classList.add("active")
    
    if(!n){
      this.selectPage(this.rail.children[0])
    }
  }

  selectPage(obj, initial){
    this.selectedPage = Number(obj.textContent)
    let firstRailNumber = Number(this.rail.children[0].textContent)
    let btns = this.rail.children
    let len  = Object.keys(btns).length
    let lastPage = false
    let firstPage = false
    
    this.cleanActive()
    
    if(this.selectedPage > firstRailNumber){
      this.navPrev.classList.remove("disabled")
     // this.navFirst.classList.remove("disabled")
    }
    if(this.selectedPage === 1){
      this.navPrev.classList.add("disabled")
      //this.navFirst.classList.add("disabled")
      firstPage = true
    }
    if(this.selectedPage >= this.pages){
      this.navNext.classList.add("disabled")
      //this.navLast.classList.add("disabled")
      lastPage = true
    }
    if(this.selectedPage < this.pages){
      this.navNext.classList.remove("disabled")
      //this.navLast.classList.remove("disabled")
    }
    
    obj.classList.add("active")
    let res = {
      obj: this,
      page: this.selectedPage,
      lastPage: lastPage,
      firstPage: firstPage
    }

    if(this.callback && !initial){
      this.callback(res)
    }
  }

  nextPage(obj){
    let btn     = this.container.querySelectorAll(".active")[0]
    let nextBtn = btn.nextElementSibling
    let page    = Number(btn.textContent)
    if(nextBtn && nextBtn.textContent != " "){
      btn.classList.remove("active")
      this.selectPage(nextBtn)
    }else if(!nextBtn && page < this.pages){
      this.nextBunch(page)
    }
  }

  previousPage(obj){
    let btn     = this.container.querySelectorAll(".active")[0]
    let prevBtn = btn.previousElementSibling
    let page    = Number(btn.textContent)
    if(prevBtn && prevBtn.textContent != " "){
      btn.classList.remove("active")
      this.selectPage(prevBtn)
    }else if(!prevBtn && page > 1){
      this.previousBunch(page)
    }
  }
    
  nextBunch(page){
    this.navPrev.classList.remove("disabled")
    this.rail.innerHTML = ""
    let f = page + 1
    for(let a = 0; a < this.limit; a++){
      let li = document.createElement("li")
      if(f + a <= this.pages){
        li.textContent = f + a
        li.addEventListener("click", this.selectPage.bind(this, li, false))
      }
      else{
        li.textContent = " "
      }
      this.rail.appendChild(li)
    }
    this.selectPage(this.rail.children[0])
  }
  
  previousBunch(page){
    this.navNext.classList.remove("disabled")
    this.rail.innerHTML = ""
    let f = page - 5 < 1 ? 1 : page - 5
    for(let a = 0; a < this.limit; a++){
      let li = document.createElement("li")
      li.textContent = f + a
      li.addEventListener("click", this.selectPage.bind(this, li, false))
      this.rail.appendChild(li)
    }
    this.selectPage(this.rail.children[this.limit-1])
  }
}