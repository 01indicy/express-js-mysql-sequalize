const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 8081
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req, res) => { res.send({msg:'default route'}) })
require('./db/config')
app.listen(port,() => { console.log(`app is running on port ${port}`) })