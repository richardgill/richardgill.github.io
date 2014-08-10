---
layout: post
category : learning
tagline: "Supporting tagline"
tags : [docker, seed-project]
---

[Docker](https://www.docker.io) is a way of creating light weight virtual machines (called containers) for running
linux. The idea is you can define a docker 'image' which anyone else can repeatably use and put it in the [Docker index](https://index.docker.io).
Docker has loads of usecases, probably the most obvious is deploying your container to a cloud provider e.g. AWS and then being able to deploy the same container to Digital Ocean.
It has the potential to eliminate cloud provider lock-in.

### Reproducible environments

For me the killer feature of docker is being able to check in my operating system environment to version control.

For example you can specify your docker container as follows:

<EXAMPLE GOES HERE>

We can say things like run: apt-get install python, set environment variables, copy files into the container etc.
This means that our full environment is reproducible from what is checked in.

This has been possible in the past with other tools, for example a full VM image. But Docker can do this quickly and in a lightweight way.


### One click setup

On project i'm working on i've started to include a Dockerfile in the project and a bash script to setup the docker image and get the project running with one command.
Anybody can check the project out, run the bash script and the project will just be running.

This means the knowledge of how to get the code base running is stored in version control rather than in people's heads.
This makes getting new people involved on the project very low friction.
