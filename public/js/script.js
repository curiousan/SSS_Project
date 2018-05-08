$(() => {
    let player;
    const viewButton = document.querySelector('.video-view');
    const videoCloseButton = document.querySelector('.modal-close-button');
    const modal = document.querySelector('.modal');
    $(document).scroll(function() {
        const $nav = $('.top-bar');
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });

    viewButton.addEventListener('click', (e) => {
        player = bitmovin.player('my_player');
        startStreaming(player);
    });

    videoCloseButton.addEventListener('click', (e) => {
        stopStreaming(player);
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) =>{
    if (event.target == modal) {
        stopStreaming(player);
    }
    };
});


const startStreaming = (player) => {
    const conf = {
        key: '72f9d43b-3018-48eb-a401-2c217688e54a',
        source: {
            dash: 'https://d2kxths7qfsef9.cloudfront.net/dash/video-1525343031076-master.mpd',
            hls: 'https://d2kxths7qfsef9.cloudfront.net/hls/video-1525343031076-master.m3u8',
            progressive: 'https://',
            poster: window.location.host+'/static/images/playback.jpg',
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

