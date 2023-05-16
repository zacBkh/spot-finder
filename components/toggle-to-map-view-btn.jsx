import { BsFillMapFill, BsListUl } from 'react-icons/bs'

const ToggleToMapView = ({ isOnMapMode, onToggleMapView }) => {
    const centerXAxis = 'fixed left-1/2 bottom-[5%]'

    return (
        <>
            <button
                onClick={onToggleMapView}
                className={`${centerXAxis} py-[14px] px-[19px] rounded-3xl text-white bg-[#222222] flex items-center gap-x-2 text-sm z-30`}
            >
                {isOnMapMode ? (
                    <>
                        Show List <BsListUl />
                    </>
                ) : (
                    <>
                        Show Map <BsFillMapFill />
                    </>
                )}
            </button>
        </>
    )
}

export default ToggleToMapView
