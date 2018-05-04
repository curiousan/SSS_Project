'use strict';
const hbsHelpers = (hbs) => {
    return hbs.create({
        extname: 'hbs',
        defaultLayout: 'layout',
        layoutsDir: __dirname + './../views',
        helpers: {
            test: ()=>{
                return 'test';
            },
        },
});
};


module.exports = hbsHelpers;
