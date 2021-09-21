import express from 'express'
import routes from './routes/index'
import env from 'dotenv'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
env.config()
const app = express()
 mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })
 const con= mongoose.connection
try{
    con.on('open',() => console.log('db connected'))
} catch(error){
     console.log(error)
}
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json()) 
app.use(cors({origin:"*"}))
 app.use('/api', routes)

app.listen(process.env.PORT || 5000,()=>console.log(`App is running on port ${process.env.PORT}`))