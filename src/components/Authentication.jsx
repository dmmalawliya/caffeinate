import { useState } from "react";
import { useAuth } from "../context/Authcontext";


export default function Authentication(props) {
    const {handleCloseModal} = props
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const {signup, login} = useAuth()

    async function handleAuthenticate(){
        if(!email || !email.includes('@')|| !password || password.length < 6 || isAuthenticating)
        {
            return
        }
        
        try{
            setIsAuthenticating(true)

            if(isRegistration)
            {
                await signup(email, password)
            }
            else
            {
                await login(email, password)
            }
            handleCloseModal()
        }

        catch(err){
            console.log(err.message)
        }
        finally{
            setIsAuthenticating(false)
        }
    }

    return (
        <>
            <h2 className="sign-up-text">{isRegistration ? 'Sign Up' : 'Login'}</h2>
            <p>{isRegistration?'Create an account': 'Sign in to your account!'}</p>
            
                <input  value={email} onChange={ (e) => { setEmail(e.target.value) } } placeholder="Email" type="email" required />
                <input value= {password} onChange={(e) => {setPassword(e.target.value) } }placeholder="**********" type="password" required />
                <button onClick={handleAuthenticate}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
                <hr />
                <div className="register content" >
                <p>{isRegistration ? 'Already have an account?' :'Don\'t have an account?'}</p>
                <button onClick={() => {setIsRegistration(!isRegistration)}}>
                    <p>{isRegistration ? 'Sign in' : 'Sign up' }</p>
                </button>
            </div>
        </>
    );
}












// export default function Authentication() {
//     return (
//         <>
//             <h2>Sign Up / Login</h2>
//             <p>Sign in to your account!</p>
//             <form>
//                 <input placeholder="Email" type="email" required />
//                 <input placeholder="Password" type="password" required />
//                 <button type="submit">Sign In</button>
//             </form>
//             <hr />
//             <div className="register content">
//                 <p>Don&apos;t have an account?</p>
//                 <button>
//                     <p>Sign Up</p>
//                 </button>
//             </div>
//         </>
//     );
// }
