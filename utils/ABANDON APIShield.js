import { unstable_getServerSession } from "next-auth/next"
// import { authOptions } from "./auth/[...nextauth]"

// Idea was to have this util we can call everywhere to protect API route instead of putting logic inside each API route I gave up but let's try again


const APIShield = async (req, res) => { // Will receive those args
    const session = await unstable_getServerSession(req, res)

    if (!session) {
        return false
    }
    else { return true }
}

export default APIShield