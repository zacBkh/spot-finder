import { useState } from "react"
import { addUserHandler } from "../../utils/APIfetchers";

const Register = ({ }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");


    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log('email', email)
        console.log('password', password)

        const userCreds = { name: name, email: email, password: password };

        addUserHandler(userCreds)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>


                <div>
                    <label>Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@example.com"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>


                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>




                {/*                 <button type="submit">Register with credential</button>
                <button onClick={(e) => registerUser(email, password, e)}>Register</button>
 */}

                <button
                    type="submit"> Register
                </button>
            </form>
        </>
    )
}

export default Register 