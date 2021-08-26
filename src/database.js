const mongoose = require('mongoose');
const USER=process.env['USER'];
const PASS=process.env['PASS'];
const mongoURI = `mongodb+srv://${USER}:${PASS}@sandbox.aqktt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongoURI);

try {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log("*** database conected***"));
} catch (error) {
    console.log("error on database conection")
}