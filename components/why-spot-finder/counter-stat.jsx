import { CountUp } from 'use-count-up'

const Counter = ({ endNum, text }) => {
    const onComplete = () => {
        return { shouldRepeat: true, delay: 2 }
    }

    return (
        <div
            className="verticalBarStats before:bg-gradient-to-b before:from-primary before:to-[#ef5e4e93]
                relative px-4 alignStats mb-20"
        >
            <span className="text-[40px]">
                <CountUp
                    isCounting
                    thousandsSeparator={' '}
                    onComplete={onComplete}
                    end={endNum}
                    duration={4}
                    easing={'easeOutCubic'}
                />
            </span>
            <p className="text-base md:text-lg text-[#52525B]">{text}</p>
        </div>
    )
}

export default Counter
