const {Router} = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const _APIURI = "/api/v0/user/";
const _SECRET = "WALRUS";

router.get("/api/", (req, res) => res.json({message: "Hola mundo"}));

/*register*/
router.post(_APIURI + "register/", async (req, res) => {
    
    console.log("entrando a endpoint");
    const {email, password} = req.body;
    const newUser = new User({email: email, password: password});
    if (!User.findOne({email})) {
        await newUser.save();
        /*creacion del token*/
        const token = jwt.sign({id: newUser._id, email: newUser.email}, _SECRET, {expiresIn: "1day"});

        return res.status(200).json({token});

    }
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

router.get(_APIURI + "datos/", verifyToken, (req, res) => {

    res.status(200).json([{id: 1, datos: "datos1"}, {id: 2, datos: "datos2"}, {id: 3, datos: "datos3"}]);
})


function verifyToken(req, res, next) {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token != null) {
            const verify = jwt.verify(token, _SECRET);
            req.userID = verify._id;
            req.email = verify.email;
            return next();
        }

    }
    res.status(401).json({message: "must login to get access"})

}


module.exports = router;