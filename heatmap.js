
    // Gen random data
    const N = 900;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 160,
      lng: (Math.random() - 0.5) * 360,
      weight: Math.random()
    }));

    const world = new Globe(document.getElementById('globeViz'))
      .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg')
      .heatmapsData([gData])
      .heatmapPointLat('lat')
      .heatmapPointLng('lng')
      .heatmapPointWeight('weight')
      .heatmapTopAltitude(0.7)
      .heatmapsTransitionDuration(3000)
      .enablePointerInteraction(false);
