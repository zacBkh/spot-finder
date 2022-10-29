import { useState } from "react"


const NewSpotMap = () => {


    return (
        <>
            <div class="mb-4">
                <h6 class="boldairBnb">Click on the map to drag the marker at the exact location of your spot!</h6>
                <div id='mapNewCG'></div>
                <pre id="coordinates" class="coordinates"></pre>


                <div id="menu">
                    <input form="fakeForm" id="satellite-v9" type="radio" name="rtoggle" value="satellite"
                        checked="checked" />
                    <label for="satellite-v9">satellite</label>

                    <input form="fakeForm" id="light-v10" type="radio" name="rtoggle" value="light" />
                    <label for="light-v10">light</label>

                    <input form="fakeForm" id="streets-v11" type="radio" name="rtoggle" value="streets" />
                    <label for="streets-v11">streets</label>
                </div>
            </div>
        </>
    )
}

export default NewSpotMap 