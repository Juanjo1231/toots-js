module.exports = class toots_resize {
  constructor(domParent){
    this.parent = domParent
    this.hBar   = document.createElement('div')
    this.vBar   = document.createElement('div')
    this.cBar   = document.createElement('div')
    
    this.parent.classList.add("toots-resize")
    this.hBar.classList.add("horizontal")
    this.vBar.classList.add("vertical")
    this.cBar.classList.add("corner")

    let bars = [this.hBar, this.vBar, this.cBar]
    
    bars.forEach((el, i) => {
      el.setAttribute("draggable", "true")
      el.classList.add("resizeBar")
      el.addEventListener('drag', this.dragEv.bind(this, i))
    })
    
    if(this.parent){
      this.parent.appendChild(this.hBar)
      this.parent.appendChild(this.vBar)
      this.parent.appendChild(this.cBar)
    }else{
      throw new Error("toots_resize: Undefined parent")
    }
  }
  
  dragEv(ind){
    //ind
    //  0: Width resize
    //  1: Height resize
    //  2: Corner resize
    let parent_coords = this.parent.getBoundingClientRect()
    
    if(ind === 0){
      if(this.parent.clientWidth  + event.offsetX > 0){
        this.parent.style.width  = this.parent.clientWidth  + event.offsetX + "px"
      }
    }else if(ind === 1){
      if(this.parent.clientHeight + event.offsetY > 0){
        this.parent.style.height = this.parent.clientHeight + event.offsetY + "px"
      }
      this.parent.style.height = this.parent.clientHeight + event.offsetY + "px"
    }else if(ind === 2){
      if(this.parent.clientWidth  + event.offsetX > 0 && this.parent.clientHeight + event.offsetY > 0){
        this.parent.style.height = this.parent.clientHeight + event.offsetY + "px"
        this.parent.style.width  = this.parent.clientWidth  + event.offsetX + "px"
      }
    }
  }
}