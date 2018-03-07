---
layout: tut
title: "Mapping with D3.js - v3.0"
---

# Intro
[D3](http://d3js.org/) is a powerful data visualization library written by [Mike Bostock](https://bost.ocks.org/mike/) that helps connect data to graphical elements, and then apply data-driven transformations to those elements. The basic idea is that when the data is bound to graphics, you can produce more portable graphics and much more dynamic visualization with less effort.

So *why use D3 for maps?* Maps are fundamentally graphical objects based on data, and D3 has built in support for map projections and transformations. D3 is actually the backend renderer for SVG images in the [OpenStreetMap editor iD](https://github.com/openstreetmap/iD), so that's a pretty good endorsement for D3 mapping!

So *why not use another library like [Leaflet.js](http://leafletjs.com/)?* The short answer is that D3 will be advantageous when you really want to customize interactivity and dynamic visualization. The tradeoff is in ease-of-creation: D3 will take more time to customize the map to what you want. That said, there's really no reason you can't use both D3 and Leaflet together! Here is a great tutorial [example](https://bost.ocks.org/mike/leaflet/) using D3 to create dynamic overlays on a Leaflet map.

### What can I create with D3?

Check out these links for some examples of D3 visualizations:

[The full gallery of D3 visualizations](https://github.com/d3/d3/wiki/Gallery)

[Geographic Projections: animated](https://bl.ocks.org/mbostock/3711652), and [draggable](https://www.jasondavies.com/maps/transition/)

[The famous "Wealth of Nations" Viz](https://bost.ocks.org/mike/nations/)

[Earthquake Energy Release Visualizations using D3/Leaflet (by Ryan)](https://ryshackleton.github.io/seismic_energy_viz/)

# D3 - Data Driven Documents
D3 stands for **Data Driven Documents**. We will unpack this title in three parts.

## Data
D3 has straightforward functions to grab data from a variety of sources including XMLHttpRequests, text files, JSON blobs, HTML document fragments, XML document fragments, comma-separated values (CSV) files, and tab-separated values (TSV) files. Part of the tremendous power of D3 is that it can take data from a variety of sources, merge different data sources, and then join data elements to the visual elements that represent the data.

## Driven

**Driven** is actually one of the defining characteristics of D3: the graphical elements are defined by the data.  In other words, each circle, line, or polygon also contains the data they are defined by. A desktop GIS software works in the same way while you're working on your map, but when you export the map, the vector-based features lose the data that defines them. If you export a raster image those attributes are completely converted to color values and the data is detached completely.

That type of thing doesn't happen in D3. Not only does your data define the elements in your graphic, the data is also bound (joined) to the elements in your document. A circle isn't just a circle element with an x,y and radius, it's also the data that originated the element in the first place. This characteristic of D3 allows data to drive your visualization, not only upon creation, but throughout its life cycle.

## Documents

At its core, D3 takes your information and transforms it into a visual output. That output is usually a [Scalable Vector Graphic, or SVG](http://www.w3.org/TR/SVG/) that lives in an HTML document. SVG is a file format that encodes vector data for use in a wide array of applications. SVGs are used all over the place to display all kinds of data. If you've ever exported a map from [desktop GIS](http://www.qgis.org/en/site/) and styled it in a [graphics program](https://inkscape.org/en/), chances are your data was stored as SVG at some stage of the process.

SVGs are human readable, which works well for us because we aren't computers. This is an SVG in code:

```HTML
<svg width="400" height="120">
  <circle cx="40" cy="60" r="10"></circle>
  <circle cx="80" cy="60" r="10"></circle>
  <circle cx="120" cy="60" r="10"></circle>
</svg>
```

And this is the rendered version of that code:

<img src="https://github.com/Ryshackleton/d3_maptime_III/blob/master/images/three-little-circles.png?raw=true"/>

SVG's work similarly to html pages, where tags represent objects that can have *objects nested within them*: each circle is an element *nested within* the SVG. Each circle contains some coordinates of the object's center (cx, cy), and radius (r), so the SVG is just a set of instructions defining the geometry of each object, where to put each object, and how to style the objects in [the SVG coordinate space](https://bl.ocks.org/mbostock/3019563).

<img src="https://github.com/Ryshackleton/d3_maptime_III/blob/master/images/svg_coordinate_system.png?raw=true"/>

It's also worth noting that D3 has the ability to select, write, and edit any element on the [HTML DOM](https://www.w3schools.com/js/js_htmldom.asp), and [any of the SVG shape elements](https://www.w3schools.com/graphics/svg_examples.asp) like rectangles and lines.  Later we'll learn to use D3 to create [`<path>` elements](https://www.w3schools.com/graphics/svg_path.asp)  to draw complex country boundaries on our map.

# Tutorial Time!

### What do I need for this tutorial?

1. A text editor (such as Notepad++, [Brackets](http://brackets.io), or Sublime Text).

1. You will also need a local web server.  Here are 2 good options:
    * Here's a [Chrome app](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related?hl=en) that's lightweight and works great. Upon opening the app, it will prompt you to choose a folder to serve files from.
    * [MAMP](https://www.mamp.info/en/) is a free apache webserver for MacOS and Windows. (on MacOS, you'll put your files in `/Applications/MAMP/htdocs/`, and usually access your files via http://localhost:8888/)
1. **[Clone this repo for the starter files.](https://github.com/Ryshackleton/d3_maptime_III.git)**

## Tips

* The learning curve can be pretty steep. Stay positive.  Ask lots of questions.
* Start simple, add complexity piece by piece
* Refer to [documentation](https://github.com/d3/d3/blob/master/API.md) / [tutorials](https://github.com/d3/d3/wiki/Tutorials)
* **Cannibalize code** wherever/whenever you can. D3 has [great examples](https://bl.ocks.org/) and most the code is freely accessible.
* In this tutorial, **SOLUTIONS ARE PROVIDED AT THE END OF EVERY STEP** under headings like this:

<details>
 <summary><strong>Challenge Answer</strong></summary>
 <p>

You found the answer!

 </p>
</details>

## What map are we making?

Today, we'll build a choropleth of some local health data from the Institute for Health Metrics and Evaluation.  Specifically, we'll be building a colored map showing Mortality Rates due to opioid use disorders.  The data is grouped by 2010 Census Tract Boundaries, so that's the geographic grouping we'll be working with.

<img src="https://github.com/Ryshackleton/d3_maptime_III/blob/master/images/FinalMap.png?raw=true"/>

We're basically building just the choropleth part of [this Leaflet-based map](http://ihmeuw.org/4cs9), so you can compare your results to this one.

The steps will be:

1. Data Wrangling 
    * Most of the data wrangling is done for you, but we'll look at the data to figure out how to match up our data file to the census tracts on our map
1. Convert our shapefile to TopoJSON
    * TopoJSON is a compressed vector format for the web. We'll use Mapshaper to manipulate the shapefile to fit our needs
1. Use D3 to build a legend
    * a crash course learning experience in D3
    * learn about D3 scales
1. Use D3 to build the choropleth map

## 1) Data Wrangling

### Mortality Data: data about dead people
The data for this tutorial comes from the [Institute for Health Metrics and Evaluation - Global Health Data Exchange](http://ghdx.healthdata.org/record/united-states-king-county-washington-life-expectancy-and-cause-specific-mortality-census), and consists of mortality rates due to opioid use from 1990-2014 (units are: *Deaths Per 100,000 people*).  The raw data file (`/public_webserver_files/data/IHME_KING_COUNTY_WA_MORTALITY_1990_2014_OPIOID_USE_DISORDERS_Y2017M09D05`) contains 119,400 rows and includes data for multiple years, for males, females, and both sexes, as well as for multiple age groups (All Ages, and Age Standardized).

#### I've filtered the data down to just the following data using this [Observable notebook](https://beta.observablehq.com/@ryshackleton/maptime-seattle-d3-mapping-iii)**


* 2014 (the most recent year with suitably accurate data)
* age standardized (all ages, weighted by the number of people in each age group)
* both sexes
* death rates (not Years of Life Lost due to opioid deaths, which is also contained in the raw data)

**[Observable](https://beta.observablehq.com) is a brand new tool, written by Mike Bostock, the creator of D3, that is basically the JavaScript/D3 version of a [Jupyter notebook](http://jupyter.org/).

### Geographic Data Wrangling

The shapefile I'm using in this tutorial comes from the [King County GIS data portal](https://www5.kingcounty.gov/gisdataportal/).  We're using the [2010 Census Tracts Shapefile](http://www5.kingcounty.gov/sdc/Metadata.aspx?Layer=tracts10_shore)

The main issue with the geographic data is that the census tracts are indexed by census tract number (`TRACT_FLT`), whereas the mortality data is indexed by IHME's `location_id`. We'll take care of that issue using Mapshaper.

## 2) Convert Shapefile to TopoJSON and JOIN `location_id` to the topology

### The goal of this section is to do several things to the shapefile to make it **web ready**

1. Remove the extra shapefile cruft (delete unused data fields)
1. Add the IHME-specific `location_id` to each of the census tract boundaries.  This is so we can quickly 'match up' the IHME Mortality data to the right census tract.
1. Make sure our data is in longitude, latitude (or any un-projected coordinate system)
1. Do a bit of simplification and renaming of files


### What's a TopoJSON?

[TopoJSON](https://github.com/topojson/topojson-client/blob/master/README.md#feature) is a simplified geographic format that ensures that all vertices are shared between different lines in a geometry, with arcs indexed between the shared vertices. This makes for very, very small files that can be quickly transmitted over the web.

<img src="https://github.com/Ryshackleton/d3_maptime_III/blob/master/images/topojson.png?raw=true"/>

Think of TopoJSON as a zipped GeoJSON.  The general technique in web development is to send the TopoJSON 'over the wire', then unzip it to GeoJSON on the client side, or in the user's browser using some other very small code.

### Use Mapshaper to figure out what attributes we have

#### [Mapshaper](http://mapshaper.org/) is an amazing command-line tool for reshaping map data, and has an amazing web-based tool to get started. This challenge will show you the basics.

1. Go to [Mapshaper.org](http://mapshaper.org/)

1. Find the census tract shapefile in your repo: `/mapshaper_files/census_tract_shapefiles/tracts10_shore.shp`.
1. Drag ALL of the `tracts10_shore.*` files into the mapshaper import window (you really only need tracts10_shore.shp and tracts10_shore.dbf)
1. Notice that you can zoom, pan etc.  Click on the 'i' button on the top right.
1. Mouse over your shapefile to get a tooltip that  shows the attributes for each census tract.

Notice that there are a bunch of extra data fields (GEO_ID_TRT, FEATURE_ID, etc) we don't really want.  We could either delete these using QGIS, or we could figure out how to let mapshaper do it for us.

### Challenge 2a: Remove those extra data fields!

#### That extra data is nice, but all we need are the census tract numbers, which we'll use later. Let's delete all fields EXCEPT the `TRACT_FLT` field, which represents the tract id as a decimal value

1. Click the "Console" button.  You'll get a prompt to type "tips" for examples.  Try it!
2. Try typing `help` or `help <command name>` to find commands.  You can also try the [Mapshaper command reference](https://github.com/mbloch/mapshaper/wiki/Command-Reference) for a web interface.
3. Figure out which command you need to remove ALL except the `TRACT_FLT` field.

<details>
 <summary><strong>Challenge 2a Answer</strong></summary>
 <p>

 1. Type ```filter-fields 'TRACT_FLT'``` into the Mapshaper console.
 2. Now use the info button and mouse over each tract to be sure that only the `TRACT_FLT` field is still there.

 </p>
</details>

### Challenge 2b: Join Census Tract Number `TRACT_FLT` to IHME `location_id`

#### IHME data is indexed by IHME's own `location_id`, so ideally our topojson file will need to have `location_id` instead of `TRACT_FLT`.  Let's make that happen in mapshaper.

1. Find `/mapshaper_files/IHME_location_id_TO_tract_id.csv` and open it in a text editor.  This file contains a 'mapping' of census tract `tract_id` to IHME `location_id`.

<img src="https://github.com/Ryshackleton/d3_maptime_III/blob/master/images/IHME_location_ID_to_tract_id.png?raw=true"/>

2. We'll need to have the `location_id` field attached to our TopoJSON so we can link the IHME data to each census tract.  Let's JOIN that data using Mapshaper.

1. *DRAG* the `IHME_location_id_TO_tract_id.csv` into the Mapshaper window and drop it into the same window with your King County Shapefile. You should get an `import` prompt, and when you click `import`, you should see a big grid of rectangles.

1. Click on the filename `IHME_location_id_TO_tract_id` at the top of the page and make the map layer the 'target layer' again.

1. Now comes the hard part.  In the `Console` on the left.  Type `help join` and figure out what the command will be to join the `IHME_location_id_TO_tract_id.csv` data to the shapefile.  You're basically trying to map the keys `TRACT_FLT` and `tract_id`, which are the same in the shapefile and in the csv file.  This is a tough one, so if you get stuck just check out the answer below.
1. Convert to TopoJSON format!

<details>
 <summary><strong>Challenge 2b Answer</strong></summary>
 <p>
 Try the following command:

```
join IHME_location_id_TO_tract_id.csv keys=TRACT_FLT,tract_id
```

You should be able to toggle the info button and mouse over the map to make sure you see `location_id` and `location_name` in the data fields.
</p>
</details>

### REMOVE `IHME_location_id_TO_tract_id` from the list of layers

* Click on the layers tab and close out the `IHME_location_id_TO_tract_id` layer. We won't need it any more now that the `location_id` has been joined to the shapefile.

### Change the projection to WGS84

1. D3 likes latitude and longitude, not the projected coordinate system that this shapefile is in.
1. Type: `projections` in the console to see all of the projections you can use.
1. Then type `proj wgs84` into the console to change the projection.

### Simplify the layer

1. Simplifying geometries is one thing that Mapshaper does really well.  This can be done either via the 'Simplify' tab, or via the command line.
1. To use the command line: `simplify 0.1 keep-shapes` will simplify to 10% and `keep-shapes` ensures that no polygons are removed in the simplification process.

### Rename the layer

1. So easy. Just type `rename-layers census_tracts` into the console. When there are multiple layers, just use commas between the layers, which are in the order you see them in the dropdown.

### Export the finished product!

1. Just click the `Export` button in the top right, select `TopoJSON` and save your file!

<img src="https://github.com/Ryshackleton/d3_maptime_III/blob/master/images/ExportTopojson.png?raw=true" style="width:150px;height:150px;"/>

* A copy of the results of this file is already in our public web files at:

[`public_webserver_files/data/king_county_census_tracts.json`](https://github.com/Ryshackleton/d3_maptime_III/blob/master/public_webserver_files/data/king_county_census_tracts.json) (click to see the map on github's leaflet renderer)

<details>
 <summary><strong>ADVANCED: How to build your own bash script to do this</strong></summary>
<p>
  
* Download and install [Node.js](https://nodejs.org/en/)
* Install mapshaper globally on your computer (-g flag)

```
npm install -g mapshaper
```

* Add the bash tag `#!/usr/bin/env bash`
* Start the command with ```mapshaper -i <filename>``` to tell mapshaper which file to open
* Each additional command can be added as a ```-<command name> <arguments>```, so to get up to the first challenge, our script would look like:

```bash
#!/usr/bin/env bash

mapshaper -i './tracts10_shore.shp' \
    -filter-fields 'TRACT_FLT' \
```

* Adding subsequent commands.... (Notice that I have to add a `\` to escape the carriage return.)

```
#!/usr/bin/env bash

mapshaper -i './tracts10_shore.shp' \
    -proj crs=wgs84 \
    -simplify 0.1 keep-shapes \
    -filter-fields 'TRACT_FLT' \
    -join '../IHME_location_id_TO_tract_id.csv' keys=TRACT_FLT,tract_id \
    -rename-layers census_tracts \
```

* And finally, tell it what format, and what to output with ```-o format=topojson force king_county_census_transects.json```.

```bash
#!/usr/bin/env bash

mapshaper -i './tracts10_shore.shp' \
    -proj crs=wgs84 \
    -simplify 0.1 keep-shapes \
    -filter-fields 'TRACT_FLT' \
    -join '../IHME_location_id_TO_tract_id.csv' keys=TRACT_FLT,tract_id \
    -rename-layers census_tracts \
    -o format=topojson force king_county_census_transects.json
```

* Save the file as `convertToTopojson.sh`, and you can just run `sh convertToTopojson.sh` to rebuild your topojson file.
* Now you can repeat the fun for other shapefiles, or make tweaks to your scripts!

</p>
</details>

## 3) Use D3 to build a legend

### D3 Basics

#### To get familiar with D3, go through the first 3 sections of [this tutorial on D3 selections and binding data](https://strongriley.github.io/d3/tutorial/circle.html)

You can also browse through [the previous D3 tutorial](http://maptimesea.github.io/2017/04/04/d3-mapping-II.html) for some more examples and challenges.

Once you're feeling good about D3 Selections and Data Binding, head on to the next section.

### Three Little Rectangles

#### This is a very simple example that's designed to get you acclimated to some of the nuances of D3 and JavaScript

* Open `public_webserver_files/00-three-little-rectangles.html` in your web browser.
* We'll step through the code together and learn to debug a bit in your browser's Dev Tools.

#### Optional Challenge: figure out how to make D3 add some space between the three bars

* Hint, look for where we add the `transform: translate(...)` attribute to `my_rectangle`

```javascript
    ...
    .attr('transform', function (rectangleHeight, index) {
      return 'translate(' + (rectangleWidth * index) + ',' + 0 + ')';
    });
```

<details>
 <summary><strong>Optional Challenge Answer</strong></summary>
 <p>

 * You'll just need to add some padding where we compute the new bar transformation

```javascript
    ...
    .attr('transform', function (rectangleHeight, index) {
      var padding = 20;
      return 'translate(' + ((rectangleWidth + padding) * index) + ',' + 0 + ')';
    });
```

</p>
</details>

### Moving toward creating a legend

#### Grouping elements to make transformations simpler

* Open `public_webserver_files/01-rectangles-in-groups.html` in your web browser.
* This file has a lot more going on:

    * first off, there are 2 "selections" happening here:
        1. we're appending a `<g class='legend_group'>` element, which is an SVG group to hold ALL of our legend items
        1. We're appending another `<g class='legend_item_group>` to the `legend_group` and binding an empty array of 9 items, so we'll get 9 `<g class='legend_item_group'>` elements
    * then all we have to do is append `<rect>` elements to each `legend_item_group`, and our rectangles magically land where we want them to

#### CHALLENGE: Parsing data and computing a color scale

* Open `public_webserver_files/02-scales-from-data-START.html` in your web browser.
* A lot going on here, so bear with me...
* This file does several new things:
    1. Data is parsed in a d3.queue, which just `defer()`s anything from happening until AFTER the file is parsed
    1. In `awaitAll()`, we get the data as the variable `resultsArray`.
    1. Then we pass the first element of the results (another array of ALL of our data) to our `buildLegend()` function.
    1. In `buildLegend()`, we compute the min and max of the data for some color scales

* All D3 scales have a `domain()`, which represents the INPUT values, and a `range()`, which represents the OUTPUT values.

<img src="https://github.com/Ryshackleton/d3_maptime_III/blob/master/images/d3-scales.png?raw=true">

* [D3 scales come in a variety of flavors](http://alignedleft.com/tutorials/d3/scales), but this `scaleLinear()` is just a linear color scale that takes a range of values (mortality data in our case) and spits out a corresponding color. It could spit out ranges of other values or anything else we tell it to by passing in arrays to `domain()` and `range()`

* We want a legend scale with a few `colorBins` representing mortality data values between the min and max of our data, so we can basically just create a few colors of evenly spaced intervals using [d3.range()](https://github.com/d3/d3-array/blob/master/README.md#range).  The code that does that looks like this:

```javascript
    /** compute the [min, max] values of the data set */
    var min = d3.min(data, function (datum) { return +datum.val; });
    var max = d3.max(data, function (datum) { return +datum.val; });

    /** create a domain for the color range by breaking the data up into 9 bins of equal size */
    var arrayFrom0To8 = d3.range(nColorBars);
    var colorBins = arrayFrom0To8.map(function (d) {
      return max * (d + 1) / nColorBars;
    });
``` 

* See the `/** CHALLENGE */` comment in the text: your job will be to use your D3 knowledge to color the rectangles based on the computed `colorBins`

<details>
 <summary><strong>Computing Colors Challenge Answer</strong></summary>
 <p>

##### Open `public_webserver_files/02-scales-from-data-SOLUTION.html` for the solution.

```javascript
      .attr('fill', function (datum) {
        return colorScale(datum); /** <- CHALLENGE SOLUTION: just call colorScale() on the datum value from the bound colorBin data */
      });
```
</p>
</details>

#### Completed Legend

* Open `public_webserver_files/03-legend-complete.html` to see the completed legend with labels.

### 4) Use D3 to build the choropleth map

* Open `public_webserver_files/04-build-census-tracts.html` to see how to use D3 projections to convert longitude,latitude -> pixels

* We'll go through this one together, but if you want more detail, check out both of these resources:

    *  STEP 5 of [our previous D3 Tutorial](http://maptimesea.github.io/2017/04/04/d3-mapping-II.html)
    * [A much more thorough tutorial on D3 web mapping](http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/) that goes into more depth on this.

#### CHALLENGE: Apply fill to the map colors in the same way we did for the legend

* Open `public_webserver_files/05-color-census-tracts-START.html`
* See somewhere around line 132:

```javascript
      .attr('fill', function (geoDatum) {
        /** find the mortality datum that has the same location_id as this geo path */
        var mortalityDatumObject = mortalityDataArray.find(function(mortalityDatum) {
          return +mortalityDatum.location_id === geoDatum.properties.location_id;
        });
        /** CHALLENGE: get the appropriate data values and use the color scale to return the correct fill color */
        // return <something>;
      });
````

<details>
 <summary><strong>Computing Colors Challenge Answer</strong></summary>
 <p>

##### Open `public_webserver_files/05-color-census-tracts-SOLUTION.html` for the solution

```javascript
      .attr('fill', function (geoDatum) {
        /** find the mortality datum that has the same location_id as this geo path */
        var mortalityDatumObject = mortalityDataArray.find(function(mortalityDatum) {
          return +mortalityDatum.location_id === geoDatum.properties.location_id;
        });
        /** check for missing object, return black if we didn't find the right mortality datum */
        if (mortalityDatumObject === undefined) {
          return 'black';
        }
        /** get the mortality value and convert it from a string to a number */
        var mortalityValue = +mortalityDatumObject.val;
        /** return the color scale that corresponds */
        return colorScale(mortalityValue);
      });;
```

</p>
</details>

#### Clustered Scales on Choropleths

The linear color scale doesn't really let us see much contrast between census tracts, mainly because there seem to be lots of tracts in the low mortality range, and then a few in the high range. Most of the middle of our color range is empty.

#### The solution: [Clustered Color Scales!](https://medium.com/@dschnr/using-clustering-to-create-a-new-d3-js-color-scale-dec4ccd639d2)

* Check out the article to read about why Choropleth color scales are so important, then...
* Open up `public_webserver_files/06-clustered-color-scale.html` to see an implementation of clustered color scales for our data.

    * Notice that we pass the whole array of data into the `domain()` this particular scale, and it computes clusters to best represent the data
    ```javascript
    /** set the domain (input values) of the color scale */
    colorScale.domain(data.map(function(datum) { return +datum.val; }))
      .range(d3.schemeBlues[nColorBars]);
    var clusters = colorScale.clusters();
    ```
    * Now the legend shows a few clusters with small data ranges in the low color end, and the higher end contains bigger ranges where there are fewer data values

<img src="https://github.com/Ryshackleton/d3_maptime_III/blob/master/images/FinalMap.png?raw=true"/>

## The End

### Pat yourself on the back for making it this far.  D3 is tough!
