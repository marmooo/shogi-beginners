for i in {0..73} ; do
  convert -resize 300x300 -quality 100 _images/cat${i}.png static/img/cat${i}.png
  cwebp static/img/cat${i}.png -o static/img/cat${i}.webp
  rm static/img/cat${i}.png
done
