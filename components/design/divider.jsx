const DividerDesign = ({ margin, vertical }) => {
    return (
        <>
            <div
                className={`${
                    vertical ? 'border-r h-16' : 'border-b'
                }  border-[#e4e4e4] ${margin ?? ''}`}
            ></div>
        </>
    )
}

export default DividerDesign
