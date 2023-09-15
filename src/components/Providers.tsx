"use client"
import { Provider } from 'react-redux'
import { store } from "@/redux/store"
import { ReactNode } from 'react'
import { ScrollProgress } from './ScrollProgress/ScrollProgress'
import { ScrollToTop } from './ScrollToTop/ScrollToTop'
import { ToastCustomContainer } from './ToastCustomContainer'
import { Cart } from './Cart/Cart'

export function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <div className="page-wrapper">
                <ScrollProgress />
                {children}
                <ScrollToTop />
            </div>
            <ToastCustomContainer />
            <Cart />
        </Provider>
    )
}
