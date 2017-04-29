import express from 'express';
import Realisation from '../models/realisation.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var realisation = new Realisation();

    router.get('/', realisation.findAll);

    router.get('/:id', realisation.findById);

    router.post('/', Auth.hasAuthorization, realisation.create);

    router.put('/:id', Auth.hasAuthorization, realisation.update);

    router.delete('/:id', Auth.hasAuthorization, realisation.delete);

    app.use('/realisations', router);

}
