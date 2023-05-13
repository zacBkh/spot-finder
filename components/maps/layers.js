export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'spots',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': [
            'step',
            ['get', 'point_count'],
            '#EF5E4E',
            100,
            '#3b97ba',
            750,
            '#F1F075',
        ],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    },
}

export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'spots',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
    },
}

export const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'spots',
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': '#EF5E4E',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
    },
}
