// Local host : "development"
// Preview : "preview"
// Prod : "production"

export const whichEnv = () => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.NEXT_PUBLIC_VERCEL_ENV
    } else {
        return process.env.NODE_ENV
    }
}

// Local host : "localhost:3008"
// Preview or prod : e.g --> spot-finder-qnhlrdgnr-zacbkh.vercel.app

export const whichDomain = () => {
    if (process.env.NODE_ENV !== 'development') {
        return process.env.NEXT_PUBLIC_VERCEL_URL
    } else {
        return 'http://localhost:3008'
    }
}
