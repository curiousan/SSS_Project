const User = require('./../models/user');

 const errHandler= (err) => {
    console.error('There was an error performing the operation');
    console.log(err);
    console.log(err.code);
    return console.error(err.message);
 }

module.exports.getAllUser = (req, res)=>{
    return User.find({},
        (err, users) =>{
          if (err) {
            return errHandler(err);
          }
          console.log(users);
          return res.json(users);
        });
};

module.exports.getUserByEmail = (req, res)=>{
    return User.find({$or: [{'local.email': req.query.value}, {'facebook.email': req.query.value}]},
    (err, user) =>{
      if (err) {
        return errHandler(err);
      }
      if (user == null) {
        return res.json({msg: 'User does not exist in the dBase, please' +
        ' sign up to login as a user'});
      }
      console.log(user.email);
      return res.json(user);
  });
    
};
