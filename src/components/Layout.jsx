
import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useAuth } from "../context/Authcontext"


export default function Layout(props) {
    const { children } = props

    const [showModal,setShowModal] = useState(false)

    const { globalUser, logout } = useAuth()

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFEINATE</h1>
                <p>For Coffee Insatiates</p>
            </div>
            {globalUser ? (
                <button onClick={logout}>
                    <p>Logout</p>
                </button>
            ) : (
                <button onClick={() => { setShowModal(true) }}>
                    <p>Sign up free</p>
                    <i className="fa-solid fa-mug-hot"></i>
                </button>
            )}
            
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Track your coffee journey using Caffeinate</span></p>
        </footer>
    )

    return (
        <>
            {showModal && (<Modal handleCloseModal ={() => { setShowModal(false)}}>
                <Authentication/>
            </Modal>)}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}
