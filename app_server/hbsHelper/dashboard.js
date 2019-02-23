'use strict';
const dayjs = require('dayjs');
const hbsHelpers = (hbs) => {
  return hbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + './../views',
    helpers: {
      test: (test) => {
        return test + 'sucessed';
      },
      ownVideo: (currentUser, mediaOwner) => {
        const username = currentUser.facebook.email || currentUser.local.email;
        if (mediaOwner === username) {
          return '<button  type="button" class="btn btn-sm btn-outline-secondary btn-video-edit">Edit</button><button type="button" class="btn btn-sm btn-outline-secondary btn-video-delete">delete</button>';
        }
        return '';
      },
      formatDateTime: (date) => {
        return dayjs(date).format('DD MMM, YYYY');
      },
      fixDesc: (string) =>{
        return string.substring(0,27).concat('..');
      }
    },
  });
};

module.exports = hbsHelpers;
