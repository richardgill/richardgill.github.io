#!/bin/sh
{
    echo "This script requires superuser access"
    echo "You will be prompted for your password by sudo."

    # clear any previous sudo permission
    sudo -k

    # run inside sudo
    sudo sh <<SCRIPT
        echo "Building a blog docker instance"
        docker build -t blog .

        echo "Running container"


        echo "You need to run:\n"

        echo "\nThen you can do: \n\n"
        echo "cd /mount/blog/ && bundle install && bundle exec jekyll serve --watch --drafts"

SCRIPT

sudo docker run -v $PWD:/mount/blog/ -p 4000:80 -e IP=$(hostname -I | awk '{print $1}') -i -t blog bash


}
