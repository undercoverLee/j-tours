const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Tour = require ('./../../models/tourModel')

dotenv.config({ path: "./config.env" })


const DB = process.env.DATABASE.replace(
    '<password>', process.env.DATABASE_PASSWORD
)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true

}).then(() => console.log('DB connection succesful'))


// Read json 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"))

// import data into db

const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('Data added')
    }

    catch (err) {
        console.log(err)
    }
}

// Delete old data
const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log('Data deleted')
    }

    catch (err) {
        console.log(err)
    }
}

if (process.argv[2] === "--import") {
    importData()
}
else if (process.argv[2] === "--delete") {
    deleteData()
}


console.log(process.argv) // --import & --delete npm i ksdjs -global




// node dev-data/data/import-dev-data.js --import