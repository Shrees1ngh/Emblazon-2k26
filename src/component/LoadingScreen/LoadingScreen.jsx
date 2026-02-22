import { useEffect } from 'react'
import { motion } from 'motion/react'
import CircularText from './CircularText'
import logo from '../../assets/fest/logo.svg'
import './LoadingScreen.css'

function LoadingScreen({ appState, setAppState }) {

    useEffect(() => {
        // Trigger fade out on the background, while simultaneously launching the logo to navbar
        const timer = setTimeout(() => {
            setAppState('fading')
            setTimeout(() => {
                setAppState('ready')
            }, 600) // Wait for fade out animation
        }, 2200)

        return () => clearTimeout(timer)
    }, [setAppState])

    return (
        <div className={`loading-screen ${appState === 'fading' ? 'fade-out' : ''}`}>
            <div className="loading-content">
                {/* Outer Circle */}
                <div className="loading-circle-outer">
                    <CircularText
                        text={"EMBLAZON 2K26  •  ".repeat(4)}
                        spinDuration={20}
                        loop={true}
                    />
                </div>

                {/* Inner Circle - HMRITM */}
                <div className="loading-circle-inner">
                    <CircularText
                        text={"HMRITM  •  ".repeat(5)}
                        spinDuration={15}
                        loop={true}
                    />
                </div>

                {/* Center Logo */}
                <div className="loading-center">
                    <div className="loading-logo-wrapper">
                        {appState === 'loading' && (
                            <motion.img
                                layoutId="flight-logo"
                                src={logo}
                                alt="Emblazon Logo"
                                className="loading-logo"
                                transition={{ type: "spring", stiffness: 60, damping: 14, mass: 0.8 }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen
