import { useContext } from 'react'

import { useRouter } from 'next/router'

import SpotSpecsDisplayer from './specs-spot-displayer'
import ButtonPrimary from './design/button-primary'
import SpotterProfilePreview from './spotter-profile-preview'
import DividerDesign from './design/divider'
import Toggler from './toggler-visited-spot'

import { BiEdit } from 'react-icons/bi'
import { MdOutlineRateReview } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

import { ModalsContext } from '../context/AppContext'

import { TOAST_PARAMS } from '../constants/toast-query-params'

import getAvrgGrade from '../utils/get-average-rate'

const { KEY, VALUE_FEATURE_NOT_YET_AVAILABLE } = TOAST_PARAMS

const SpotCardCTA = ({
    isAuthor,
    author,
    onAddVisit,
    didUserVisitSpot,
    spotID,
    nbOfVisits,
    spotDetails,

    isAuthLoading,
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

    // Will open modal and add the spot details to global state
    const reviewSpotRequestHandler = () => {
        modalContext.seeSpotReviews.toggleModalState()
        modalContext.seeSpotReviews.spotReviewedHandler({
            ...spotDetails,
            authorID: author._id,
            spotID,
        })
    }

    return (
        <>
            <SpotSpecsDisplayer
                reviewsQty={spotDetails.reviews.length}
                nbOfVisits={nbOfVisits}
                averageGrade={getAvrgGrade(spotDetails.reviews)}
                onOpenReviewModal={reviewSpotRequestHandler}
            />
            <div className="flex justify-center gap-x-4 sticky top-11">
                <ButtonPrimary
                    icon={<MdOutlineRateReview />}
                    text={'Reviews'}
                    onClickHandler={reviewSpotRequestHandler}
                />

                <ButtonPrimary
                    isLoading={isAuthLoading}
                    shouldBeDisabled={isAuthLoading}
                    onClickHandler={
                        isAuthor ? deleteSpotRequestHandler : featureNotReadyHandler
                    }
                    icon={isAuthor ? <AiFillDelete /> : <BiEdit />}
                    text={isAuthor ? 'Delete' : 'Suggest edits'}
                />
            </div>
            <SpotterProfilePreview
                w={'w-14'}
                h={'h-14'}
                author={author}
                spanTxt={`Visit ${author.name}'s profile`}
            />
            <DividerDesign />

            <Toggler
                isLoading={isAuthLoading}
                onToggle={() => onAddVisit()}
                didUserVisitSpot={didUserVisitSpot}
            />
        </>
    )
}

export default SpotCardCTA
