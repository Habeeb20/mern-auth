const router = require("express").Router();
const {User} = require("../model/mern")
const Joi = require("joi");
const bcrypt = require("bcrypt");
router.post("/", async(req, res) => {
    try {
        const {error } = validate(req.body);
        if(error){
            return res.status(400).send({message: "error"})
        }
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(401).send({message:" invalid"})
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if(!validPassword){
            return res.status(404).send({message:"not registered"})
        }

        const token = user.generateAuthToken();
        res.status(200).send({data:token, message:"login successfully"})

        
    } catch (error) {
        console.log(error)
        
    }

    const validate = (data) => {
        const schema = Joi.object({
            email:Joi.string().email().required().label("Email"),
            password:Joi.string().required().label("Password")

        });
        return schema.validate(data)
    }

});


module.exports = router;