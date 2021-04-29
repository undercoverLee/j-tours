const express = require('express')
const fs = require('fs')

const app = express()

app.get('/', (req, res) => {
    res.json({
        message: "Hello from the sever side",
        app: "jTours"
    })
})

app.post('/', (req, res) => {
    res.send("You can post to this URL")
})


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.js`))




app.listen(3000, () => {
    console.log("Server is listeing")
})

