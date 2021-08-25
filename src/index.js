/*imports*/
const express= require('express');



/*inicializaciones*/
const app=express();
const _PORT=1203;
const mongo=require('./database');
app.use(express.json());
app.use(require('./endpoints/index'));
/*servidor*/

app.listen(_PORT,()=>{
    console.log("=====================")
    console.log("SERVER ON PORT:",_PORT)
    console.log("=====================")
})