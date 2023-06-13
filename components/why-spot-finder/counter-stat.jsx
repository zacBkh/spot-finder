import { CountUp } from 'use-count-up'

const Counter = ({ endNum, text, isStatInView }) => {
    return (
        <div
            className="verticalBarStats before:bg-gradient-to-b before:from-primary before:to-[#ef5e4e93]
                relative px-4 alignStats mb-20"
        >
            <span className="text-3xl md:text-[40px] ">
                <CountUp
                    isCounting={isStatInView}
                    thousandsSeparator={' '}
                    end={endNum}
                    duration={3.5}
                    easing={'easeOutCubic'}
                />
            </span>
            <p className="text-base md:text-lg text-[#52525B]">{text}</p>
        </div>
    )
}

export default Counter
