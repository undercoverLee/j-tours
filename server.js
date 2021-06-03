const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: "./config.env" })

const app = require('./app')


const DB = process.env.DATABASE.replace(
    '<password>', process.env.DATABASE_PASSWORD
)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true

}).then(() => console.log('DB connection succesful'))






// testTour.save().then(doc => {
//     console.log(doc)
// }).catch(err => {
//     console.log('Error')
// })




app.listen(3000, () => {
    console.log("Server is listeing")
})


