prediction1 = "";

Webcam.set
({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(' #camera ');


function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Hys9n7Gxg/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result)
{
    if(error)
    {
        console.log(error);
        document.getElementById("result_gesture_name").innerHTML = result[0].label;
        prediction1 = result[0].label;
    }
    else
    {
        console.log(result);

        if (result[0].label == "victory")
        {
            document.getElementById("result_gesture").innerHTML = "&#9996;";
        }
        if (result[0].label == "amazing")
        {
            document.getElementById("result_gesture").innerHTML = "&#128076;";
        }
        if (result[0].label == "best")
        {
            document.getElementById("result_gesture").innerHTML = "&#128077;";
        }
    }

}