import Jimp from 'jimp';
$("body").on("change", "#browse_image", function(e) {
    var files = e.target.files;
    var done = function(url) {
      $('#display_image_div').html('');
      $("#display_image_div").html('<img name = "display_image_data" id="display_image_data" src="'+url+'" alt="Uploaded Picture">');
    };
      if (files && files.length > 0) {
        file = files[0];
        if (URL) {
          done(URL.createObjectURL(file));
        } else if (FileReader) {
          reader = new FileReader();
          reader.onload = function(e) {
            done(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
      var image = document.getElementById('display_image_data');
      var button = document.getElementById('crop_button');
      var result = document.getElementById('cropped_image_result');
      var croppable = false;
      var cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        ready: function() {
          croppable = true;
        },
      });
      button.onclick = function() {
        var croppedCanvas;
        var roundedCanvas;
        var roundedImage;
        if (!croppable) {
          return;
        }
        // Crop
        croppedCanvas = cropper.getCroppedCanvas();
        // Round
        roundedCanvas = getRoundedCanvas(croppedCanvas);
        // Show
        roundedImage = document.createElement('img');
        roundedImage.src = roundedCanvas.toDataURL();
        
        result.innerHTML = '';
        result.appendChild(roundedImage);
      };
    });

  function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;
    canvas.width = 7395;
    canvas.height = 7395;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, 7395, 7395);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(7395 / 2, 7395 / 2, Math.min(7395, 7395) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  }
  
  document.getElementById('#download_button').addEventListener("click",download);
  function download() {
  var linkSource = $('#cropped_image_result img').attr('src');
  var fileName = 'Nishant.png';
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
  }

  document.getElementById('#upload_button').addEventListener("click",overlay);
  function overlay(){
    var linkSource = $('#cropped_image_result img').attr('src');
    const fixedImage = Jimp.read('frame (1).png');
    const baseImage = Jimp.read(linkSource);
    var temp = document.createElement('img');
    temp.src = roundedCanvas.toDataURL();
    var result = document.getElementById('cropped_image_result');
    result.innerHTML = '';
    result.appendChild(roundedImage);
  }
