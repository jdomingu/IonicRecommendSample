//Source: http://docs.phonegap.com/en/edge/cordova_camera_camera.md.html
// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);
    var photoThumb = document.getElementById('photoThumb');
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    photoThumb.style.display = 'block';
    smallImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    smallImage.src = "data:image/jpeg;base64," + imageData;

    }

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
    var photoThumb = document.getElementById('photoThumb');
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    photoThumb.style.display = 'block';
    smallImage.style.display = 'block';
    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    smallImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, correctOrientation: true,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

// Failure message 
//
function onFail(message) {
    alert('Could not add photo: ' + message);
}

