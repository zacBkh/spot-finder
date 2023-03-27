import { useSession } from 'next-auth/react'

//  import { signOut } from 'next-auth/react'

// import { authOptions } from '../api/auth/[...nextauth]'
// import { unstable_getServerSession } from 'next-auth/next'

// import getUserSpot from '../../utils/Users/getUserSpots'

// import { deleteUserHandler as deleteAPIFetcher } from '../../services/mongo-fetchers'
import { getUserData } from '../../services/mongo-fetchers'
const MyProfileNew = () => {
    const { data: session, status } = useSession()

    // const user = await getUserData(session.userID)
    // console.log('user DATA --->', user)
    console.log('user DATA --->')

    // console.log('currentUserSession', currentUserSession)

    // const { email, emailVerified, name, provider, userID, ownedSpots } =
    //     currentUserSession

    // // Will delete the user + his spots (mongoose middleware)
    // const deleteUserHandler = async () => {
    //     console.log('WANT TO DELETE USER...')

    //     // Signing out user and redirect
    //     signOut({ callbackUrl: HOME })

    //     const deleteUser = await deleteAPIFetcher(userID)
    //     console.log('deleteUser', deleteUser)

    //     // For toaster notif
    //     localStorage.setItem('toast', 'deleteUser')
    // }

    return (
        <>
            <h1>Hi, my name is Nicola</h1>
            <h3>Joined in 2014</h3>
            {/* <h1>{name}</h1>
            <h1>{emailVerified ? 'true' : 'false'}</h1>
            <h1>{email}</h1>
            <h1>{provider}</h1>
            <h1>Number of spots: {ownedSpots.length}</h1>
            <h1 onClick={() => signOut()}> Signout </h1>
            <button onClick={deleteUserHandler}> Delete my account</button> */}
        </>
    )
}

export default MyProfileNew
