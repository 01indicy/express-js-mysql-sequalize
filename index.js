const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const port = 8081
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

app.use('/',require('./routes/routes'))
app.listen(port,() => { console.log(`app is running on port ${port}`) })