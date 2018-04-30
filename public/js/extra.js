$(()=> {
    const conf = {
        key: '72f9d43b-3018-48eb-a401-2c217688e54a',
        source: {
          dash: 'https://s3-eu-west-1.amazonaws.com/s3-media-out/dash/master-dash.mpd',
          hls: 'https://s3-eu-west-1.amazonaws.com/s3-media-out/hls/master-hls.m3u8',
          progressive: 'https://s3-eu-west-1.amazonaws.com/s3-media-in/712279929.mp4',
          poster: 'https://s3-eu-west-1.amazonaws.com/s3-media-out/thumbs/712279929-00001.png',
        },

      };

      const player = bitmovin.player('my_player');

      player.setup(conf).then(()=> {
        player.play();
      });
});

