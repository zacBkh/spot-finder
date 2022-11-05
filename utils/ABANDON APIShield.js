import { unstable_getServerSession } from "next-auth/next"
// import { authOptions } from "./auth/[...nextauth]"


const APIShield = async (req, res) => { // Will receive those args
    const session = await unstable_getServerSession(req, res)

    if (!session) {
        return false
    }
    else { return true }
}

export default APIShield