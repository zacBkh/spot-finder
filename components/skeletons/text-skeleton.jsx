const SkeletonText = ({ type, nbOfLines, gap, fullWidth, style }) => {
    let lineHeight
    let lineWidth

    if (type === 'title') {
        lineHeight = 'h-5'
        lineWidth = 'w-60'
    } else if (type === 'smTitle') {
        lineHeight = 'h-3'
        lineWidth = 'w-52'
    } else if (type === 'text') {
        lineHeight = 'h-2'
        lineWidth = 'w-96'
    } else if (type === 'smText') {
        lineHeight = 'h-2'
        lineWidth = 'w-52'
    }
    if (fullWidth) {
        lineWidth = 'w-full'
    }

    const nbOfSkeletons = [1]
    for (let step = 0; step < nbOfLines; step++) {
        nbOfSkeletons.push(1)
    }

    return (
        <>
            <div role="status" className={`animate-pulse flex flex-col ${gap}`}>
                {nbOfSkeletons.map((i, index) => (
                    <div
                        key={index}
                        className={`${lineHeight} ${lineWidth} ${style} bg-gray-200 rounded-full mb-2.5`}
                    ></div>
                ))}
            </div>
        </>
    )
}

export default SkeletonText
