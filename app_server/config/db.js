'use strict';


class Database {
  constructor() {
    this.mongoose = require('mongoose');
  }


  connect(url, app, http) {
    this.mongoose.connect(url).then(() => {
      console.log('Connected successfully.');
      http.createServer(app).listen(process.env.PORT|| 3000);
    }, (err) => {
      console.log('Connection to db failed: ' + err);
    });
  }

  getSchema(schema, name) {
    const s = new this.mongoose.Schema(schema);
    return this.mongoose.model(name, s);
  }
}

module.exports = new Database();
