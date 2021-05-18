const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')


const app = express()


// 1) MIDDELWARE
// middelware - mes req, res
app.use(express.json())

app.use(morgan('dev'))


app.use((req, res, next) => {
    console.log("Hello from the middelware")
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})


// 2) ROUTE HANDLERS



// 3) ROUTE

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)




// 4) SERVER 

app.listen(3000, () => {
    console.log("Server is listeing")
})

