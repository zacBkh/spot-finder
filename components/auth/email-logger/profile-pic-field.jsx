import { FaUserCircle } from 'react-icons/fa'
import { BsFillCameraFill, BsCheckLg } from 'react-icons/bs'

import UserImage from '../../user-image'

import DividerDesign from '../../design/divider'

import ImageUploaderWrapper from '../../image-uploader-wrapper'

import { SMALL_TEXT_FS } from '../../../constants/responsive-fonts'

import { DISABLED_STYLE_STATELESS } from '../../../constants/disabled-style'

import PROFILE_PIC_DEFAULT_OPTIONS from '../../../constants/default-profile-pic'

const SelectProfilePic = ({ formik, onPictureSelect }) => {
    const imgSize = 'w-14 xl:w-20 h-14 xl:h-20'

    const selectDefaultPicHandler = picLink => {
        console.log('picLink', picLink)
        onPictureSelect(false, picLink)
    }

    const successUploadCustomPicHandler = picURL => {
        onPictureSelect(true, picURL)
    }

    return (
        <div className="!mt-5">
            <p className="font-semibold text-sm text-center sm:text-start">
                Upload your photo or just pick one
            </p>
            <div
                className={`w-full
            
                 ${formik.isSubmitting ? DISABLED_STYLE_STATELESS : ''}`}
            >
                <div className="mt-2 flex justify-between items-center  w-full">
                    <ImageUploaderWrapper
                        headless
                        shouldBeDisabled={formik.isSubmitting}
                        onSuccessfulUpload={successUploadCustomPicHandler}
                        uploadPreset={'spot-finder-user-profile-pic-upload-preset'}
                        multiple={false}
                        maxFiles={1}
                        cropping={true}
                    >
                        <div
                            title="Add your own profile picture."
                            className="relative mr-2 pb-4"
                        >
                            {formik.values.profilePic.isCustom ? (
                                <UserImage
                                    alt={'The picture you have uploaded'}
                                    title="You have uploaded this picture"
                                    size={imgSize}
                                    picLink={formik.values.profilePic.link}
                                />
                            ) : (
                                <FaUserCircle className={`${imgSize} text-primary`} />
                            )}
                            <div
                                className="absolute left-full -ml-[28px] sm:-ml-[32px] top-full -mt-[38px] sm:-mt-[44px] 
                                text-xs sm:text-base 
                                text-white bg-secondary rounded-full p-[6px] sm:p-2"
                            >
                                <BsFillCameraFill />
                            </div>
                        </div>
                    </ImageUploaderWrapper>
                    <DividerDesign vertical />
                    <div
                        className="flex justify-between items-center gap-x-4 xl:gap-x-6 
                    whitespace-nowrap w-full overflow-x-scroll pb-4"
                    >
                        {PROFILE_PIC_DEFAULT_OPTIONS.map(pic => (
                            <button
                                aria-label="Choose this photo as a profile picture"
                                disabled={formik.isSubmitting}
                                key={pic.name}
                                onClick={() => selectDefaultPicHandler(pic.link)}
                                type="button"
                            >
                                <div className="relative">
                                    <UserImage
                                        alt={'A picture you can pick as profile picture'}
                                        title={pic.name}
                                        size={imgSize}
                                        picLink={pic.link}
                                    />
                                    {formik.values.profilePic.link === pic.link ? (
                                        <>
                                            <div
                                                title="You have chosen this picture."
                                                className="absolute top-0 left-0 w-full h-full bg-white rounded-full opacity-50"
                                            ></div>
                                            <div className="absolute left-1/2 -ml-[15px] top-1/2 -mt-[15px] text-primary text-3xl">
                                                <BsCheckLg />
                                            </div>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`${SMALL_TEXT_FS} !text-primary mt-1 whitespace-pre-wrap`}>
                {formik.values.password.length > 8
                    ? formik?.errors?.profilePic?.link
                    : ''}
            </div>
        </div>
    )
}

export default SelectProfilePic
