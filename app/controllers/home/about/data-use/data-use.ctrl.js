var express = require('express'),
    router = express.Router(),
    request = require('request');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/data-use/:key', function(req, res) {
    request('http://drupaledit.gbif-dev.org/api/v0.1/data_use/' + req.params.key, function(error, response, body) {
        if (response.statusCode !== 200) {
            res.send('Something went wrong from the Content API.');
        }
        else {
            body = JSON.parse(body);
            res.render('pages/about/data-use/data-use.nunjucks', {
                data: body.data[0],
                image: body.data[0].images[0],
                self: body.self,
                hasTitle: true
            });
        }
    });
});
