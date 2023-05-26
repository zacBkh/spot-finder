import { useState } from 'react'

import { AiOutlineSearch } from 'react-icons/ai'

import { DISABLED_STYLE } from '../../../constants/disabled-style'
import { SMALL_TEXT_FS } from '../../../constants/responsive-fonts'

import worldCountryDetails from '../../../utils/world-country-continents'

const countryNamesArr = worldCountryDetails.map(country => ({
    name: country.name,
    code: country.code,
}))

const SearchCountry = ({
    formik,
    onCountrySelect,

    validData,
}) => {
    const [selectedCountryCode, setSelectedCountryCode] = useState('')

    const [isSelectorVisible, setIsSelectorVisible] = useState(false)
    const [filteredData, setFilteredData] = useState(countryNamesArr)
    const countrySelectHandler = selectedCountry => {
        console.log('selectedCountry', selectedCountry)
        onCountrySelect(selectedCountry)
        setIsSelectorVisible(false)
    }

    const boldMatchedLetters = (country, inputValue) => {
        // if (!country) {
        //     return
        // }
        const startIndex = country.toLowerCase().indexOf(inputValue.toLowerCase())
        const endIndex = startIndex + inputValue.length

        return (
            <span>
                {country.substring(0, startIndex)}
                <strong>{country.substring(startIndex, endIndex)}</strong>
                {country.substring(endIndex)}
            </span>
        )
    }

    const activeCountryNames = filteredData.map(country => (
        <div
            onClick={() => countrySelectHandler(country)}
            key={country.code}
            className={`z-[5555] pl-2 py-2 w-full flex items-center text-black hover:bg-tertiary-hov cursor-pointer`}
        >
            {boldMatchedLetters(country.name, formik.values.country)}
        </div>
    ))

    const searchHandler = searchedWord => {
        const newFilter = countryNamesArr.filter(country =>
            country.name.toLowerCase().includes(searchedWord.toLowerCase()),
        )
        setFilteredData(newFilter)
        setIsSelectorVisible(true)
    }

    return (
        <>
            <div className="search relative">
                <div className="searchInput relative">
                    <div className="absolute bottom-[28%] left-0 flex items-center pointer-events-none pl-2">
                        <AiOutlineSearch className=" text-gray-400 text-lg" />
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input
                        value={formik.values.country}
                        onClick={() => setIsSelectorVisible(prev => !prev)}
                        onBlur={formik.handleBlur}
                        onChange={event => {
                            formik.handleChange(event)
                            searchHandler(event.target.value)
                        }}
                        disabled={formik.isSubmitting}
                        className={`
                                ${validData.border}
                                ${DISABLED_STYLE}
                                rounded-lg border w-full
                                p-2
                                pl-8
                        `}
                        type="search"
                        name="country"
                        placeholder="Your country"
                    />
                </div>

                {isSelectorVisible ? (
                    <div className="dataResult rounded-sm w-full max-h-52 absolute z-20 h-fit bg-white shadow-md overflow-hidden overflow-y-auto">
                        {filteredData.length ? (
                            activeCountryNames
                        ) : (
                            <p className="pl-2 py-2">
                                No country matches your query... 😢
                            </p>
                        )}
                    </div>
                ) : (
                    ''
                )}
                <div
                    className={`${SMALL_TEXT_FS} !text-primary mt-1 whitespace-pre-wrap`}
                >
                    {formik.touched.country ? formik.errors.country : ''}
                </div>
            </div>
        </>
    )
}

export default SearchCountry
