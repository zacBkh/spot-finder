import * as Yup from 'yup'

export const pwdFieldSchema = Yup.object().shape({
    password: Yup.string()
        .trim()
        .min(6, 'Your password should be at least 6 characters long!')
        .required('Password is required'),

    password2: Yup.string()
        .trim()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

// export const pwdFieldSchema2 = {
//     password2: Yup.string()
//         .trim()
//         .required('Please confirm your password')
//         .oneOf([Yup.ref('password'), null], 'Passwords must match'),
// }

//     // Yup Validation Schema
//     const validationSchemaYup = Yup.object().shape({
//         password: Yup.string()
//             .trim()
//             .min(6, 'Your password should be at least 6 characters long!')
//             .required('Password is required'),

//         password2: Yup.string()
//             .trim()
//             .required('Please confirm your password')
//             .oneOf([Yup.ref('password'), null], 'Passwords must match'),
//     })
