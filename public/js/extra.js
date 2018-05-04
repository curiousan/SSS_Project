$(() => {
  const url = window.location.href;
  const videoId = url.split('/').pop();
  fetch('https://localhost:3000/api/videos/'+videoId+'')
  .then((data) =>{
    return data.json();
  }).then((video) =>{
    console.log(video);
    const conf = {
      key: '72f9d43b-3018-48eb-a401-2c217688e54a',
      source: {
        dash: 'https://'+video.dashSrc,
        hls: 'https://'+video.hlsSrc,
        progressive: 'https://'+video.progressiveSrc,
        poster: video.thumbSrc,
      },
  
    };
  
    const player = bitmovin.player('my_player');
  
    player.setup(conf).then(() => {
      player.play();
    });
  });
});


