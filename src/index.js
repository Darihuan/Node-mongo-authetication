/*imports*/
const express= require('express');



/*inicializaciones*/
const app=express();
const $PORT=443;
const mongo=require('./database');
app.use(express.json());
app.use(require('./endpoints/index'));
/*servidor*/

app.listen($PORT,()=>{
    console.log("=====================")
    console.log("SERVER ON PORT:",_PORT)
    console.log("=====================")
})