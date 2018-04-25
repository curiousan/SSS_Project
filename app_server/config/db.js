'use strict';


class Database {
  constructor() {
    this.mongoose = require('mongoose');
  }


  connect(url, app, options, https) {
    this.mongoose.connect(url).then(() => {
      console.log('Connected successfully.');
      https.createServer(options, app).listen(3000);
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
