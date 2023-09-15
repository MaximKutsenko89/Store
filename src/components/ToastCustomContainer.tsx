'use client'
import { ToastContainer, toast } from 'react-toastify'
import { useTheme } from './ThemeSwitcher/ThemeProvider'
import { Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


export const ToastCustomContainer = () => {
    const { theme } = useTheme()
    return (
        <ToastContainer
            position={toast.POSITION.BOTTOM_LEFT}
            autoClose={2000}
            pauseOnHover={true}
            theme={theme}
            pauseOnFocusLoss={true}
            transition={Slide}
        />
    )
}
