const Page = require('../models/page');
// const Subcontent = require('../models/pageSubcontent');

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
    return next();
  });
}

exports.getPage = function(req, res, next) {
  // req.page.populate('subcontents', function(err, page) {
    res.json(req.page);
  // })
}

function validateUrl(pageUrl) {
  const spaces = /\s/g; //regex for spaces
  const upperCases = /[A-Z]/g;

  if(spaces.test(pageUrl) || upperCases.test(pageUrl)) {
    return true;
  } else {
    return false;
  }
}

exports.createPage = function (req, res, next) {
  if(validateUrl(req.body.url)) {
    res.json({"error": "Please remove all spaces for url. Url must also be lower-case."});
  } else {
    const page = new Page(req.body);
    page.save(function(err, page){
      if(err) { return next(err); }

      res.json(page);
    });
  }
}

exports.updatePage = function (req, res, next) {
  // console.log("REQ.PAGE: ", req.page); //req.page is the json data received from the getPageFromPageUrl function.
  // console.log("REQ.BODY: ", req.body); //req.body is the json data sending from the route.
  if(validateUrl(req.body.url)) {
    res.json({"error": "Please remove all spaces for url. Url must also be lower-case."});
  } else {
    req.page.update(req.body, function(err, page){
      if(err) { return next(err); }
      res.json({message: "Page is updated successfully."});
    });
  }
}

exports.deletePage = function(req, res, next) {
  req.page.remove(function(err, page){
    if(err) { return next(err); }

    res.json(page);
  });
}
// exports.createSubcontent = function (req, res, next) {
//   const subcontent = new Subcontent(req.body);
//   subcontent.page = req.page;
//
//   subcontent.save(function(err, subcontent){
//     if(err) { return next(err); }
//
//     req.page.subcontents.push(subcontent);
//     req.page.save(function(err, page) {
//       if(err) {return next(err); }
//
//       res.json(subcontent);
//     })
//   });
// }
