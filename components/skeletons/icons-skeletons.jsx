const SkeletonIcons = ({ style }) => {
    return (
        <div className="flex items-center justify-center gap-x-2">
            <div className={`animate-pulse bg-gray-300 w-4 h-4 rounded-sm`}></div>
            <div className={`animate-pulse bg-gray-300 w-4 h-4 rounded-sm`}></div>
            <div className={`animate-pulse bg-gray-300 w-4 h-4 rounded-sm`}></div>
        </div>
    )
}

export default SkeletonIcons
