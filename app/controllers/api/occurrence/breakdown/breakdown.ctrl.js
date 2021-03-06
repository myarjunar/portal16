'use strict';
let express = require('express'),
    router = express.Router(),
    breakdown = require('./breakdown'),
    log = require('../../../../../config/log');

module.exports = function(app) {
    app.use('/api', router);
};

router.get('/occurrence/breakdown', function(req, res) {
    let query = breakdown.parseQuery(req.query);
    delete query.advanced;
    // let locale = query.locale;
    delete query.locale;

    breakdown.query(query, req.__)
        .then(function(response) {
            res.send(response);
        })
        .catch(function(err) {
            res.status(500);
            res.send();
            log.trace(err);
        });
});
