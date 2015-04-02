---
layout: tut
title: "Bash n' GDAL"
---

Have you ever renamed 100 photos by hand? Or done the same sequence of clicks a dozen times in a row? Using a computer can be repetitive... There's got to be an easier way.

Learning command line tools gives you an additional, more flexible way of expressing your intentions, and to be able to do so repeatedly. In learning how to use the CLI, you're essentially going to be learning a new language.

In this tutorial, we will learn a set of tools, [Bash](http://en.wikipedia.org/wiki/Bash_(Unix_shell)) and [GDAL](http://www.gdal.org/), that eliminate clicks from your work-flow and open opportunities for automation along the way. Bash gives you access to files and programs on your computer through a [command-line interface](http://en.wikipedia.org/wiki/Command-line_interface) (CLI). **G**eospatial **D**ata **A**bstraction **L**ibrary is a software package similar to a desktop GIS. It lets you access and do work on geo data. We will combine these tools to do spatial analysis on Seattle Parks.

# Bash what?

Above, we refer to Bash as a *command-line interface*, we might also call it a *shell* or the *command line* for short. These names are confusing. Let's unpack them before we dive in.

## Kinda like a GUI...

Let's start with something familiar, [**G**raphical **U**ser **I**nterfaces](http://en.wikipedia.org/wiki/Graphical_user_interface) (GUI). Most computer users interact with their operating system (OS) through GUIs. We move and open files with Windows Explorer, OS x Finder or Ubuntu Nautilus. For example:

![elephants never forget](/img/tut_gdal_elephants.gif)

In this example, we create a file, *Elephants.txt*, then move it into the folder *Never_Forget*. We can do all that and much more in Bash.

## In Bash

This is what the example above looks like in bash:

![elephants never forget bash](/img/tut_gdal_bash_elephants.gif)

We create *Elephants.txt* with `touch`, then move the new file into *Never_Forget* with `mv`. The outcome is exactly the same when we use a GUI. However, where the GUI takes clicks and mouse movement as input, the CLI is controlled through text input. This opens doors.

## So why Bash again?

Bash is a common Unix CLI. There are others, but Bash is what's you'll find installed by default in most cases. Most of the things you'll learn in Bash can be easily translated into alternatives, so don't worry about compatibility.

# Objectives:

1. Create an attractive Hillshade for Seattle.
2. Automate the process. Make it run with a single command.
3. Create a mosaic of Landsat imagery using `landsat-util` and `gdal`.
4. Change detection using raster math AKA how to make GIFs in the command line.

You'll get more out of this if you work with a partner. They can help you move forward if you're stuck, and regardless of how much experience you have, you'll pick something up by watching how someone else works.

If you're stuck for longer than 5 minutes, ask.

Commands
--------

- `ls` - What's around you.
- `pwd` - Where you are.
- `cd` - Move yourself.
- `touch` - Create a file.
- `mkdir` - Create a directory.
- `cat` - View the contents of a thing.
- Other convenience methods?

If you don't have a terminal already set up, check out this EC2 box. You'll be root, so, you can do whatever you want. You can mine BTC's if you want, but I'll be deleting these boxes right after we finish :D

GDAL why?
---------

GDAL is a massive suite of tools. We aren't going to get through all of them today, but we'll at least see what sorts of things it can be useful for, and you'll learn how to find more information if you need.

Project 1: Hillshades
=====================

1. Download the data.
2. Build a VRT with `gdalbuildvrt`
3. Build a Geotiff with `gdal_translate`
4. Generate a Hillshade with `gdaldem hillshade`
5. Build a color relief with `gdaldem color-relief`
6. Build a slope shade with `gdaldem slope-shade`
7. Mush everything together with `gdal_merge`
8. Clip your file
  - By bounding box: `gdalwarp -te`
  - By outline: `gdalwarp -cutline`

Project 2: Automate the process with `make`
-------------------------------------------

Project 3: Mosaic Landsat imagery with Landsat-util and Make
------------------------------------------------------------

Project 4: Change detection with GIFS
-------------------------------------
