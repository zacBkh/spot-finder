import dynamic from 'next/dynamic'

import Spinner from '../spinner'

const DynamicMapForm = dynamic(
    () =>
        import(
            /* webpackChunkName: 'lazy-loaded-new-spot-map' */
            './map-form'
        ),
    {
        loading: () => (
            <div className="text-center mx-auto flex flex-col items-center">
                <p>The map is loading...</p>
                <Spinner color={'border-t-secondary'} />
            </div>
        ),
        ssr: false,
    },
)

export default DynamicMapForm
