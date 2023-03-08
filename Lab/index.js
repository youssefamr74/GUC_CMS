const mongoose= require('mongoose')
const {app}= require('./app')
const url = 'mongodb://AdvancedDatabase:db704@cluster0-shard-00-00.zg2uc.mongodb.net:27017,cluster0-shard-00-01.zg2uc.mongodb.net:27017,cluster0-shard-00-02.zg2uc.mongodb.net:27017/GUC?ssl=true&replicaSet=atlas-5zd8r7-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(url).then(()=>{
    console.log('Successfully Connected to The Database')})
.catch((err)=>{
    console.log(err)
})

app.listen(1000)
console.log("Server starterd on port 1000");