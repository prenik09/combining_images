var jimp = require('jimp');
// we have imported the library
// we will be using the promises thing concept in js so that we can..... but why we are using promise thing?
var images = ['images/download (5).png','images/frame (1).png'];
var jimps = [];
for(var i=0;i<images.length;i++)
{
    jimps.push(jimp.read(images[i]));
}
Promise.all(jimps).then(function(data) {
    return Promise.all(jimps);
}).then(function(data){
    data[0].composite(data[1],0,0);
    data[0].write('final-image/final.png',function(){
        console.log("wrote the image");
    });
});