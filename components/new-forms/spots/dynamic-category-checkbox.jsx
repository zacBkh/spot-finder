import dynamic from 'next/dynamic'

const DynamicSpotCategory = dynamic(
    () =>
        import(
            /* webpackChunkName: 'lazy-loaded-category-checkbox' */
            './category-checkbox'
        ),
    {
        loading: () => <p>...</p>,
        ssr: false,
    },
)

export default DynamicSpotCategory
