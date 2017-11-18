module.exports = function colorCode(container, cls){
  let count = 0 //This is to prevent infinite loops
  let operatorsRef = ["+", "-", "*", "/", "%", "++", "+=", "=+", "--", "-=", "=-", "**", "|", "||", "&", "&&", "=", "==", "===", "<", ">", "<=", ">=", "?", "@", "!"]
  let dividers     = [" ", "\n", ".", "(", ")", "{", "}", ":", ","]
  let strDivider   = ["'", '"', '`']

  const classes   = cls || ["str", "com", "kw", "par", "num", "op", "fn"]
  let objs        = {}

  classes.forEach(key => {
    objs[key] = new Array()
    createSpans(key)
  })

  function createSpans(tag) {
    let val  = container.innerHTML
    let indx = val.indexOf(tag + ":")
    let i    = 0
    let word = ""
    let len  = tag.length + 1
    let stopCondition
    
    while(indx != -1 && count < 500){  //'count < 500' is to prevent infinite loops
      let ltr = val.charAt(indx + len + i)
      let nxt = val.charAt(indx + len + i + 1)
      
      if(tag === "com"){
        stopCondition = nxt === "\n"
      }else if(tag === "str"){
        if(i === 0) stop = ltr
        stopCondition = ltr === stop && i > 0
      }else{
        stopCondition = dividers.includes(nxt) || operatorsRef.includes(nxt)
      }

      word += ltr
      i++

      if(stopCondition){
        let arr = new Array()
        arr.push(`${tag}:${word}`)
        arr.push(`<span class='${tag}'>${word}</span>`)

        objs[tag].push(arr)

        word = ""
        indx = val.indexOf(tag + ":", indx + 1)
        i = 0
      }
      count++ //This is to prevent infinite loops
    }
  }

  function replaceContent(){//Coment
    let len = Object.keys(objs).length
    for(let a = 0; a < len; a++){
      let key = Object.keys(objs)[a]
      objs[key].forEach((el, i) => {
        container.innerHTML = container.innerHTML.replace(el[0], el[1])
      })
    }
  }

  replaceContent()
}