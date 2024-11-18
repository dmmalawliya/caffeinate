import { useState } from 'react'
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useAuth } from '../context/AuthContext'

export default function Layout(props) {
    const { children } = props

    const [showModal, setShowModal] = useState(false)

    const { globalUser, logout } = useAuth()

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEN8</h1>
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
        <footer className='footer-container'>
             <p><span className="text-gradient">Caffienate</span> was made by <a target="_blank" href="https://www.linkedin.com/in/deepshikha-malawliya-447176206/">Deepshikha</a> <br />Check out the project on <a target="_black" href="https://github.com/dmmalawliya/caffeinate">GitHub</a>!</p>
        </footer>
    )

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}