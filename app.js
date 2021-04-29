const express = require('express')
const fs = require('fs')

const app = express()

// middelware - mes req, res
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: "Hello from the sever side",
        app: "jTours"
    })
})

app.post('/', (req, res) => {
    res.send("You can post to this URL")
})


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
    res.json({
        status: "success",
        data: { tours }
    })
})


app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body)

    // ka me u shtu nje dokument i ri
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.json({
            status: "success",
            data: {
                tour: newTour
            }
        })

    })

})



app.listen(3000, () => {
    console.log("Server is listeing")
})

