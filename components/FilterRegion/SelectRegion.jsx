const SelectRegion = ({ regionState, onRegionFilterChange }) => {
    const handleRegionChange = e => {
        if (e.target.value === 'Filter By Region') {
            return onRegionFilterChange('')
        }
        onRegionFilterChange(e.target.value)
    }

    const arrayOfRegions = [
        'Filter By Region',
        'Europe',
        'North America',
        'South America',
        'Middle-East',
        'Asia',
        'Africa',
    ]

    return (
        <>
            <div id="select" className=" mx-auto w-48">
                <select
                    onChange={handleRegionChange}
                    value={regionState}
                    id="countries"
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                    required
                >
                    {arrayOfRegions.map(region => (
                        <option key={region}>{region}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default SelectRegion
