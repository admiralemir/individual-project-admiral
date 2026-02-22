import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import showError from '../helpers/error'
import http from '../helpers/http'
import Button from '../components/Button'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    if (localStorage.getItem('access_token')) {
        return <Navigate to='/' />
    }

    async function handleGoogleLoginResponse(res) {
        try {
            const response = await http({
                method: 'POST',
                url: '/login/google',
                headers: {
                    token: res.credential
                }
            })

            const data = response.data
            localStorage.setItem('access_token', data.access_token)
            navigate('/')
        } catch (error) {
            showError(error)
        }
    }

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://accounts.google.com/gsi/client"
        script.async = true
        script.defer = true
        document.body.appendChild(script)

        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleGoogleLoginResponse,
                })

                window.google.accounts.id.renderButton(
                    document.getElementById("google-signin-button"),
                    {
                        theme: "outline",
                        size: "large",
                        width: 400,
                        text: "signin_with",
                    },
                )
            }
        }

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script)
            }
        }
    }, [])

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
            }}
        >
            <div
                className="rounded-4 shadow p-5 text-white"
                style={{
                    width: '460px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}
            >
                <h2 className="fw-bold mb-2 text-center">
                    Welcome Back
                </h2>
                <p className="text-center mb-4" style={{ opacity: 0.8 }}>
                    Login to your account
                </p>

                <form
                    onSubmit={async (event) => {
                        event.preventDefault()
                        try {
                            const newLogin = { email, password }

                            const { data } = await http({
                                method: 'POST',
                                url: '/login',
                                data: newLogin
                            })

                            localStorage.setItem('access_token', data.access_token)
                            navigate('/')
                        } catch (error) {
                            showError(error)
                        }
                    }}
                >
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                color: 'white'
                            }}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                color: 'white'
                            }}
                        />
                    </div>

                    <Button type="submit" className="w-100 py-3 fs-6">
                        Log In
                    </Button>
                </form>

                <div className="position-relative my-4">
                    <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                    <span
                        className="position-absolute top-50 start-50 translate-middle px-3"
                        style={{
                            fontSize: '0.9rem',
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            opacity: 0.8
                        }}
                    >
                        OR
                    </span>
                </div>

                <div className="d-flex justify-content-center">
                    <div id="google-signin-button"></div>
                </div>

                <div className="text-center mt-4">
                    <span style={{ opacity: 0.8 }}>
                        Don&apos;t have an account?
                    </span>{' '}
                    <a
                        href="/register"
                        className="fw-semibold text-decoration-none"
                        style={{ color: '#5dade2' }}
                    >
                        Create an account
                    </a>
                </div>
            </div>
        </div>
    )
}