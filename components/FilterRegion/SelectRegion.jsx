import { useState } from "react"


const SelectRegion = ({ }) => {

    const [region, setRegion] = useState("Filter by region");



    return (
        <>
            <div
                id="select"
                className=" mx-auto w-48">


                <select
                    onChange={(e) => setRegion(e.target.value)}

                    id="countries"
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2.5 text-sm" required>


                    <option>
                        Filter by region
                    </option>

                    <option>
                        Europe
                    </option>
                    <option>
                        Norht America
                    </option>
                    <option>
                        South America
                    </option>
                    <option>
                        Middle-East
                    </option>
                    <option>
                        Asia
                    </option>
                    <option>
                        Africa
                    </option>
                </select>
            </div>

        </>
    )
}

export default SelectRegion 