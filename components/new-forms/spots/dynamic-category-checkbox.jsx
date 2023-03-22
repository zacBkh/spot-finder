import dynamic from 'next/dynamic'

const DynamicSpotCategory = dynamic(
    () =>
        import(
            /* webpackChunkName: 'lazy-loaded-category-checkbox' */
            './category-checkbox'
        ),
    {
        loading: () => <p>The checkbox is loading...</p>,
        ssr: false,
    },
)

export default DynamicSpotCategory
