module.exports = function toots_toast(options = {}) {
	let container = document.getElementById("tts-toast-container")
	let child
	let text      = options.text
	let duration  = options.duration || 3000
	let position  = options.position || "bottom-center"

	if(!container){
		container = document.createElement("div")
		container.classList.add("tts-toast-container")
		container.id = "tts-toast-container"
		document.body.appendChild(container)
		if (position) {
			let al = position.split("-")
			container.classList.add(al[0])
			container.classList.add(al[1])
		}else{
			container.classList.add("bottom")
			container.classList.add("center")
		}
	}

	let toast = document.createElement("div")
	toast.classList.add("tts-toast")

	if(text){
		toast.textContent = text
	}
	
	if(!child){
		container.appendChild(toast)
	}else{
		container.classList.add("new")
		let child = container.children[0]
		setTimeout(function() {
			container.insertBefore(toast, child)
			container.classList.remove("new")
		}, 1000)
	}

	setTimeout(function() {
		toast.classList.add("fadeOut")
		setTimeout(function() {
			toast.parentElement.removeChild(toast)
		}, 1000)
	}, duration)
}
