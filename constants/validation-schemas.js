import * as Yup from 'yup'

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
