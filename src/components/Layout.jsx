
import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"


export default function Layout(props) {
    const { children } = props

    const [showModal,setShowModal] = useState(false)

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFEINATE</h1>
                <p>For Coffee Insatiates</p>
            </div>
            <button onClick={() => {setShowModal(true)}}>
                <p>Sign-Up</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>
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
