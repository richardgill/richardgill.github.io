---
layout: post
category : learning
tagline: "Supporting tagline"
tags : [docker, seed-project]
summary: "Setting up a project should be easy. You can use docker to allow others to have your project running in just one command."
---

[Docker](https://www.docker.io) is a tool for creating lighter weight virtual machines (called *containers*) for linux. The idea is you can define a docker *image* which anyone else can repeatably use and put it in the [Docker index](https://index.docker.io) a repository of pre-made images.
Docker has loads of usecases, probably the most obvious is deploying your container to a cloud provider e.g. AWS and then being able to deploy the same container to another provider e.g. Digital Ocean.
It has the potential to eliminate cloud provider lock-in. Lucas Carlson has written a [great primer](http://www.centurylinklabs.com/what-is-docker-and-when-to-use-it/) about what docker is (and isn't).

### Quicker project setup
Setting up a project using docker can be as simple as:

####Pre-requisites:

* [Install docker](http://docs.docker.com/installation/ubuntulinux/)

####Project setup:

* git clone <project_url>
* ./setupProject.sh
* Project is running inside docker

There is no need to install packages (e.g. node, java, rails, whatever.), they're automatically installed inside the docker container.

### Reproducible environments are good

With docker you can check in operating system setup to version control. This is powerful since it eliminates discrepancies
between running instances of your software. Each developers setup will run the same as each other's and production. This makes
finding bugs easier and decreases the chances of a botched release.

For example we can create a Docker container based on ubuntu with python installed:

{% highlight bash %}

FROM ubuntu

RUN apt-get -y install python

{% endhighlight %}

We can say things like `run apt-get install python`, set environment variables, copy files into the container etc.
This means that our full environment is reproducible from what is checked in.

This has been possible in the past with other tools, for example a full VM image. But Docker can do this quickly and by checking in just a text Dockerfile.

This works great: Want to upgrade the version of python you're using? Just update the file and check it in. You can be bold with
upgrading stuff and trying new things without worrying about screwing things up.

### Setup with one command

You can do this by putting a Dockerfile in the project and a bash script to setup the docker image and run it.
Anybody can check the project out, run the bash script and the project will just be running.

#### Example Setup.sh:
{% highlight bash %}


sudo docker build -t angular_seed .

sudo docker run
\ -v $PWD:/mount/angular_seed/
\ -p 9000:9000 -p 9876:9876 -p 4444:4444 -p 35729:35729
\-e IP=$(hostname -I | awk '{print $1}')
\ -i -t angular_seed
\ bash -c "cd /mount/angular_seed/ && npm install && grunt serve"

{% endhighlight %}

This means the knowledge of how to get the code base running is stored in version control rather than in people's heads.
This makes getting new people involved on the project **quick**, so hopefully we can focus on doing important stuff and not installing the right version of tool X.

I recently created an [angular seed project](https://github.com/richardgill/dockered-angular-seed) combining haml, sass and coffeescript in this way. Feel free to take a look :).
