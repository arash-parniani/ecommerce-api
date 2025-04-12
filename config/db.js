const mongoose = require('mongoose');

const db = () =>  mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Mongoose Connect')
})
.catch((err) => {
    console.log(`error connectios is ${err}`)
})


module.exports = db