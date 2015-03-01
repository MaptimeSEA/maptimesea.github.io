---
layout: tut
title: "Geocoding & APIs"
---

The ability to accurately and quickly determine the geographic location of an address is a powerful process. With an address's location, you open a world of possible analyses that were previously impossible. Having a location allows you to determine how close your address is to another point, calculate a network route to that point, and see what else is nearby. This action of estimating and retrieving geographic information for an address is called **geocoding**.

# GEOCODING

Geocoding is not a new technology. The concept of determining the most likely geographic point for an address has existed with many GIS's for years, allowing users to take large lists of addresses and accurately assign them latitude and longitude coordaintes for usage in a map.

With the introduction web maps and user's searching for locations, the geocoding process had to be created as a web tool as well and no longer could be done in stand-alone software on the desktop. This required the browser to be able send a query of an address to a geocoder and have that return information back to the webpage with the likeliest locations for the query. To do this effectively, webmaps needed to access a geocoder via an **API**.

# APPLICATION PROGRAMMING INTERFACE (API)

Those three words are pretty confusing. Worry not! APIs serve a very basic purpose: *accept a query and return data that matches the query.* APIs and their queries are generally accessible via URLs at a website. For example, you can send a query to `api.example.com` by passing specific parameters in the URL:

```
http://api.example.com?query=hello&format=json
```

Let's break down the above URL. 

* **api.example.com** - First, you see that `api.example.com` is where this website's API exists. This is usually because the database that your are are attempting to gather data from will be accessible from it's own unique URL (typically not the primary domain for a website).
* **?** - What? Why is there a question mark? This is the required syntax for passing parameters through a URL. Where the `?` exists, parameters follow. *Note: this is not only for APIs, but for the case of this tutorial, let's say it is.*
* **query=hello** - This is the first parameter called `query` that accepts any string, in this case `hello`, to test against the database. The results from this query should return anything from the searchable database that include the word *hello*.
* **&** - The ampersand symbolizes a *new parameter* in the URL.
* **format=json** - This parameter is specifying an output format for the data returned from the API. Available output formats are usually determined by the API, but you'll frequently see `json` since this is a readable format used in Javascript.

![API call process](/img/tut_geocoding-APIprocess.png)

## Census Geocoding API

You may be thinking, "Where does a geocoder get the geographic information from?". That's a great question. A geocoder requires its own **huge** database of addresses and their respective geographic information. The Geocoder we'll use in this tutorial is the Census Bureau's free geocoding API, which accesses the Census's address repository. Others geocoders will access their own address repository; Google uses their own, while Mapbox uses OSM's address information.

Like the `example.com` URL above, the Census has their own URL to access their geocoder. Below is an example with the required parameters, which we'll discuss. Go ahead and click the URL to see what the response is.

[`http://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=1225+Prestwick+Terrace+Mahtomedi+MN&benchmark=4&format=jsonp`](http://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=1225+Prestwick+Terrace+Mahtomedi+MN&benchmark=4&format=jsonp)

* **http://geocoding.geo.census.gov/geocoder/locations/onelineaddress** - this is the URL endpoint where we'll be sending information to. The `onelineaddress` is a special endpoint that allows us to send a single string address through the geocoder without breaking an address apart into its own information (i.e. street number, street name, city, state, etc.).
* **?address=1225+Prestwick+Terrace+Mahtomedi+MN** - this is the address query we're sending to the geocoding API.
* **benchmark=4** - the benchmark parameter is the address dataset you'd like to retrieve results from. Number `4` is ID for the most recent dataset from the Census.
* **format=jsonp** - `jsonp` is the data type that we'd like to have returned from this address. Because we'll be retrieving results from a URL different from our own, the `jsonp` data type allows us to bypass [Cross Origin Issues](CROSS ORIGIN LINK).

Take a look at the Census's page with more information about the their geocoder's optional parameters that allow you to send more specific requests.

With the above URL concept, we'll look at how to build a web page that makes a query to the URL and returns geographic information that we could put on a map.

# TUTORIAL TIME

## Zero: HTML Starter

## One: Making a call to an API (Census Bureau)

## Two: Input field for an address

## Three: Retrieve latitude & longitude values

