const express = require('express')
const app     = express()

app.set('view engine', 'default')

app.use(express.static('public'))
app.use(express.static('./views/'))

app.get('/', (req, res)=>{
	res.sendFile('index')
})

app.listen(3000, (err)=>{
	if(err) console.log(err.message), process.exit(1)

	console.log("Corriendo en el puerto 3000")
})