import { useState } from 'react'

const SelectSort = ({ sortingState, onSortChange }) => {
    const handleSortChange = e => {
        console.log('ee.target.value', e.target.value)
        if (e.target.value === 'Sort By...') {
            return onSortChange('')
        }
        onSortChange(e.target.value)
    }

    const sortingOptions = [
        'Sort by...',
        'Grade',
        'Number of Visits',
        'Oldest to newest',
        'Newest to oldest',
    ]

    return (
        <>
            <div id="select" className=" mx-auto w-48">
                <select
                    onChange={handleSortChange}
                    value={sortingState}
                    id="sort"
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                    required
                >
                    {sortingOptions.map(region => (
                        <option key={region}>{region}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default SelectSort
