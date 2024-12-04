const Joi = require('joi');

const validateRegisterUser = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required()
})

const validateLoginUser = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required()
})

const validateResignData = Joi.object({
    employeeId:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')).required(),
    lwd:Joi.date().required(),
    // reason:Joi.string().min(3)
})


module.exports = {validateRegisterUser,validateLoginUser,validateResignData}