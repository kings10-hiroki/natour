export const displayMap = locations => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiOGhpcm9wb24iLCJhIjoiY2ticHNqbzZmMHA5cjJ6b2Z2a3FreWdlZSJ9.yvwEdiIVcp92pTNfdIpYLA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/8hiropon/ckbq0owl61yf81inzc89zftf8',
        scrollZoom: false
        // center: [-118.113491, 34.111745],
        // zoom: 10,
        // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
            .setLngLat(loc.coordinates)
            .addTo(map);

        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 200,
            left: 100,
            right: 100
        }
    });
}


