jekyll
checkout master
cp -r _site/* . && rm -rf _site/ && touch .nojekyll
git status > git add > git commit
git push -all origin
