# Stream - Adaptive bitrate  media streaming

stream is an adaptive bitrate streaming service that allows user to upload any media (both video and audios) and stream them adaptively.
It leverages the power of aws elastic transcoder to encode media into multipul format.
[https://stream-transcoder.herokuapp.com/) - The app link

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
currently it supports media upto 4k resolution and generate following different media files

### Api and documentation
Stream has pulic API with nice documentation.
[https://stream-transcoder.herokuapp.com/api) - The api endpoints
[https://stream-transcoder.herokuapp.com/apidocs) - The api documetation


```
Give examples
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
