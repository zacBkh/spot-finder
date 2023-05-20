import dynamic from 'next/dynamic'

const DynamicMapForm = dynamic(
    () =>
        import(
            /* webpackChunkName: 'lazy-loaded-new-spot-map' */
            './map-form'
        ),
    {
        loading: () => <p>The Map is loading...</p>,
        ssr: false,
    },
)

export default DynamicMapForm