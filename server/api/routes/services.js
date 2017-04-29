import express from 'express';
import Service from '../models/service.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var service = new Service();

    router.get('/', service.findAll);

    router.get('/:id', service.findById);

    router.post('/', Auth.hasAuthorization, service.create);

    router.put('/:id', Auth.hasAuthorization, service.update);

    router.delete('/:id', Auth.hasAuthorization, service.delete);

    app.use('/services', router);

}
