'use strict';

class Database {
  constructor() {
    this.mongoose = require('mongoose');
    // if (process.env.NODE_ENV === 'development') {
    //   this.https = require('https');
    //   const fs = require('fs');
    //   const sslkey = fs.readFileSync('ssl-key.pem');
    //   const sslcert = fs.readFileSync('ssl-cert.pem');
    //   this.options = {
    //     key: sslkey,
    //     cert: sslcert,
    //   };
    // }
  }

  connect(url, app, port) {
    this.mongoose.connect(url).then(
      () => {
        app.listen(port, () => console.log('Connected successfully.'));
        // if (process.env.NODE_ENV === 'development') {
        //   this.https.createServer(this.options, app).listen(port, () => {
        //     console.log(`server running on port ${port}`);
        //   });
        // } else {
        //   return app.listen(port, () => {
        //     console.log(`server started at ${port}`);
        //   });
        // }
      },
      (err) => {
        console.log('Connection to db failed: ' + err);
      }
    );
  }

  getSchema(schema, name) {
    const s = new this.mongoose.Schema(schema);
    return this.mongoose.model(name, s);
  }
}

module.exports = new Database();
