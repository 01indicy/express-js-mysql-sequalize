const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cluster = require('cluster');
const helmet = require('helmet')
const os = require('os');
const port = 8081
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.use((req, res,next) => {
    console.log(`the server consists of ${os.cpus().length} cpus currently running on process id ${process.pid}`)
    next()
})

app.use('/',require('./routes/routes'))

if(cluster["isPrimary"]){
    console.log(`Primary ${process.pid} is running`);
    for (let i =0; i < os.cpus().length;i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal)=>{
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    })
}else{
    app.listen(port,() => { console.log(`app is running on port ${port} ... worker ${process.pid}`) })
}
