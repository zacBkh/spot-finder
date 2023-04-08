import { useContext, useState } from 'react'

import { useRouter } from 'next/router'

import SpotSpecsDisplayer from './specs-spot-displayer'
import ButtonSpotCard from './design/button-spot-card'
import SpotterProfilePreview from './spotter-profile-preview'
import DividerDesign from './design/divider'
import Toggler from './toggler-visited-spot'

import { BiEdit } from 'react-icons/bi'
import { MdOutlineRateReview } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

import { ModalsContext } from '../context/AppContext'

import { TOAST_PARAMS } from '../constants/toast-query-params'
const { KEY, VALUE_FEATURE_NOT_YET_AVAILABLE } = TOAST_PARAMS

const SpotCardCTA = ({
    shouldBeEditable,
    author,
    onAddVisit,
    didUserVisitSpot,
    spotID,
    nbOfVisits,
}) => {
    const router = useRouter()

    const modalContext = useContext(ModalsContext)

    // Will open modal
    const deleteSpotRequestHandler = () => {
        modalContext.confirmSpotDeletion.newSpotToDeleteHandler(spotID)
        modalContext.confirmSpotDeletion.toggleModalState()
    }

    const featureNotReadyHandler = () => {
        router.push(
            { query: { spotID, [KEY]: VALUE_FEATURE_NOT_YET_AVAILABLE } },
            undefined,
            {
                shallow: true,
            },
        )
    }

    const [updatedNbOfVisits, setUpdatedNbfVisits] = useState(nbOfVisits)

    const toggleSwitchHandler = () => {
        onAddVisit()
        didUserVisitSpot
            ? setUpdatedNbfVisits(prevState => prevState - 1)
            : setUpdatedNbfVisits(prevState => prevState + 1)
    }

    // onClick={() => { func1(); func2();}}
    return (
        <>
            <SpotSpecsDisplayer nbOfVisits={updatedNbOfVisits} />
            <div className="flex justify-center gap-x-4 sticky top-11">
                <ButtonSpotCard
                    icon={<MdOutlineRateReview />}
                    text={'Review'}
                    onClickHandler={featureNotReadyHandler}
                />

                {shouldBeEditable ? (
                    <div onClick={deleteSpotRequestHandler}>
                        <ButtonSpotCard icon={<AiFillDelete />} text={'Delete'} />
                    </div>
                ) : (
                    <ButtonSpotCard
                        icon={<BiEdit />}
                        text={'Suggest edits'}
                        onClickHandler={featureNotReadyHandler}
                    />
                )}
            </div>
            <SpotterProfilePreview author={author} />
            <DividerDesign />
            <Toggler onToggle={toggleSwitchHandler} didUserVisitSpot={didUserVisitSpot} />
        </>
    )
}

export default SpotCardCTA
