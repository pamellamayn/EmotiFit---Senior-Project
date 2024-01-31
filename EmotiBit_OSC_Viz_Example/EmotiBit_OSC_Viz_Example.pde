import oscP5.*;
import netP5.*;
import processing.data.JSONObject;
import processing.sound.*;

// ------------ CHANGE PARAMETERS HERE --------------- //
String oscAddress = "/EmotiBit/0/HEART"; 
int oscPort = 12345;

float samplingFreq = 25;
boolean lowPass = true;
float lpCut = 3;
boolean highPass = true;
float hpCut = 1;
float threshold = 1; // Define the threshold for triggering the sound

SoundFile music; // Declare a SoundFile object
SoundFile music2; // Declare another SoundFile object

OscP5 oscP5;
FloatList dataList = new FloatList();
float lpFiltVal;
float hpFiltVal;
boolean firstFilt = true;

void setup() {
  size(1400, 240);
  
  oscP5 = new OscP5(this, oscPort);

  // Load the sound files
  music = new SoundFile(this, "assets/sound_file.mp3");// Replace "sound_file.mp3" with your sound file
  music2 = new SoundFile(this, "assets/sound_file2.mp3");// Replace "sound_file2.mp3" with your second sound file
}

void draw() {
  
  if (dataList.size() > 0) {    
    float data = dataList.get(dataList.size() - 1);
    int alpha = int(255 * autoscale(data));
    background(alpha, 0, 0);
    
    // Print current heart rate
    println("Heart Rate: " + data);
    
    if (data < threshold) {
      if (!music.isPlaying()) {
        music.loop(); // Start playing the first music if it's not already playing
      }
      if (music2.isPlaying()) {
        music2.stop(); // Stop playing the second music if it's already playing
      }
      lpCut = 5;
      hpCut = 0.5;
    } else {
      if (music.isPlaying()) {
        music.stop(); // Stop playing the first music if it's already playing
      }
      if (!music2.isPlaying()) {
        music2.loop(); // Start playing the second music if it's not already playing
      }
      lpCut = 3;
      hpCut = 1;
    }

    drawData();
  }
}

void drawData() {
  stroke(255);
    
  while (dataList.size() > width) {
    dataList.remove(0);
  }
  
  for (int n = 0; n < dataList.size() - 1; n++) {
    float xScale = 12.0;
    
    float x1 = n * xScale;
    float x2 = (n + 1) * xScale;
    float y1 = height * autoscale(dataList.get(n));
    float y2 = height * autoscale(dataList.get(n + 1));
    line(x1, height - y1, x2, height - y2);
 
  }
}

float autoscale(float data) {
  if (dataList.size() > 0) {
    float minData = dataList.min(); 
    float maxData = dataList.max();
    return (data - minData) / (maxData - minData);
  }
  else {
    return 0;
  }
}

void oscEvent(OscMessage theOscMessage) {
  if (theOscMessage.checkAddrPattern(oscAddress)) {
    Object[] args = theOscMessage.arguments();
    for (int n = 0; n < args.length; n++) {
      float data = theOscMessage.get(n).floatValue();
      data = filter(data);
      dataList.append(data);
    }
  }
}
  
float filter(float data) {
  float DIGITAL_FILTER_PI = 3.1415926535897932384626433832795;
  float DIGITAL_FILTER_E = 2.7182818284590452353602874713526;
  float lpAlpha = pow(DIGITAL_FILTER_E, -2.f * DIGITAL_FILTER_PI * lpCut / samplingFreq);
  float hpAlpha = pow(DIGITAL_FILTER_E, -2.f * DIGITAL_FILTER_PI * hpCut / samplingFreq);
  if (lowPass) {
    if (firstFilt) {
      lpFiltVal = data;
    } else {
      lpFiltVal = data * (1. - lpAlpha) + lpFiltVal * lpAlpha;
    }
    data = lpFiltVal;
  }
  if (highPass) {
    if (firstFilt) {
      hpFiltVal = data;
    } else {
      hpFiltVal = data * (1. - hpAlpha) + hpFiltVal * hpAlpha;
    }
    data = data - hpFiltVal;
  }
  firstFilt = false;
  return data;
}
