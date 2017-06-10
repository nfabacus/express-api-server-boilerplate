exports.confirmAdmin = function(req, res, next) {
  if(req.user.adminType !== 1) {
    res.send({ message: 'Sorry, you are not an admin.  You cannot access this link.' });
  }
  next();
}

exports.confirmParent = function(req, res, next) {
  if(!req.user.parent) {
    res.send({ message: 'Sorry, you are not registered as a parent.  You cannot access this link.' });
  }
  next();
}
