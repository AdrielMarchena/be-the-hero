const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();



routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    }),
}) ,SessionController.create)


//Index route for list Ongs
routes.get('/ongs', OngController.index);
//create route for insert a ong in table 'ongs'
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),

    

}) ,OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({

        authorization: Joi.string().required()
    
    }).unknown(),

}) ,ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentController.index);


routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({

        authorization: Joi.string().required()
    
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),

}) , IncidentController.create);


routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({

        authorization: Joi.string().required()
    
    }).unknown(),
}) ,IncidentController.delete)

module.exports = routes; 