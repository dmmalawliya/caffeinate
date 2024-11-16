import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState , useEffect, useContext, createContext} from "react";
import { auth,db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider(props) {
    const { children } = props
    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState(null) 
    const [isLoading, setIsLoading] = useState(false)

   
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function logout(){
        setGlobalUser(null)
        setGlobalData(null)
        return signOut(auth)
    }

    useEffect(() => {
       const unsubscribe= onAuthStateChanged(auth, async (user) => { 

            console.log('CURRENT USER : ',user)
            setGlobalUser(user)

            if(!user) { 
                console.log('Found user data')
                setGlobalUser(null)
                return }

            try{
                setIsLoading(true)
                setGlobalUser(user)

                // first we create reference for that document, then we gete the doc and then we snapshot it to see if anything's there
                const docRef= doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}
                if(docSnap.exists()){
                    console.log('Found user data')
                    firebaseData = docSnap.data()
                }
                setGlobalData(firebaseData)
            }
            catch(err){
                console.log(err.message)
            }
            finally{
                setIsLoading(false)
            }


        })
        return unsubscribe
    },[])

    const value = { globalUser, globalData, setGlobalData, isLoading, signup, login, logout, resetPassword }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}