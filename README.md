


server.js` starts the service.


    npm install

## Basic Configuration

    [default]
    aws_access_key_id = <your access key id>
    aws_secret_access_key = <your secret key>

Update the `config.js` file with your settings

    module.exports.collectionName = "YourCollectionName";
    module.exports.region = "us-east-1";

## Running the sample

You'll need to have some images in `faces`. Run this to import them to AWS:

    node creator.js

Then to start after:

    node server.js

If you go to http://localhost:4001/ in your browser you'll see a simple form for uploading an image. 



