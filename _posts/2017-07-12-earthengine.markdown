---
layout: tut
title: "Google Earth Engine"
---

## Introduction
[Earth Engine](https://earthengine.google.com/) is a powerful platform developed by Google.

**Remote Sensing Archives**
- petabytes of data located on Google servers
- *you don't need to download or extract any data!*

**Distributed computational power**
- CPU clusters are provided
- Limits are managed by Google

**Server-side programming**
- data is stored in the cloud


We are going to be using the [Code Editor](https://code.earthengine.google.com/) which presents a simple access point to learning the Earth Engine platform. The Code Editor utilizes the Earth Engine JavaScript API to run scripts and functions to interact with Earth Engine-hosted data.

*Earth Engine is not just another JavaScript library*
In fact Earth Engine also has a Python API which is better-suited for building applications. Today, we are most interested in getting you started with Earth Engine by exploring some of the basic functionality. If you don't know JavaScript or any coding for that matter, don't worry. We'll walk you through what you need to know.

*Why use Earth Engine?*


### What can I do with Earth Engine?

Check out these links for some examples of Earth Engine visualizations and applications:

[Global Forest Change](http://earthenginepartners.appspot.com/science-2013-global-forest)

[Earth Engine Timelapse](https://earthengine.google.com/timelapse/)

[Climate Engine](http://climateengine.org/)


# Earth Engine
A planetary-scale platform for Earth science data & analysis

## Data
Satellite Imagery Datasets:
- Landsat Archives (4, 5, 7, 8)
- Modis
- Sentinel 1, 2
-

Climate Datasets
-		Precipitation
-		

## APIs

JavaScript and Python APIs


# Tutorial Time!

### What do I need for this tutorial?


### What are we making?
We'll do this in steps:

1.

2.

3.

4.

5.

6.

By the time we finish this tutorial,


## Tips

* The learning curve can be pretty steep. Stay positive.  Ask lots of questions.
* Start simple, add complexity piece by piece
* Refer to [documentation]() / [tutorials]()
* **Cannibalize code** wherever/whenever you can. D3 has [great examples](https://bl.ocks.org/) and most the code is freely accessible.
* In this tutorial, **SOLUTIONS ARE PROVIDED AT THE END OF EVERY STEP** under headings like this:
	### Or [clone this git repo](https://github.com/Ryshackleton/d3_maptime.git) to get all of the starter/solution files ahead of time

## STEP 1:

## STEP 2:

## STEP 3:

## STEP 4:

**This is text**


### 1st Challenge, 15 minutes:

#### In the [tutorial]

 * radius: 20
 * fill: "darkred"

**NEED A HINT? Check out the lines: `ee.ImageCollection.("");` and `ee.CenterObject();`.**  Paste those two lines into your script, then change the `"xxx"` and `xx` to `"xxx"` and `xx`.  If your web page is blank, check the Console for errors (Right click in the page, and "View Source", then find the "Console" tab).


###

Check out [this simple example of code) inside the `function myFunction()`.

```JavaScript
    // use d3 to add a new button in the body
    ee.ImageCollection("body")
      .append("button")
      .on("click", myFunction) // link the myFunction function to the button click
      .text("Run My Function"); // add some text to the button

    function myFunction() {
      // add your transitioning code here
    }
```

### STEP 4:
#### Copy and paste [the html below].

### [4th Challenge Solution Here](http://github.com/jmasselink/)


### Other Useful Earth Engine tutorials

#### Google Materials
[Google Earth Engine Developer's Guide](https://developers.google.com/earth-engine/):
- [API Docs](https://developers.google.com/earth-engine/api_docs)
- [API Tutorials](https://developers.google.com/earth-engine/tutorials)
- [Earth Engine resources for Higher Education](https://developers.google.com/earth-engine/edu)

[Earth Engine User Summit 2017 Proceedings](https://events.withgoogle.com/google-earth-engine-user-summit-2017/breakout-sessions/#content)
> [Python API presentation](https://docs.google.com/presentation/d/1MVVeyCdm-FrMVRPop6wB3iyd85TAlwB-F9ygTQZ8S1w/pub?slide=id.g1e419debf0_1_205)
> []

[Earth Engine Developers Google Group](https://groups.google.com/forum/#!forum/google-earth-engine-developers)

#### External Materials

International Research Institute for Climate & Society *Health Applications*:
- [Analyzing Precipitation Data](http://iri.columbia.edu/~pceccato/Google_Training_Health/CHIRPS_Precipitation.pdf)
- [Analyzing MODIS data](http://iri.columbia.edu/~pceccato/Google_Training_Health/MODIS%20lst.pdf)
- [Analyzing NDVI data](http://iri.columbia.edu/~pceccato/Google_Training_Health/NDVI.pdf)

[Google Earth Engine for Dummies](https://slides.com/miguelangelmenarguez)


## Fin.

Hope that was helpful! Please fill out our survey when you are done even if you couldn't attend the meeting. We want to make sure the MaptimeSEA tutorials are teaching what **you** want to learn. [bit.ly/maptimesea_survey](http://bit.ly/maptimesea_survey)
