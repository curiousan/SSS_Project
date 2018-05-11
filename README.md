# Stream - Adaptive bitrate  media streaming

stream is an adaptive bitrate streaming service that allows user to upload any media (both video and audios) and stream them adaptively.
It leverages the power of aws elastic transcoder to encode media into multipul format.
[https://stream-transcoder.herokuapp.com/] - The app link

## Getting Started
Login is optional in to get access to the dozons of medias already available. Howver, if you want to add your your own video user should be 
logged in. Stream supports both local authentication or third party facebook authorization. Once user is logged in they can upload any media files
they want and to CRUD operations on those objects.


### implementation details
stream is express application that make use of passportjs for local and facebook authorization for the authentication service.
File uploading services is provided by express-multer.

Once user uploades that media on server, that file will automatically uploaded to 
the aws s3-bucket. The event handler that is attached while file is uploaded to AWS bucket calls the lamda function 
whose job is to transcode the media into hundreds of small files with different format and quality and thumbnails. On the web
it has nice bitmovin player for streaming the media.

 
### Media Quality
currently it supports media upto 4k resolution and generate following different streaming protocol and media quality

#### MEPG_DASH
This streaming protocol is supported all of the devices accept few apple devices. The uploaded video will be transocoded to following resolution and bitrate.

1. 4800k Bitrate 1280 720
1. 2400k Bitrate  854 480
1. 600k Bitrate  
1. 128k Bitrate audio
1. Thumbnails 600 600


#### HLS
Http live streaming developed by apple. It supports few devices that are not supported by dash. The uploaded video will be transcoded to following resolution and bitrate
1. 1872k Bitrate 1024 768
1. 1372k Bitrate 960 640
1. 900k Bitrate 640 480
1. 600k Bitrate 480 320
1. 160k HSL audio


### Api and documentation
Stream has pulic API with nice documentation.
[https://stream-transcoder.herokuapp.com/api] - The api endpoints
[https://stream-transcoder.herokuapp.com/apidocs] - The api documetation


```
Give examples
```

### Installing

just clone the project, install all the dependecies using npm install. provide all the Environental variables and your run npm start. Your app should be listening on port 3000 unless specified on env.PORT.


```
npm start or node app.js
```


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

```
npm test
```


### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment
optimized to deploy in heroku 
## Built With

* [aws-transcoder](http://www.aws.amazon.com/) - The aws cloud 
* [bitmovin](https://bitmovin.com/) - Bitmovin player
* [Exoresss](https:/expressjs.com/) - Express application

## Contributing



## Versioning



## Authors

* **Sandesh Poudel** - *Initial work* - [PurpleBooth](https://github.com/curiousan)


## License


## Acknowledgments


