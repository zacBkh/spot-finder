import * as Yup from 'yup'
import worldCountryDetails from '../utils/world-country-continents'

// Auth
const forbiddenNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const mail = {
    email: Yup.string()
        .trim()
        .lowercase()
        .required('Your Email is required.')
        .email('It seems like this is not an email...'),
}

const pwdRegister = {
    password: Yup.string()
        .trim()
        .min(8, 'Your password should be at least 8 characters long.')
        .required('Password is required.'),
}

const pwdLogin = {
    password: Yup.string().trim().required('Password is required.'),
}

const name = {
    name: Yup.string()
        .trim()
        .matches(
            /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/,
            'Name must be one word without special character.\n Example: John',
        )
        .min(3, 'Your name should be at least 3 characters long.')
        .max(18, 'Your name should not exceed 18 characters long.')
        .required('Name is required.')
        .test('noNumber', 'Your name cannot contain any number.', async valueToTest => {
            if (!valueToTest) {
                return
            }
            if (forbiddenNumber.some(x => valueToTest.includes(x))) {
                return false
            } else {
                return true
            }
        }),
}

const userCountryName = {
    country: Yup.string().trim().required('Your country of origin is required.'),
}

const userProfilePic = {
    profilePic: Yup.object({
        isCustom: Yup.boolean().nullable(),
        link: Yup.string().min(5).required('Please upload or pick a profile picture.'),
    }).required('-- Please upload or pick a profile picture.'),
}

// Mail
export const validMail = Yup.object().shape({
    ...mail,
})

// Mail + pwd
export const validMailPwd = Yup.object().shape({
    ...mail,
    ...pwdLogin,
})

export const validFullUser = Yup.object().shape({
    ...mail,
    ...pwdRegister,
    ...name,
    ...userCountryName,
    ...userProfilePic,
})

// Reset password form
export const doublePwdFieldSchema = Yup.object().shape({
    password: Yup.string()
        .trim()
        .min(8, ({ min }) => `Your password should be at least ${min} characters long.`)
        .required('Password is required.'),

    password2: Yup.string()
        .trim()
        .required('Please confirm your password.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
})

// ----------------

// Add Spot
const title = {
    title: Yup.string()
        .trim()
        .min(6, ({ min }) => `The title should be at least ${min} characters long`)
        .max(50, ({ max }) => `The title should be no more than ${max} characters long`)
        .required('The title of your Spot is required'),
}

const description = {
    description: Yup.string()
        .trim()
        .min(15, ({ min }) => `The description should be at least ${min} characters long`)
        .required('The description is required'),
}

const categories = {
    categories: Yup.array().min(1, 'Select at least one category.').required(),
}

const coordinates = {
    coordinates: Yup.array()
        .min(2, 'Both Latitude and Longitude should be added? Try again later.')
        .max(2, 'Both Latitude and Longitude should be added? Try again later.')
        .required(
            'Please search your Spot with the search bar or click anywhere and drag the Marker',
        ),
}

const images = {
    images: Yup.array()
        .of(Yup.string())
        .min(1, ({ min }) => `At least ${min} picture is required and a maximum of 3.`)
        .max(3, ({ max }) => `You can only add up to ${max} pictures.`),
}

// Title + Description + Categories
export const validTitleDesc = Yup.object().shape({
    ...title,
    ...description,
    ...categories,
    ...coordinates,
    ...images,
})

// ----------------

// Add Review
const rate = {
    rate: Yup.number()
        .required('Please rate the Spot.')
        .min(1, 'Min grade is 1')
        .max(5, 'Max grade is 5'),
}

const comment = {
    comment: Yup.string()
        .required('Please add a comment')
        .trim()
        .min(70, ({ min }) => `Please add at least ${min} characters`)
        .max(800, ({ max }) => `Please add no more than ${max} characters`),
}

export const validRateComment = Yup.object().shape({
    ...rate,
    ...comment,
})

// Add/Change user description

export const validUserDescription = Yup.object().shape({
    description: Yup.string()
        .required('Please add a description')
        .trim()
        .min(40, ({ min }) => `Please add at least ${min} characters`)
        .max(900, ({ max }) => `Please add no more than ${max} characters`),
})
