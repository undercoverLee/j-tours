
const fs = require('fs')

// e kem lexu filen i cili i permban te gjitha tours
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = (req, res) => {
    console.log(req.requestTime)

    res.json({
        status: "success",
        requested: req.requestTime,
        data: { tours }
    })
}

exports.createTour = (req, res) => {
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

exports.getTour = (req, res) => {
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

exports.updateTour = (req, res) => {

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

exports.deleteTour = (req, res) => {

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