module.exports = class tts_switch{
  constructor(options = {}){
    this.userOptions = options
    this.parent  = options.parent
    this.options = options.options || ["On", "Off"]
    this.option1 = this.options[0] || "On"
    this.option2 = this.options[1] || "Off"
    this.style   = options.style   || "default"
    this.container = document.createElement("div")
    this.container.classList.add("tts-switch-container")
    this.container.classList.add(this.style)
    this.container.classList.add("f")
    this.container.addEventListener("click", this.toggleOptions.bind(this))
    this.value = this.option1
    
    this.build.call(this)
  }
  build(){
    //Create elements inside switch container
    const firstOption = document.createElement("div")
    firstOption.classList.add("tts-switch-option")
    firstOption.textContent = this.option1
    if(this.userOptions.parentCenter){
      //Center on parent element
    }
    const lastOption = document.createElement("div")
    lastOption.classList.add("tts-switch-option")
    lastOption.textContent = this.option2
    const rail = document.createElement("div")
    rail.classList.add("tts-switch-rail")
    const button = document.createElement("div")
    button.classList.add("tts-switch")
    
    rail.appendChild(button)
    this.container.appendChild(firstOption)
    this.container.appendChild(rail)
    this.container.appendChild(lastOption)
    
    this.parent.appendChild(this.container)
  }
  
  toggleOptions(){
    if(this.container.classList.contains("f")){
      this.container.classList.remove("f")
      this.container.classList.add("l")
      this.value = this.option2
    }else{
      this.container.classList.add("f")
      this.container.classList.remove("l")
      this.value = this.option1
    }
  }
}