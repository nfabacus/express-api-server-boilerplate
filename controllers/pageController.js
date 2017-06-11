const Page = require('../models/page');

exports.getPages = function (req, res, next) {
  Page.find(function(err, pages){
    if(err) { return next(err); }

    res.json(pages);
  });
}

exports.createPage = function (req, res, next) {
  console.log("req.body: ", req.body);
  const page = new Page(req.body);

  page.save(function(err, page){
    if(err) { return next(err); }

    res.json(page);
  });
}
