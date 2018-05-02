const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');
const gconfig = {
    projectId:'paws-8e222',
    keyFilename:'paws-firebase.json'
}
const google = require('@google-cloud/storage')(gconfig);


exports.storeImage = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync('/tmp/uploaded-image.jpg',body.image,'base64',err=>{
            console.log(err);
            return response.status(500).json({ error: err })
        });
        const bucket = google.bucket('paws-8e222.appspot.com');
        const uuid = UUID();
        bucket.upload('/tmp/uploaded-image.jpg',{
            uploadType: 'media',
            destination: '/posts/' + uuid + '.jpg',
            metadata: {
                metadata:{
                    contentType : 'image/jpeg',
                    firebaseStorageDownloadTokens : uuid

                }
            }
        },(err,file) => {
            if(!err){
                response.status(201).json({
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' + 
                    bucket.name +
                    '/o/' +
                    encodeURIComponent(file.name) +
                    '?alt=media&token=' +
                    uuid
                });
            }
            else{
                console.log(err);
                response.status(500).json({
                    error: err
                })
            }
        });
    });
});
