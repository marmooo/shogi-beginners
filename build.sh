hugo
drop-inline-css -r docs -o docs
minify static/index.js -o static/index.min.js
minify static/kifu-viewer.js -o static/kifu-viewer.min.js
minify -r docs -o .
rm .hugo_build.lock
