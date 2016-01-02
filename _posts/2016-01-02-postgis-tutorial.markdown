---
layout: tut
title: "Spatial Analysis with PostGIS"
---

In this session we'll get acquainted with pgAdmin and do some spatial analysis with a PostGIS Database. 

Thank you to [Clayton Parker Coleman] (https://github.com/parkercoleman) for providing this tutorial!


# Connect to the database

### Connection Information

The lab database is hosted at

````
Host: maptime-seattle.c9ghtiywfiqm.us-west-2.rds.amazonaws.com
Port: 5432
Username: maptime
Password: mapsRfun504
````

# Get familiar with pgAdmin

### pgAdmin Overview

If you are unfamilar with pgAdmin, this section will detail how to connect to databases with it, feel free to skip this section if you are already familar with pgAdmin.

Launch pgAdmin and you'll see something like this (Note: I have already added some servers, you won't see these when starting up the application)

![](http://i.imgur.com/QopYxtU.png)

Click on the icon that looks like a power cord (a weird analogy, I know) to create a new connection.  Once the window comes up, fill out the following fields:

* Name (whatever you want to call this connection, can be anything)
* Host
* Port
* Username
* Password 

which should look like this:

![](http://i.imgur.com/MEGK8oi.png)

Once you've connected, look at the side panel and you'll see a tree with some nodes, clicking on these will reveal sub nodes.  Expand (by double clicking) on the following nodes:

Databases -> gis -> Schemas

Which will look like this:

![](http://i.imgur.com/vMJvamE.png)

Now we're looking at the contents of our lab database, which is arranged into 4 schemas.  Schemas are groupings of tables, and they can be used to categorize data.  For example, the transportation schema has data related to transportation (air and sea ports).  Expanding any of these will show us the tables in that schema.

Once we have selected our database by expanding the Database node, we can click on the "SQL" icon on the top bar, this allows us to execute SQL queries against the selected database.  Clicking that icon will reveal a window like this:

![](http://i.imgur.com/U7LyFkC.png)

Once we have our SQL window open, we're ready to begin.  To run a query, click the green arrow icon, to the right of the magnifying glass.

![](http://i.imgur.com/jmmlq8l.png) 

# Exercises

### Warm up

Now that we can run queries, lets warm up a bit.  This section is optional, and focuses on standard SQL.  If you're already familar with SQL feel free to scroll down to Problem 1.

#### Problem 0a: Select 20 states

To do this, we'll need data from the geo.states\_ne table.  We want data from all of the columns in the table, but we only want 20 records returned.

To do this, we'll need to use the LIMIT clause.  The LIMIT clause limits the number of rows returned by a query.  The LIMIT clause is placed at the end of a query.

[Problem 0a Solution](https://gist.github.com/parkercoleman/7784cc7d0ca13a9d7fe6)

We get quite a bit of data returned when running this... what if we only want some specific columns?

#### Problem 0b: Select only the "name" and "admin" column from the states table.

Again we'll look at geo.states\_ne, but we only want to know a state's name and admin.

[Problem 0b Solution](https://gist.github.com/parkercoleman/163e60eddbccad9def51)

#### Problem 0c: Select all states in the United States
Once again we're interested in the geo.states\_ne table, and just to limit the amount of data coming back, lets only select the name column.  But how do we limit the rows returned to only states that are in the United States?  

We'll need to know a bit more about the table we're working with.  The states\_ne table has information about states all over the world, not just states in America.  The country each state is part of is in the 'admin' column.  We'll need to use the WHERE clause, and limit values in the 'admin' column to the United States (hint: to limit our results, we'll need to spell out 'United States' exactly as it appears in the states\_ne table, which is 'United States of America')

[Problem 0c Solution](https://gist.github.com/parkercoleman/12abca972317654c5f13)

# Advanced Exercises

### Problem 1: What is the area of the state of Washington?  How does it compare to the areas of other states?

For this we'll need to use the geo.states\_ne table, which has information about every state on earth.  We'll need to limit the states returned to only those that are part of the 'United States of America' (hint: this value is in the 'admin' column of the states table)

Once we have limited the number of states being returned, we'll need to calculate their area.  PostGIS provides a function out of the box to accomplish this, [ST_Area](http://postgis.net/docs/ST_Area.html) (hint: check out the "use_spheriod" optional argument!)

[Problem 1 Solution](https://gist.github.com/parkercoleman/165acf36b312e994da96)

### Problem 2: Which airport is closest to Seattle?

For this question we'll need data from two tables: geo.cities\_ne and transport.airports\_ne.

Intuitively, we'll want to check every airport's distance against the distance of Seattle.  We can do this via a CROSS JOIN, remember to also limit our city results to only "Seattle" in the WHERE clause.

Since we're interested in the closest airport, we can order our results by the distance and only return a single one.

[Problem 2 Solution](https://gist.github.com/parkercoleman/cfdbae09c11e4ff85e4a) (I know its not the airport you expected but King County Airport wasn't in the table, sorry!)

### Problem 3: What is the only state in the Contiguous 48 that does not have a major railroad going through it?

We'll need data from geo.states\_ne and geo.railroads\_ne (I don't know why I put railroads in the geo schema vs the transport schema...)

Think of this problem in two steps: We want to know the states that **don't** have railroads... so first we'll need to know which ones **do** have railroads, and then find out which states **aren't** in that list.

For our first step, we can utilize the fact that any boolean expression can be used to join two tables together.  What we want to do, is take all of our state records, and join them with any railroad records that intersect with our state.  The [ST_Intersects](http://postgis.net/docs/ST_Intersects.html) function is exactly what we need to accomplish this.

So now hopefully we have a query that tells us all of the states that **do** have railroads.  At this point, I recommend considering using the [WITH](http://www.postgresql.org/docs/current/static/queries-with.html) clause in postgres, it allows you to easily define a query and use it like you would a table.  Its mostly syntactic sugar around sub-selects, but it makes for much easier-to-read queries.  

With the WITH clause, we can treat the results of our "which states have railroads" query just like a table in subsequent queries.

So WITH that in mind (har har), lets consider the second part of our problem: which states are not in our first list.  For this, look into using the [IN](http://www.postgresqltutorial.com/postgresql-in/) operator, with it we can check to see if a record is IN a list in a where clause, something like:

```
WHERE somevalue IN (select values FROM table) 
```

[Problem 3 Solution](https://gist.github.com/parkercoleman/fd581490f66f10998a11)

### Problem 4: Which Counties/Parishes have been hit the most time by Hurricanes?


#### First, a look at Aggregrate Functions
For this problem, we'll need to utilize a feature in SQL that wasn't covered in the lab: Aggregrate functions.  Whenever you hear a problem ask for a "Count" of something, or the "Average" (or the Min and Max, though ORDER BY can also be used in these circumstances) its a good bet Aggregrate functions will be required, because thats what they are: Whenever you take multiple rows and aggregrate their contents into a single result, thats an aggregrate function.

Lets look at a concrete example: 

| name            | department | class_num | attendence |
|-----------------|------------|-----------|------------|
| Molly Millions  | KIN        | 103       | 42         |
| Molly Millions  | KIN        | 301       | 21         |
| Henry Case      | CSC        | 401       | 11         |
| Henry Case      | CSC        | 200       | 12         |
| Danielle Stark  | MDST       | 300       | 20         |
| Henry Case      | ECE        | 601       | 5          |

Here we have a simple class schedule table which contains: the teacher, the department/class number of the course they teach, and the attendence of the course.

To find out who teaches the most classes, we would need to use the aggregrate function COUNT, like so:

```
SELECT name, COUNT(*)
FROM class_schedule
GROUP BY name
```

This works by taking the table and "grouping" it by the values of the column(s) you specified, in this case we'd have these groupings:

| name            | department | class_num | attendence |
|-----------------|------------|-----------|------------|
| Molly Millions  | KIN        | 103       | 42         |
| Molly Millions  | KIN        | 301       | 21         |

| name            | department | class_num | attendence |
|-----------------|------------|-----------|------------|
| Henry Case      | CSC        | 401       | 11         |
| Henry Case      | CSC        | 200       | 12         |
| Henry Case      | ECE        | 601       | 5          |

| name            | department | class_num | attendence |
|-----------------|------------|-----------|------------|
| Danielle Stark  | MDST       | 300       | 20         |

In these groupings, the name is guarenteed to be identical (thats what we grouped by), but nothing else is guarenteed to match.  This means when we specify our results from the SELECT, we can only include either values included the GROUP BY **or** aggregrate functions (like COUNT).

For one final example from Gibson College, lets look at what finding out the average class size per department would look like:

```
SELECT department, AVG(attendence)
FROM class_schedule
GROUP BY department
```

#### Back to the actual problem
So, now that we have some exposure to aggregrate functions and COUNT, lets look at our problem again.  We want to count the number of times a hurricane has hit a county.  I approached this problem in two steps:

First, our hurricane line strings are broken into segments.  Multiple segments of the line belong to the same hurricane.  This is done so that the data about the hurricane (wind speed for example) can change at different geographic areas through the hurricane's life span.  The end result of this: a single hurricane can intersect or "hit" a county multiple times.  This is obviously not what we want.

But we can start with that.  Once again [ST_Intersects](http://postgis.net/docs/ST_Intersects.html) is our friend, we can use that to determine which linesegments belonging to which hurricane have hit a county.

We can use the [DISTINCT](http://www.postgresql.org/docs/current/static/sql-select.html#SQL-DISTINCT) clause to only show unique tuples for a query that gives us a county name and hurricane name.

Our first query should give us a result like this:

| County    | State          | Hurricane Serial ID |
|-----------|----------------|---------------------|
| Abbeville | South Carolina | 1882244N19296       |
| Abbeville | South Carolina | 1912160N28272       |
| Abbeville | South Carolina | 1949235N18300       |
| Abbeville | South Carolina | 1968153N17275       |
| Abbeville | South Carolina | 1997198N27267       |
| Abbeville | South Carolina | 2004258N16300       |
| Acadia    | Louisiana      | 1856221N25277       |
| Acadia    | Louisiana      | 1863270N21267       |

(hint, use the hurricane serial ID to get a guarented unique name for a hurricane)

(another hint: if you don't want to bother joining the state table, just include the statefp from the county table)

Assuming we have query that returns results that look something like this, we can use it in another query that GROUPs our rows by County and State, and does a count, which gives us our answer.

[Problem 4 Solution](https://gist.github.com/parkercoleman/04d3baca58630afcc745)


### Problem 5: Which American sea port is furthest from the ocean?

We'll need to look at the transport.ports\_ne table, geo.coastline\_ne table  and geo.countries\_ne to answer this question.

We'll need to take our ports table, and do another CROSS JOIN to the rows in the coastline table, remember we need to find the minimum distance for each port to the coastline, so we need to check the distance of each coast line segment to each port.

We can use the MIN aggregrate function here, if we GROUP BY our port name.

Theres one more caveat though, the ports table doesn't tell us which country it belongs to, and the question specifies we're only interested in American ports.

[ST_Within](http://postgis.net/docs/ST_Within.html) provides a solution to this issue, we're only interesed in ports WITHIN America.  This is where the geo.countries\_ne table comes in.

Finally, once we've gotten our list of American ports and their distance to the coast, we'll need to order it.

[Problem 5 Solution](https://gist.github.com/parkercoleman/51cd5efca20d430ac5b7)