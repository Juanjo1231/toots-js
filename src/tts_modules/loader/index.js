module.exports = class toots_loader {
  constructor(options = {}){
    this.parent = options.parent || document.body
    this.id        = this.parent.id + "_loader"
    this.animation = options.animation || "wheel"
    this.style     = options.style || "default"
    
    this.animationsContent = {
      wheel: "<div class='wheel'></div>"
    }
    
    this.createObj()
  }
  createObj(){
    this.background = document.createElement("div")
    this.background.id = this.id
    this.background.classList.add("tts-loader-background")
    this.background.style.display = "none"
    this.child = document.createElement("div")
    this.child.classList.add("tts-loader-child")
    
    this.child.innerHTML = this.animationsContent[this.animation]
    this.background.appendChild(this.child)
    this.draw()
  }
  draw(){
    this.parent.appendChild(this.background)
  }
  show(){
    this.background.style.display = "block"
  }
  hide(){
    this.background.style.display = "none"
  }
}