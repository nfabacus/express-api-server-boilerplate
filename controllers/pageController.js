const Page = require('../models/page');
const Subcontent = require('../models/pageSubcontent');

exports.getPages = function (req, res, next) {
  Page.find(function(err, pages){
    if(err) { return next(err); }

    res.json(pages);
  });
}

exports.getPageFromPageUrl = function(req, res, next, pageUrl) {
  const query = Page.findOne({ url: pageUrl });

  query.exec(function (err, page){
    if(err) { return next(err); }
    if(!page) { return next(new Error("can't find the page.")); }

    req.page = page;
    console.log("req.page: ", req.page);
    return next();
  });
}

exports.getPage = function(req, res, next) {
  req.page.populate('subcontents', function(err, page) {
    res.json(page);
  })
}

exports.createPage = function (req, res, next) {
  const page = new Page(req.body);

  page.save(function(err, page){
    if(err) { return next(err); }

    res.json(page);
  });
}

exports.createSubcontent = function (req, res, next) {
  const subcontent = new Subcontent(req.body);
  subcontent.page = req.page;

  subcontent.save(function(err, subcontent){
    if(err) { return next(err); }

    req.page.subcontents.push(subcontent);
    req.page.save(function(err, page) {
      if(err) {return next(err); }

      res.json(subcontent);
    })
  });
}
