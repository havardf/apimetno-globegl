import { csvParse } from 'https://esm.sh/d3-dsv';
import { scaleSequentialSqrt } from 'https://esm.sh/d3-scale';
import { interpolateYlOrRd } from 'https://esm.sh/d3-scale-chromatic';

const weightColor = scaleSequentialSqrt(interpolateYlOrRd).domain([0, 1000000]);
const world = new Globe(document.getElementById('globeViz'))
  .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
  .bumpImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
  .backgroundImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
  .hexBinPointWeight('count')
  .hexAltitude(d => d.sumWeight/1000000)
  .hexBinResolution(4)
  .hexTopColor(d => weightColor(d.sumWeight))
  .hexSideColor(d => weightColor(d.sumWeight))
  .hexBinMerge(true)
  .enablePointerInteraction(false); // performance improvement
fetch('./clustered_locations.csv').then(res => res.text())
  .then(csv => csvParse(csv, ({ lng, lat, count }) => ({ lng: +lng, lat: +lat, count: +count })))
  .then(data => world.hexBinPointsData(data));

// Add auto-rotation
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.6;