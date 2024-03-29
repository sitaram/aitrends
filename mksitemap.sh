#!/bin/sh
# usage: ./mksitemap.sh > public/sitemap.xml; git commit; git push

date=$(date +%Y-%m-%d)

echo '<?xml version="1.0" encoding="UTF-8"?>'
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

echo "  <url>"
echo "    <loc>http://aitrends.live/</loc>" | sed 's/\&/\&amp;/g'
echo "    <lastmod>$date</lastmod>"
echo "  </url>"

echo "  <url>"
echo "    <loc>http://www.aitrends.live/</loc>" | sed 's/\&/\&amp;/g'
echo "    <lastmod>$date</lastmod>"
echo "  </url>"

echo "  <url>"
echo "    <loc>https://aitrends.live/</loc>" | sed 's/\&/\&amp;/g'
echo "    <lastmod>$date</lastmod>"
echo "  </url>"

echo "  <url>"
echo "    <loc>https://www.aitrends.live/</loc>" | sed 's/\&/\&amp;/g'
echo "    <lastmod>$date</lastmod>"
echo "  </url>"

awk -F"'" '/^        /{print $2}' app/topics.js | urlencode |
while read -r topic; do
  awk -F"'" '/^  /{print $2}' app/tabs.js | grep -v Divider | urlencode |
  while read -r tab; do
    echo "  <url>"
    echo "    <loc>https://www.aitrends.live/?topic=$topic&tab=$tab</loc>" | sed 's/\&/\&amp;/g'
    echo "    <lastmod>$date</lastmod>"
    echo "  </url>"
  done
done
echo '</urlset>'
