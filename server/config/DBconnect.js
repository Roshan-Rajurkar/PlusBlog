const mongoose = require("mongoose")

const mongoURL = 'mongodb+srv://roshanrajurkar1:Roshan1234@cluster0.g0cx9ug.mongodb.net/test?retryWrites=true&w=majority';

const DBconnect = async () => {
    const response = await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(response.connection.host + "connected to db")
}

module.exports = DBconnect;
