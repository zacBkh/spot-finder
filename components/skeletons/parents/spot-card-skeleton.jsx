import SkeletonText from '../text-skeleton'
import SkeletonImage from '../image-skeleton'
import SkeletonIcons from '../icons-skeletons'

const SpotCardSkeleton = () => {
    return (
        <div>
            <SkeletonImage style={'w-64 h-64 rounded-lg'} />
            <SkeletonText type={'text'} style={'mt-3 w-[75%]'} />
            <SkeletonText type={'smText'} style={'w-[50%]'} />
            <SkeletonIcons />
        </div>
    )
}

export default SpotCardSkeleton
