// Called when a device gets the GPS location successfully
//

function onGpsSuccess(position) {
    return '47,-121';
//    return position.coords.latitude + ', ' + position.coords.longitude;
}

function onGpsFail(message) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

