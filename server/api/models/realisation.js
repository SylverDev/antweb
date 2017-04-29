import mongoose from 'mongoose';

const realisationSchema = new mongoose.Schema({
    nom: String,
    logo: String,
    description: String,
    technologie: String,
    site: String,
    date: {
        type: Date,
        default: Date.now
    }
});

let model = mongoose.model('Realisation', realisationSchema);

export default class Realisation {

    findAll(req, res) {
        model.find({}, (err, realisations) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json(realisations);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, (err, realisation) => {
            if (err || !realisation) {
                res.sendStatus(403);
            } else {
                res.json(realisation);
            }
        });
    }

    create(req, res) {
        model.create({
                nom: req.body.nom,
                logo: req.body.logo,
                description: req.body.description,
                technologie: req.body.technologie,
                site: req.body.site,
                date: req.body.date
            },
            (err, realisation) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(realisation);
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, {
            nom: req.body.nom,
            logo: req.body.logo,
            description: req.body.description,
            technologie: req.body.technologie,
            site: req.body.site,
            date: req.body.date
        }, (err, realisation) => {
            if (err || !realisation) {
                res.status(500).send(err.message);
            } else {
                res.json(realisation);
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
