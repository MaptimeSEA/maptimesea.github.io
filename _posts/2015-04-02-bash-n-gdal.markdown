---
layout: tut
title: "Bash n' GDAL"
---

Have you ever renamed 100 photos by hand? Or done the same sequence of clicks a dozen times in a row? Using a computer can be repetitive... There's got to be an easier way.

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

## So what is Bash?

Explain that Bash is a common Unix CLI.

# Do Bash

Run through the commands we'll need for the tutorial.

# GDAL why?

Intro GDAL, why would you use it?

# Hillshade

Steps in processing go here
