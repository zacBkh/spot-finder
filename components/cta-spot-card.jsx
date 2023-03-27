import SpotGradeDisplayer from './grade-spot-displayer'
import ButtonSpotCard from './design/button-spot-card'
import SpotterProfilePreview from './spotter-profile-preview'
import DividerDesign from './design/divider'
import Toggler from './toggler-visited-spot'

import { BiEdit } from 'react-icons/bi'
import { MdOutlineRateReview } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

const SpotCardCTA = ({ shouldBeEditable, author, handleAddVisit, didUserVisitSpot }) => {
    return (
        <>
            <SpotGradeDisplayer />
            <div className="flex justify-center gap-x-4 sticky top-11">
                <ButtonSpotCard icon={<MdOutlineRateReview />} text={'Review'} />

                {shouldBeEditable ? (
                    <ButtonSpotCard icon={<AiFillDelete />} text={'Delete'} />
                ) : (
                    <ButtonSpotCard icon={<BiEdit />} text={'Suggest edits'} />
                )}
            </div>
            <SpotterProfilePreview authorName={author} />
            <DividerDesign />
            <Toggler onToggle={handleAddVisit} didUserVisitSpot={didUserVisitSpot} />
        </>
    )
}

export default SpotCardCTA
