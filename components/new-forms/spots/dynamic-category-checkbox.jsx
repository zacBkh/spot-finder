import dynamic from 'next/dynamic'

import Spinner from '../../spinner'

const DynamicSpotCategory = dynamic(
    () =>
        import(
            /* webpackChunkName: 'lazy-loaded-category-checkbox' */
            './category-checkbox'
        ),
    {
        loading: () => (
            <div className="text-center mx-auto flex flex-col items-center">
                <Spinner color={'border-t-secondary'} />
            </div>
        ),
        ssr: false,
    },
)

export default DynamicSpotCategory
