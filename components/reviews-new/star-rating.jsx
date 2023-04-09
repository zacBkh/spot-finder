import { Rating } from 'react-simple-star-rating'

const StarRater = ({ onUserRate, errorFeedback }) => {
    const handleRating = rate => {
        onUserRate(rate)
    }

    const tooltipArray = ['Terrible 😪', 'Bad 😐', 'Average 😕', 'Great 😊', 'Perfect 😍']

    return (
        <>
            <div className="text-left space-y-2">
                <Rating
                    tooltipDefaultText={'Please rate the Spot 💖'}
                    showTooltip
                    tooltipArray={tooltipArray}
                    tooltipClassName={'!bg-secondary'}
                    emptyStyle={{ display: 'flex ' }}
                    fillStyle={{ display: '-webkit-inline-box' }}
                    onClick={handleRating}
                />
                {errorFeedback.message}
            </div>
        </>
    )
}

export default StarRater
