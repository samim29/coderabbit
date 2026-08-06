import React from "react"

const LoadingState = ({ title = "Loading...", subtitle = "Please wait a moment.", compact = false }) => {
    return (
        <div className={`loading-state ${compact ? "loading-state--compact" : ""}`} role="status" aria-live="polite">
            <span className="loading-state__spinner" aria-hidden="true" />
            <div className="loading-state__text">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}

export default LoadingState