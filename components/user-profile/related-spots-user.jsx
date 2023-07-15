import SpotCard from '../spot-index-card'

import SpotCardSkeleton from '../skeletons/parents/spot-card-skeleton'
import SkeletonText from '../skeletons/text-skeleton'

import { SMALL_TITLE_FS } from '../../constants/responsive-fonts'

const RelatedSpots = ({ isLoading, title, refClick, spots }) => {
    if (!spots.length) return ''

    return (
        <div className="space-y-3 scroll-mt-20" ref={refClick}>
            {isLoading ? (
                <SkeletonText type={'smTitle'} nbOfLines={1} />
            ) : (
                <h2 className={`${SMALL_TITLE_FS} font-semibold`}>{title}</h2>
            )}
            <div className="flex justify-center md:justify-between flex-wrap gap-5">
                {isLoading
                    ? ['a', 'b', 'c', 'd'].map(placeholder => (
                          <SpotCardSkeleton key={placeholder} />
                      ))
                    : spots.map(spot => (
                          <SpotCard
                              width={'w-72 sm:w-60'}
                              height={'h-72 sm:h-60'}
                              shouldNotDisplayUserPic
                              key={spot._id}
                              spotData={spot}
                          />
                      ))}
            </div>
        </div>
    )
}

export default RelatedSpots
