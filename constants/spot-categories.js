import {
    BsFillTreeFill,
    BsBuilding,
    BsSunset,
    BsWater,
    BsQuestionCircle,
} from 'react-icons/bs'

import { GiPalette } from 'react-icons/gi'
import { GoTelescope } from 'react-icons/go'

const spotCategories = [
    { name: 'Nature', icon: <BsFillTreeFill /> },
    { name: 'Urban', icon: <BsBuilding /> },
    { name: 'Sunset', icon: <BsSunset /> },
    { name: 'Art', icon: <GiPalette /> },
    { name: 'Astronomy', icon: <GoTelescope /> },
    { name: 'Oceans', icon: <BsWater /> },
    { name: 'Other', icon: <BsQuestionCircle /> },
]

export default spotCategories
