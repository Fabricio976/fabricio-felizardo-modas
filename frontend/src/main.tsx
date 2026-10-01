import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from "./context/CartContext"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <App />
                <Toaster />
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>,
)