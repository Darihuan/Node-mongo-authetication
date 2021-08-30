const {Router} = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const _APIURI = "/api/v0/user/";
const _SECRET = process.env['PORT'] || 'WALRUS'

router.get("/api/", (req, res) => res.json({message: "Hola mundo"}));

/*register*/
router.post(_APIURI + "register/", async (req, res) => {


    const {email, password} = req.body;
    const newUser = new User({email: email, password: password});
    const user = await User.findOne({email})
    if (!user) {

        await newUser.save();
        const token = jwt.sign({id: newUser._id, email: newUser.email}, _SECRET, {expiresIn: "1day"});

        return res.status(200).json({token});
    }


    /*creacion del token*/


    return res.status(409).json({message: "the email currently in use"})

});

/*login*/
router.post(_APIURI + "login/", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        if (user.password == password) {
            console.log("Log correcto")
            const token = jwt.sign({id: user._id, email: user.email}, _SECRET, {expiresIn: "1day"});
            res.status(200).json({token});
            return;
        }
        res.status(403).json({message: "incorrect password"});
        return;
    }
    res.status(403).json({message: "Email doesnt exist"});
});

router.get(_APIURI + "islogged/", verifyToken, (req, res) => {

    res.status(200).json({isLogged: true});
})


function verifyToken(req, res, next) {


        const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, _SECRET, (err, codigo) => {
                if (err) {
                    console.log(err);
                  return  res.status(401).json({isLogged: false})
                }
                req.userID = codigo._id;
                req.email = codigo.email;
                return next();
            });






}


module.exports = router;