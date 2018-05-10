'use strict';
const hbsHelpers = (hbs) => {
    return hbs.create({
        extname: 'hbs',
        defaultLayout: 'layout',
        layoutsDir: __dirname + './../views',
        helpers: {
            test: (test)=>{
                return test+ 'sucessed';
            },
            ownVideo: (currentUser, mediaOwner) =>{
                const username = currentUser.facebook.email || currentUser.local.email;
                if (mediaOwner === username) {
                    return '<button  type="button" class="btn btn-sm btn-outline-secondary btn-video-edit">Edit</button><button type="button" class="btn btn-sm btn-outline-secondary btn-video-delete">delete</button>';
                }
                return '';
            },
        },
});
};


module.exports = hbsHelpers;
