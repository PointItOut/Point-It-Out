const video = document.getElementById('video');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
    });
}

const ctracker = new clm.tracker({ faceDetection: { useWebWorkers: true } });

ctracker.init();
ctracker.start(video);

let positions = ctracker.getCurrentPosition()

console.log('positions', positions)