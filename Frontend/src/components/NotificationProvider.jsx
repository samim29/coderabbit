import { createContext, useCallback, useContext, useEffect, useState } from "react"

const NotificationContext = createContext(null)

function getErrorMessage(error) {
    return error?.response?.data?.message
        || error?.response?.data?.error?.message
        || error?.message
        || "Something went wrong. Please try again."
}

export const NotificationProvider = ({ children }) => {
    const [ notification, setNotification ] = useState(null)

    const showError = useCallback((error) => {
        setNotification({ id: Date.now(), message: getErrorMessage(error) })
    }, [])

    const dismissNotification = useCallback(() => setNotification(null), [])

    useEffect(() => {
        if (!notification) return undefined

        const timeoutId = window.setTimeout(dismissNotification, 6000)
        return () => window.clearTimeout(timeoutId)
    }, [ notification, dismissNotification ])

    return (
        <NotificationContext.Provider value={{ showError }}>
            {children}
            {notification && (
                <div className="notification" role="alert" aria-live="assertive">
                    <div>
                        <strong>Something went wrong</strong>
                        <p>{notification.message}</p>
                    </div>
                    <button type="button" onClick={dismissNotification} aria-label="Dismiss error notification">×</button>
                </div>
            )}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)

    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider")
    }

    return context
}
