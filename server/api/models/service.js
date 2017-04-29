import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    titre: String,
    texte: String,
    icon: String,
    couleur: String
});

let model = mongoose.model('Service', serviceSchema);

export default class Service {

    findAll(req, res) {
        model.find({}, (err, services) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json(services);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, (err, service) => {
            if (err || !service) {
                res.sendStatus(403);
            } else {
                res.json(service);
            }
        });
    }

    create(req, res) {
        model.create({
                titre: req.body.titre,
                texte: req.body.texte,
                icon: req.body.icon,
                couleur: req.body.couleur
            },
            (err, service) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(service);
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, {
          titre: req.body.titre,
          texte: req.body.texte,
          icon: req.body.icon,
          couleur: req.body.couleur
        }, (err, service) => {
            if (err || !service) {
                res.status(500).send(err.message);
            } else {
                res.json(service);
            }
        });
    }

    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        })
    }
}
