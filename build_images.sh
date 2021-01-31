for i in {0..73} ; do
  convert -resize 300x300 -quality 100 _images/cat${i}.png static/img/cat${i}.png
  pngnq -f static/img/cat${i}.png
  mv -f static/img/cat${i}-nq8.png static/img/cat${i}.png
done
