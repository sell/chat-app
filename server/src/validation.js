const Joi = require('@hapi/joi');

// register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(36).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(8).max(1056).required()
    });
    // validating data
    return schema.validate(data);
};

// login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(36).required(),
        password: Joi.string().min(8).max(1056).required()
    });
    // validating data
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;