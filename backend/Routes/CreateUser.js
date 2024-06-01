const express = require("express")
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bycrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const jwtsecret="abcdefghijkk"
router.post("/createuser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),// password must be at least 5 chars long
    body('password', 'Incorrect password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt=await bycrypt.genSalt(10);
        let secpassword=await bycrypt.hash(req.body.password,salt)
        try {
            await User.create({
                name: req.body.name,
                password: secpassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


router.post("/loginuser", body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Incorrect password').isLength({ min: 5 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email
        try {
            let useremail = await User.findOne({ email });

            if (!useremail) {
                return res.status(400).json({ errors: "enter correct credentials" });
            }
            const pwdcompare=await bycrypt.compare(req.body.password,useremail.password)
            if ( !pwdcompare ) {
                return res.status(400).json({ errors: "enter correct credentials" });

            }
            const data={
                user:{
                    id:useremail.id
                }
            }
            const authtoken=jwt.sign(data,jwtsecret)
            return res.json({ success: true,authtoken:authtoken });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })
module.exports = router;