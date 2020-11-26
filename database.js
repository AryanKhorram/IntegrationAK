const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URI || "mongodb+srv://AryanKhorram:Abomasnow1@cluster1.9mv9n.mongodb.net/Cluster1?retryWrites=true&w=majority";

mongoose
    .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB Connected!');
    })
    .catch(error => {
    console.log('Connection Error: ${err.message}');
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

module.exports = db;