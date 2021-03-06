/*imports*/
const express = require('express');
require('dotenv').config({path: './db.env'});
const cors=require('cors');

/*inicializaciones*/
const app = express();
app.use(cors());
app.options('*',cors());

const PORT = process.env.PORT || 3000

const mongo = require('./database');

app.use(express.json());
app.use(require('./endpoints/index'));
/*servidor*/

app.listen(PORT, () => {
    console.log("=====================")
    console.log("SERVER ON PORT:", PORT)
    console.log("=====================")
})