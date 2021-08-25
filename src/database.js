const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://authenticacion:formulario@sandbox.aqktt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoURI);

try {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log("*** database conected***"));
} catch (error) {
    console.log("error on database conection")
}