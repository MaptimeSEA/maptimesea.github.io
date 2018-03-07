---
layout: tut
title: "Google Earth Engine"
---

## Welcome to Maptime Seattle!

[Maptime](http://maptime.io/) is a community dedicated to teaching and learning all things geospatial. Maptime offers local mappers the opportunity to learn cutting-edge geospatial technologies.

Maptime's mission is :
```
"to open the doors of cartographic possibility to anyone
interested by creating a time and space for collaborative
learning, exploration, and map creation using mapping tools
and technologies."
```

## Introduction
[Earth Engine](https://earthengine.google.com/) is ***a planetary-scale platform for Earth science data & analysis***

**Remote Sensing Archives**
- petabytes of data located on Google servers
- *you don't need to download or extract any data!*

**Distributed computational power**
- CPU clusters provided / limits managed by Google

**Server-side programming**
- data is stored in the cloud

We are going to use the [Code Editor](https://code.earthengine.google.com/) which presents a simple access point to learning the Earth Engine platform. The Code Editor utilizes the Earth Engine JavaScript API to run scripts and functions to interact with Earth Engine-hosted data.

*Earth Engine is not just another JavaScript library.*

In fact Earth Engine also has a Python API which is better-suited for building applications. Today, we want to help you get started with Earth Engine by exploring some of the basic functionality. If you don't know JavaScript or any coding for that matter, don't worry. We'll walk you through what you need to know.

*Why use Earth Engine?*
Because you can! It is powerful allowing you, the analyst/developer, to bring code to the data, which shortens the process of doing exploratory data analysis.


## [Datasets](https://earthengine.google.com/datasets/)
Satellite Imagery Datasets:
- Landsat Archives (4, 5, 7, 8)
- MODIS
- Sentinel 1, 2

Climate Datasets
-	Precipitation
-	Sea Surface Temperature
- Ozone

## APIs

JavaScript and Python APIs

### A few Earth Engine JavaScript API terms:

**variable**:		stored *thing* in memory

**function**:		stored *operation*

**asset**:		geospatial data; e.g. Feature, FeatureCollection / Image, ImageCollection

**band**:		remotely-sensed data stores measured reflectance for different wavelength ranges in separate bands though the spatial  resolution and capture time are the same; e.g. Images are composed of bands

**reducer**:	a function which is mapped over all pixels in an Image or ImageCollection:	e.g. mean(), median()


By the time we finish this tutorial, you will have the basics to start exploring data with Earth Engine.


# Tutorial Time!

### What do I need for this tutorial?
1. If you don't yet have one, please create a Google account: https://goo.gl/KmaV3j

2. Sign up for an Earth Engine account using your gmail account: https://goo.gl/qJgvcP

3. Open an Incognito window of Chrome

4. Join the MaptimeSEA Earth Engine 101 Google Group with your gmail account: https://goo.gl/TEPFbt

5. Accept this shared code repository named **maptimesea_earthengine101**: https://goo.gl/g6xxTT


## Tips

* The learning curve can be pretty steep. Stay positive.  Ask lots of questions.
* Start simple, add complexity piece by piece
* **Cannibalize code** wherever/whenever you can. The [Earth Engine Developer Forum has great examples](https://groups.google.com/forum/#!forum/google-earth-engine-developers) and includes a lot of code.


### What can be done with Earth Engine?

Check out these examples of Earth Engine visualizations and applications:
[Case Studies](https://earthengine.google.com/case_studies/)

- [Global Forest Change](http://earthenginepartners.appspot.com/science-2013-global-forest)

- [Earth Engine Timelapse](https://earthengine.google.com/timelapse/)

- [Climate Engine](http://climateengine.org/)

- [Aqua Monitor](http://aqua-monitor.appspot.com/)

### Other Useful Earth Engine tutorials

#### Google Materials
[Google Earth Engine Developer's Guide](https://developers.google.com/earth-engine/):
- [API Docs](https://developers.google.com/earth-engine/api_docs)
- [API Tutorials](https://developers.google.com/earth-engine/tutorials)
- [Earth Engine resources for Higher Education](https://developers.google.com/earth-engine/edu)

[Earth Engine User Summit 2017 Proceedings](https://events.withgoogle.com/google-earth-engine-user-summit-2017/breakout-sessions/#content)
- [Python API presentation](https://docs.google.com/presentation/d/1MVVeyCdm-FrMVRPop6wB3iyd85TAlwB-F9ygTQZ8S1w/pub?slide=id.g1e419debf0_1_205)

[Earth Engine Developers Google Group](https://groups.google.com/forum/#!forum/google-earth-engine-developers)

[Earth Engine + Jupyter Notebooks (UW GeoHackWeek 2016)](https://goo.gl/8jf7RU)
- [Docker Image: docker-ee-datascience-notebook](https://hub.docker.com/r/tylere/docker-ee-datascience-notebook/)

#### External Materials

[Remote Sensing of Environment journal](http://www.sciencedirect.com/science/article/pii/S0034425717302900): "Google Earth Engine: Planetary-scale geospatial analysis for everyone"

International Research Institute for Climate & Society *Health Applications*:
- [Analyzing Precipitation Data](http://iri.columbia.edu/~pceccato/Google_Training_Health/CHIRPS_Precipitation.pdf)
- [Analyzing MODIS data](http://iri.columbia.edu/~pceccato/Google_Training_Health/MODIS%20lst.pdf)
- [Analyzing NDVI data](http://iri.columbia.edu/~pceccato/Google_Training_Health/NDVI.pdf)

[Google Earth Engine for Dummies](https://slides.com/miguelangelmenarguez)


## Fin.

Hope that was helpful! Please fill out our survey when you are done even if you couldn't attend the meeting. We want to make sure the MaptimeSEA tutorials are teaching what **you** want to learn. [bit.ly/maptimesea_survey](http://bit.ly/maptimesea_survey)
