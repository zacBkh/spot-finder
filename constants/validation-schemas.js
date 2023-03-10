import * as Yup from 'yup'

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
            'Name must be one word without special character.\n Example: John.',
        )
        .min(3, 'Your name should be at least 3 characters long.')
        .max(18, 'Your name should not exceed 18 characters long.')
        .required('Name is required')
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

// Mail
export const validMail = Yup.object().shape({
    ...mail,
})

// Mail + pwd
export const validMailPwd = Yup.object().shape({
    ...mail,
    ...pwdLogin,
})

// Mail + pwd + name
export const validMailPwdName = Yup.object().shape({
    ...mail,
    ...pwdRegister,
    ...name,
})

// Reset password form
export const doublePwdFieldSchema = Yup.object().shape({
    password: Yup.string()
        .trim()
        .min(6, 'Your password should be at least 6 characters long!')
        .required('Password is required'),

    password2: Yup.string()
        .trim()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

// ----------------

// Add Spot
const title = {
    title: Yup.string()
        .trim()
        .min(6, `The title should be more than 6 characters.`)
        .max(60, `The title should be less than 60 characters.`)
        .required('The title of your Spot is required.'),
}

const description = {
    description: Yup.string()
        .trim()
        .min(15, `The description should be more than 15 characters.`)
        .required('The description of your Spot is required.'),
}

const categories = {
    categories: Yup.array()
        .min(1, 'You must select at least one category for your spot.')
        .required('--You must select at least one category for your spot.'),
}

const coordinates = {
    coordinates: Yup.object({
        Latitude: Yup.number('Latitude must be a number.').required(
            'Please search your Spot or drag the Marker',
        ),
        Longitude: Yup.number('Longitude must be a number.').required(
            'Please search your Spot or drag the Marker',
        ),
    }).required(
        'Please search your Spot with the search bar or click anywhere and drag the Marker',
    ),
}

// Title + Description + Categories
export const validTitleDesc = Yup.object().shape({
    ...title,
    ...description,
    ...categories,
    ...coordinates,
})
