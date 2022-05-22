img = "";
statuss = "";
objects = [];

function preload() {
    img = loadImage('dog_cat.jpg');
    alarm = loadAlarm('whip_somebody.mp3')
}

function play() {
    alarm.play();
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML ="Status : Detecting Baby";
}

function draw() {
    image(video, 0 ,0, 380, 380);

        if (statuss != "") {
            r = random(255);
            g = random(255);
            b = random(255);
            objectDetector.detect(video, gotResult);
            alarm.stop();
            for (i = 0; i < objects.length; i++) {
                document.getElementById("status").innerHTML = "Status :Baby Detected";
                document.getElementById("number_of_objects").innerHTML = "Baby found";

                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percentm + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
        else {
            alarm.play();
            document.getElementById("status").innerHTML = "Status :Baby not Detected";
        }
    }
/*
    fill("#FF0000");
    text("Dog", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350 );

    fill("#FF0000");
    text("Cat", 320, 120);
    noFill();
    stroke("#FF0000");
    rect(300, 90, 270, 320 );
*/


function modelLoaded () {
    console.log("Model Loaded!")
    statuss = true;
    objectDetector.detect(video, gotResult);
}

function gotResult (error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}