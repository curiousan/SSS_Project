const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');

const User = new mongoose.Schema({
    local: {
        email: String,
        password: String,
        username: String,
    },
    facebook: {
      id: String,
      token: String,
      name: String,
      email: String, 
    },
});

User.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validatePassword = function(password) {
   return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', User);

