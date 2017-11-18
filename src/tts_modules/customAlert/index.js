module.exports = function toots_customAlert(options = {}) {

  let title         = options.title || ""
  let content       = options.content
  let buttons       = options.buttons
  let buttonsEvents = options.btnEvents

  let background = document.createElement("div")
  background.classList.add("tts-alert-background")
  background.addEventListener("click", off.bind(background))

  let body = document.createElement("div")
  body.classList.add("tts-alert-body")

  let closeRow = document.createElement("div")
  closeRow.classList.add("tts-alert-closeRow")
  let titleObj = document.createElement("h3")
  let closeIcon = document.createElement("i")
  closeIcon.classList.add("material-icons")
  closeIcon.textContent = "close"
  closeIcon.addEventListener("click", off.bind(background))

  let contentBox = document.createElement("div")
  contentBox.classList.add("tts-alert-contentBox")

  let btnRow = document.createElement("div")
  btnRow.classList.add("tts-alert-btnRow")


  background.appendChild(body)
  body.appendChild(closeRow)
  body.appendChild(contentBox)
  body.appendChild(btnRow)
  closeRow.appendChild(titleObj)
  closeRow.appendChild(closeIcon)

  document.body.appendChild(background)

  if(title){
    titleObj.textContent = title
  }

  function off(ev) {
    if(ev.target.classList.contains("tts-alert-background") || ev.target.textContent == "close"){
      this.parentElement.removeChild(this)
    }
  }

  function createButtons() {
    if(buttons){
      buttons.forEach((btn, i)=>{
        let newBtn = document.createElement("button")
        newBtn.textContent = btn
        btnRow.appendChild(newBtn)
        newBtn.addEventListener("click", off.bind(background))
        if(buttonsEvents && buttonsEvents[i]){
          btnRow.addEventListener("click", buttonsEvents[i].bind(newBtn))
        }
      })
    }
  }

  function setContent() {
    if(content){
      if (typeof(content) === "string") {
        contentBox.innerHTML = content
      }else if(typeof(content) === "object"){
        contentBox.appendChild(content)
      }
    }
  }

  createButtons()
  setContent()
}