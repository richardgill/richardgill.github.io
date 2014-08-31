# Web development environment in node et. al.

# Build: sudo docker build -t rgill/blog .
# Development: sudo docker run -v $PWD/web:/mount/blog -p 4000 -e IP=$(hostname -I | awk '{print $1}') -i -t rgill/angular-webui bash
#							 cd /mount/workspace/
#							 npm install
#							 grunt serve

FROM lgsd/docker-rails
MAINTAINER Richard Gill <richard@rgill.co.uk>
# Blog environment for Jekyll

# Build: sudo docker build -t rgill/blog .


RUN apt-get update -y && apt-get install --no-install-recommends -y -q curl python build-essential git ca-certificates

RUN mkdir /nodejs && curl http://nodejs.org/dist/v0.10.29/node-v0.10.29-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1

ENV PATH /nodejs/bin:$PATH

# Grunt needs git
    RUN apt-get -y install git

# Install Sass

    RUN gem install sass

    RUN gem install jekyll

EXPOSE 4000
