import { BODY_FS } from '../constants/responsive-fonts'
const Toggler = ({ didUserVisitSpot, onToggle }) => {
    return (
        <div onClick={onToggle}>
            <button
                aria-label="Mark this spot as visited"
                className="text-form-color border border-[#e8e1e0] rounded-md flex items-center gap-x-2 w-fit mx-auto p-3
                bg-transparent hover:bg-tertiary transition-colors cursor-pointer"
            >
                <div
                    htmlFor="default-toggle"
                    className="inline-flex relative items-center"
                >
                    <input
                        readOnly
                        checked={didUserVisitSpot}
                        type="checkbox"
                        id="default-toggle"
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
                <span className={`${BODY_FS}`}>
                    {didUserVisitSpot
                        ? 'You have visited this Spot.'
                        : 'Have you visited this Spot?'}
                </span>
            </button>
        </div>
    )
}

export default Toggler
