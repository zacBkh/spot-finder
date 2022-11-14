// This comp will be used for both edition and deletion action buttons

import { useState } from "react"

import BothSpotForm from "./Forms/BothSpotForm";

const SpotAction = ({ action, onSpotAction, previousValues, message1, message2 }) => {


    const [isUnderAction, setIsUnderAction] = useState(false);


    const enterActionHandler = () => {
        setIsUnderAction((prevState) => !prevState);
    }

    return (
        <>
            {/* Spot Edition */}
            <button
                className="block"
                onClick={enterActionHandler}>
                {isUnderAction ? message2 : message1}
            </button>



            {
                isUnderAction &&
                action === "edition" &&
                <BothSpotForm
                    previousValues={previousValues}
                    onAddOrEditFx={onSpotAction}
                />
            }


            {
                isUnderAction &&
                action === "deletion" &&
                <>
                    <button className="mr-6" onClick={onSpotAction}> Yes </button>
                    <button onClick={() => setIsUnderAction(false)}> No </button>
                </>
            }

        </>
    )
}

export default SpotAction