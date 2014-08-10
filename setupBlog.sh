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

        echo "\nRunning command: \n\n"
        echo "cd /mount/blog/ && bundle install && bundle exec jekyll serve --watch --drafts"

SCRIPT

sudo docker run -v $PWD:/mount/blog/ -p 4000:4000 -e IP=$(hostname -I | awk '{print $1}') -i -t blog bash -c "cd /mount/blog/ && bundle install && bundle exec jekyll serve --watch --drafts && bash"

}
