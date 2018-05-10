$(() => {
    let player;
    const viewButton = document.querySelectorAll('.video-view');
    const videoCloseButton = document.querySelector('.modal-close-button');
    const videoDeleteButton = document.querySelectorAll('.btn-video-delete');
    const renderUpdateViewButton = document.querySelectorAll('.btn-video-edit');
    const updateVideoButton = document.querySelectorAll('.update-video-button');


    addUpdateEvent(renderUpdateViewButton);

    addDeleteEvent(videoDeleteButton);

    callVideoUpdate(updateVideoButton);

    const modal = document.querySelector('.modal');
    $(document).scroll(function() {
        const $nav = $('.top-bar');
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });

    for (let i = 0; i < viewButton.length; i++) {
        viewButton[i].addEventListener('click', (e) => {
            player = bitmovin.player('my_player');
            getVideoData(e).then((video) => {
                startStreaming(player, video);
            });
        });
    }


    videoCloseButton.addEventListener('click', (e) => {
        stopStreaming(player);
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == modal) {
            stopStreaming(player);
        }
    };
});


const startStreaming = (player, video) => {
    const conf = {
        key: '72f9d43b-3018-48eb-a401-2c217688e54a',
        source: {
            dash: 'https://' + video.dashSrc,
            hls: 'https://' + video.hlsSrc,
            progressive: 'https://' + video.progressiveSrc,
            poster: video.thumbSrc,
        },

    };
    player.setup(conf).then(() => {
        player.play();
    });
};

const stopStreaming = (player) => {
    if (player.isSetup()) {
        console.log('destroying the player');
        return player.destroy();
    }
    console.log('player is not set yet');
};

const getVideoData = (event) => {
    const id = event.target.closest('.video-data-store').getAttribute('data-src');
    return new Promise((resolve, reject) => {
        console.log('calling endpoints ' + 'https://' + window.location.host + '/api/videos/' + id + '/');
        fetch('https://' + window.location.host + '/api/videos/' + id + '/')
            .then((data) => {
                return data.json();
            }).then((video) => {
                    document.querySelector('.modal-title').innerText = video.title;
                    document.querySelector('.model-video-info p:nth-child(1)').innerText = 'Category: ' + video.category,
                    document.querySelector('.model-video-info p:nth-child(2)').innerText = 'Uploaded: ' + video.uploadedOn,
                    document.querySelector('.model-video-info .video-numbers p:nth-child(1)').innerText = 'Views: ' + video.views,
                    document.querySelector('.model-video-info .video-numbers p:nth-child(2)').innerText = 'Ratings ' + video.ratings,
                    document.querySelector('.model-video-info > p').innerText = video.desc;
                resolve(video);
            });
    });
};

const addDeleteEvent = (elements)=> {
    console.log(elements);
    for (let i = 0; i< elements.length; i++) {
        elements[i].addEventListener('click', (e)=>{
            const url = 'api/videos/'+e.target.closest('.video-data-store').getAttribute('data-src');
            const params = {
                method: 'DELETE',
                credentials: 'include',
            };
            fetch(url, params)
            .then((data) =>{
                return data.body;
            }).then((e) =>{
                console.log(e);
                window.location.href= '/';
            });
        });
    }
};

const addUpdateEvent = (elements)=> {
    console.log(elements);
    for (let i = 0; i< elements.length; i++) {
        elements[i].addEventListener('click', (e)=>{
            const id = e.target.closest('.video-data-store').getAttribute('data-src');
            const url = location.protocol+'//'+location.host+'/update/'+id;
            window.location = url;
        });
    }
};

const callVideoUpdate = (elements)=> {
    console.log(elements);
    for (let i = 0; i< elements.length; i++) {
        elements[i].addEventListener('click', (e)=>{
            const parentNode = e.target.closest('.video-data-store');
            const id = parentNode.getAttribute('data-src');
            const title = parentNode.querySelector('#video-title').value;
            const category = parentNode.querySelector('#video-category').value;
            const artist = parentNode.querySelector('.video-artists').value;
            const desc = parentNode.querySelector('.video-desc').value;
            const payloadBody = JSON.stringify({
                'title': title,
                'category': category,
                'artists': [artist],
                'desc': desc,
            });

            console.log(payloadBody);
            const params = {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: payloadBody,

            };

            console.log(params);

            fetch(location.protocol+'//'+location.host+'/api/videos/'+id+'', params)
            .then((data) =>{
                return data.text;
            }).then((video) =>{
                console.log(video);
               // window.location = location.protocol+'//'+location.host+'/'
            });
        });
    }
};

