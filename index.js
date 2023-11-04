const express = require('express')
const cors = require('cors')
require('dotenv').config()

const ConnectDB = require('./db/connect')
// routes
const authroute = require('./routes/auth')
const productroute = require('./routes/product')
const cartroute = require('./routes/cart')
const categoryroute = require('./routes/category')
// other middleware import
const errorHandler = require('./middleware/errorhandler')
const notFound = require('./middleware/notfound')
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
   res.status(234).send('welcome to eyeware store')
})

app.use('/api/auth', authroute)
app.use('/api/product', productroute)
app.use('/api/cart', cartroute)
app.use('/api/category', categoryroute)





app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 8000

const start = async () => {
   try {

      await ConnectDB(process.env.DB_URL)
      console.log('db connected')
      app.listen(PORT, () => {
         console.log(`server is listening at port ${PORT}...`)
      })
   }
   catch (error) {
      console.log(error)
   }
}

start()