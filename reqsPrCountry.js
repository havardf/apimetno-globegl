import { scaleSequentialSqrt } from 'https://esm.sh/d3-scale';
import { interpolateYlOrRd } from 'https://esm.sh/d3-scale-chromatic';

const colorScale = scaleSequentialSqrt(interpolateYlOrRd);
const getVal = feat => Math.log(feat.properties.req_freq / 10000);

fetch('./countries_with_req_freq.json').then(res => res.json()).then(countries =>
{
  const maxVal = Math.max(...countries.features.map(getVal));
  colorScale.domain([0, maxVal]);
  const world = new Globe(document.getElementById('globeViz'))
    .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
    //.backgroundImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
    .lineHoverPrecision(0)
    .pointOfView({ lat: 10, lng: 10, altitude: 2 })
    .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
    .polygonAltitude(0.06)
    .polygonCapColor(feat => colorScale(getVal(feat)))
    .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
    .polygonStrokeColor(() => '#111')
    .polygonLabel(({ properties: d }) => `
      <h3>${d.ADMIN} (${d.ISO_A2})</h3>
      <h4>Requests pr.day: <i>${(d.req_freq/1000).toFixed(1)}K</i><br/>
      Population: <i>${(d.POP_EST/1000000).toFixed(1)}M</i></h4>
    `)
    .onPolygonHover(hoverD => world
      .polygonAltitude(d => d === hoverD ? 0.12 : 0.06)
      .polygonCapColor(d => d === hoverD ? '#52B6EB' : colorScale(getVal(d)))
    )
    .polygonsTransitionDuration(300)
     // Auto-rotate
     world.controls().autoRotate = true;
     world.controls().autoRotateSpeed = 0.3;
});
