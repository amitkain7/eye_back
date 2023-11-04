const ConnectDB = require('./db/connect')
const Product = require('./models/product')
const Cat = require('./models/category')
require('dotenv').config()
const data = require('./data')
const cat = require('./cate.json')


const setData = async() => {
    try{
        
        await ConnectDB(process.env.DB_URL)
        console.log('connected')

         await Product.deleteMany()
         await Product.create(data)
        console.log('ok')
        process.exit(0)
    }
    catch(error){
        console.log(error)
        process.exit(0)
    }

}

// setData()