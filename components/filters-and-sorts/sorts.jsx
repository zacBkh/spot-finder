const SortSpots = ({ icon, value, onClick, activeItems, displayName, smallSizeBtns }) => {
    const styleSelected =
        'text-secondary bg-secondary-light hover:bg-secondary-hov border-secondary'

    const styleWithoutSelection = 'text-form-color bg-tertiary hover:!bg-tertiary-hov'

    return (
        <button
            className={`
                        flex justify-between items-center 
                        ${
                            smallSizeBtns
                                ? 'px-1 py-1 xl:px-2 xl:py-1'
                                : 'px-2 py-1 xl:px-4 xl:py-3'
                        }  
                        gap-x-1 w-fit  
                        rounded-[0.5rem] border-[0.1rem] border-transparent
                        ${activeItems === value ? styleSelected : styleWithoutSelection}
                        `}
            type="button"
            onClick={() => onClick(value)}
        >
            <div className="block mr-1 text-sm"> {icon}</div>
            <div className="text-xs font-semibold">{displayName ?? value}</div>
        </button>
    )
}

export default SortSpots
