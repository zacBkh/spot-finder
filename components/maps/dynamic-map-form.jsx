import dynamic from 'next/dynamic'

const DynamicMapForm = dynamic(
    () =>
        import(
            /* webpackChunkName: 'lazy-loaded-new-spot-map' */
            './map-form'
        ),
    {
        loading: () => <p className="text-center mx-auto">The Map is loading...</p>,
        ssr: false,
    },
)

export default DynamicMapForm
