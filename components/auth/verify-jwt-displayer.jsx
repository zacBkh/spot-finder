import Spinner from '../spinner'

import { BiErrorCircle, BiCheck } from 'react-icons/bi'

import { SMALL_TITLE_FS } from '../../constants/responsive-fonts'

const VerifyJWTDisplay = ({ error, isLoading, data }) => {
    const getActionStatus = () => {
        if (error) {
            return {
                text: 'There has been an issue verifying your email. Try again later.',
                icon: <BiErrorCircle className="text-primary" />,
            }
        }
        if (isLoading) {
            return {
                text: 'We are verifying your email...',
                icon: <Spinner color={'border-t-primary w-10 h-10'} />,
            }
        }

        if (data) {
            return {
                text: data.result,
                icon: data.success ? (
                    <BiCheck className="text-success" />
                ) : (
                    <BiErrorCircle className="text-primary" />
                ),
            }
        }
        return {
            text: 'We are verifying your email...',
            icon: <Spinner color={'border-t-primary w-10 h-10'} />,
        }
    }

    return (
        <div className="flex items-center justify-center h-[60vh] max-w-[70%] mx-auto text-center ">
            <div className="flex flex-col justify-center items-center gap-y-4">
                <div className="flex flex-col items-center gap-y-2">
                    <div className="text-4xl">{getActionStatus().icon}</div>
                    <h1 className={`${SMALL_TITLE_FS}`}>{getActionStatus().text}</h1>
                </div>
                <div className="border border-red-600"></div>
            </div>
        </div>
    )
}

export default VerifyJWTDisplay
