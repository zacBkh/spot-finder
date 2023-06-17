const ButtonPhoto = ({ txt, icon, moreStyle }) => {
    return (
        <button
            aria-label={txt}
            className={`${moreStyle} py-2 px-2 md:px-3 flex items-center gap-x-2 bg-white text-form-color rounded-lg shadow-md text-xs md:text-sm 2xl:text-base !hover:brightness-100 transition-colors`}
        >
            <div>{icon}</div>
            <div>{txt}</div>
        </button>
    )
}

export default ButtonPhoto
