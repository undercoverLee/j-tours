const express = require('express')
const fs = require('fs')

const app = express()

// middelware - mes req, res
app.use(express.json())

// e kem lexu filen i cili i permban te gjitha tours
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req, res) => {
    res.json({
        status: "success",
        data: { tours }
    })
}

const createTour = (req, res) => {
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
}

const getTour = (req, res) => {
    console.log(req.params)

    // po e marrim id-n dhe po e konvertojm ne string
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

    if (!tour) {
        return res.json({
            status: "fail",
            message: "Invaild ID"

        })
    }

    res.json({
        status: "success",
        data: {
            tour
        }
    })

}

const updateTour = (req, res) => {

    const id = req.params.id
    if (id > tours.length) {
        return res.json({
            status: "fail",
            messages: "Invalid ID"
        })
    }

    res.json({
        status: "success",
        data: {
            tour: "Updated tour"
        }
    })

}

const deleteTour = (req, res) => {

    const id = req.params.id
    if (id > tours.length) {
        return res.json({
            status: "fail",
            messages: "Invalid ID"
        })
    }

    res.json({
        status: "succsess",
        data: null
    })
}

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)


app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)



app.patch('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id
    if (id > tours.length) {
        return res.json({
            status: "fail",
            messages: "Invalid ID"
        })
    }

    res.json({
        status: "success",
        data: {
            tour: "Updated tour"
        }
    })

})

app.delete('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id
    if (id > tours.length) {
        return res.json({
            status: "fail",
            messages: "Invalid ID"
        })
    }

    res.json({
        status: "succsess",
        data: null
    })
})



app.listen(3000, () => {
    console.log("Server is listeing")
})

