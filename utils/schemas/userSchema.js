const Joi = require('joi');

const schemaSignUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
});

const schemaSignIn = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(), 
})


module.exports = {
    schemaSignUp,
    schemaSignIn,
};