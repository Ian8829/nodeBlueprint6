const models = require('../models/index');
const Band = require('../models/band');

// Create Band
exports.create = (req, res) => {
  // create a new instance of the Bands model with req body
  models.Band.create(req.body)
    .then(band => {
      // res.json(band)
      res.redirect('/bands');
    });
};

// List Bands
exports.list = (req, res) => {
  // List all bands and sort by date
  models.Band.findAll({
    // Order: latest created
    order: 'createdAt DESC'
  })
    .then(bands => {
      // res.json(Bands);
      // render result
      res.render('list', {
        title: 'List bands',
        bands
      });
    });
};

// Get by band id
exports.byId = (req, res) => {
  models.Band.find({
    where: {
      id: req.params.id
    }
  })
    .then(band => res.json(band));
};

// Update by id
exports.update = (req, res) => {
  models.Band.find({
    where: {
      id: req.params.id
    }
  })
    .then(band => {
      if (band) {
        band.updateAttributes({
          name: req.body.name,
          description: req.body.description,
          album: req.body.album,
          year: req.body.year,
          UserId: req.body.user_id
        })
          .then(band => res.send(band));
      }
    });
};

// Delete by id
exports.delete = (req, res) => {
  models.Band.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(band => res.json(band));
};