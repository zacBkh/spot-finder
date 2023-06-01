import { FaUserCircle } from 'react-icons/fa'
import { BsFillCameraFill, BsCheckLg } from 'react-icons/bs'

import UserImage from '../../user-image'

import DividerDesign from '../../design/divider'

import ImageUploaderWrapper from '../../image-uploader-wrapper'

import { SMALL_TEXT_FS } from '../../../constants/responsive-fonts'

const SelectProfilePic = ({ formik, onPictureSelect }) => {
    const picOptions = [
        {
            name: 'Photographer during sunset.',
            link: 'https://images.unsplash.com/photo-1506434304575-afbb92660c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
        },
        {
            name: 'Photographer at the top of a summit.',
            link: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
        },

        {
            name: 'Women photographer in the nature.',
            link: 'https://images.unsplash.com/photo-1500027419059-afa3360ead5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        },
        {
            name: 'Women photographer in the street.',
            link: 'https://images.unsplash.com/photo-1523359247812-29dde5ac53a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        },
    ]

    const imgSize = 'w-14 xl:w-20 h-14 xl:h-20'

    const selectDefaultPicHandler = picLink => {
        console.log('picLink', picLink)
        onPictureSelect(false, picLink)
    }

    const successUploadCustomPicHandler = picURL => {
        onPictureSelect(true, picURL)
    }

    return (
        <>
            <p className="font-semibold text-sm text-center sm:text-start">
                Upload your photo or just pick one
            </p>
            <div className="overflow-x-scroll w-full pb-4">
                <div className="mt-2 flex justify-between items-center gap-x-4 xl:gap-x-6 w-fit ">
                    <ImageUploaderWrapper
                        headless
                        shouldBeDisabled={formik.isSubmitting}
                        onSuccessfulUpload={successUploadCustomPicHandler}
                        uploadPreset={'spot-finder-user-profile-pic-upload-preset'}
                        multiple={false}
                        maxFiles={1}
                        cropping={true}
                    >
                        <div title="Add your own profile picture." className="relative">
                            {formik.values.profilePic.isCustom ? (
                                <UserImage
                                    alt={'The picture you have uploaded'}
                                    title="You have uploaded this picture"
                                    width={imgSize}
                                    picLink={formik.values.profilePic.link}
                                />
                            ) : (
                                <FaUserCircle className={`${imgSize} text-primary`} />
                            )}
                            <div
                                className="absolute left-full -ml-[32px] top-full -mt-[26px] 
                                text-lg text-white bg-secondary rounded-full p-[6px]"
                            >
                                <BsFillCameraFill />
                            </div>
                        </div>
                    </ImageUploaderWrapper>
                    <DividerDesign vertical />
                    {picOptions.map(pic => (
                        <button
                            key={pic.name}
                            onClick={() => selectDefaultPicHandler(pic.link)}
                            type="button"
                        >
                            <div className="relative">
                                <UserImage
                                    alt={'A picture you can pick as profile picture'}
                                    title={pic.name}
                                    width={imgSize}
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
            <div className={`${SMALL_TEXT_FS} !text-primary mt-1 whitespace-pre-wrap`}>
                {formik.values.password.length > 8 ? formik.errors.profilePic.link : ''}
            </div>
        </>
    )
}

export default SelectProfilePic
