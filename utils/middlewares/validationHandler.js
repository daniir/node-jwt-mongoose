function validateSchema(schema, data){
    const {error} = schema.validate(data);
    return error;
};

function validationHandler(schema){
    return function(req, res, next){
        const error = validateSchema(schema, req.body);
        error ? res.json({
            msg: error.details[0].message,
        }) : next();
    };
};

module.exports = {validationHandler};