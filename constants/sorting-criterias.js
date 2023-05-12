import { MdGrade } from 'react-icons/md'
import { ImEye } from 'react-icons/im'
import { BsFillClockFill } from 'react-icons/bs'

const SORTING_CRITERIAS = [
    { name: 'Grade', icon: <MdGrade /> },
    { name: 'Number of visits', icon: <ImEye /> },
    { name: 'Recent', icon: <BsFillClockFill /> },
]

export default SORTING_CRITERIAS
