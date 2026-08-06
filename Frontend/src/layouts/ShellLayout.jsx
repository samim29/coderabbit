import { Link, NavLink, Outlet, useLocation } from "react-router"
import { useAuth } from "../features/auth/hooks/useAuth"

const ShellLayout = () => {
    const { user, handleLogout } = useAuth()
    const location = useLocation()

    const isAuthRoute = location.pathname.startsWith("/login") || location.pathname.startsWith("/register")
    const isAppRoute = location.pathname.startsWith("/app")

    const onLogout = async () => {
        await handleLogout()
    }

    return (
        <div className="site-shell">
            <header className="site-header">
                <div className="site-header__inner">
                    <Link to="/" className="site-brand" aria-label="CodeRabbit Interview home">
                        <span className="site-brand__mark">CR</span>
                        <span>
                            <strong>CodeRabbit</strong>
                            <small>Interview AI</small>
                        </span>
                    </Link>

                    <nav className="site-nav" aria-label="Primary">
                        {isAuthRoute ? (
                            <>
                                <Link to="/" className="site-nav__link">Home</Link>
                                {!user && <Link to="/app" className="site-nav__link">Dashboard</Link>}
                            </>
                        ) : isAppRoute ? (
                            <>
                                <NavLink to="/app" end className={({ isActive }) => `site-nav__link ${isActive ? "site-nav__link--active" : ""}`}>
                                    Dashboard
                                </NavLink>
                                <Link to="/" className="site-nav__link">Home</Link>
                            </>
                        ) : (
                            <>
                                <NavLink to="/" end className={({ isActive }) => `site-nav__link ${isActive ? "site-nav__link--active" : ""}`}>
                                    Home
                                </NavLink>
                                <NavLink to="/app" className={({ isActive }) => `site-nav__link ${isActive ? "site-nav__link--active" : ""}`}>
                                    Dashboard
                                </NavLink>
                            </>
                        )}
                    </nav>

                    <div className="site-actions">
                        {user ? (
                            <>
                                <span className="site-user">{user.username || user.email}</span>
                                <button type="button" className="button primary-button site-actions__logout" onClick={onLogout}>
                                    Logout
                                </button>
                            </>
                        ) : isAuthRoute ? (
                            <Link to="/register" className="button primary-button site-actions__cta">
                                Sign up
                            </Link>
                        ) : (
                            <Link to="/login" className="button primary-button site-actions__cta">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <main className="site-main">
                <Outlet />
            </main>

            <footer className="site-footer">
                <div className="site-footer__inner">
                    <p>CodeRabbit Interview helps you turn job descriptions into a focused practice plan.</p>
                </div>
            </footer>
        </div>
    )
}

export default ShellLayout