import {
    BsFillTreeFill,
    BsBuilding,
    BsSunset,
    BsWater,
    BsQuestionCircle,
} from 'react-icons/bs'

import { GiPalette } from 'react-icons/gi'
import { GoTelescope } from 'react-icons/go'

const SPOT_CATEGORIES = [
    { name: 'Art', icon: <GiPalette /> },
    { name: 'Astronomy', icon: <GoTelescope /> },
    { name: 'Nature', icon: <BsFillTreeFill /> },
    { name: 'Oceans', icon: <BsWater /> },
    { name: 'Other', icon: <BsQuestionCircle /> },
    { name: 'Sunset', icon: <BsSunset /> },
    { name: 'Urban', icon: <BsBuilding /> },
]

export default SPOT_CATEGORIES
