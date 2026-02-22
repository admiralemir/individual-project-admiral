// Membuat page register
import { Navigate, useNavigate } from 'react-router'
import showError from '../helpers/error'
import http from '../helpers/http'
import { useState } from 'react'
import Button from '../components/Button'

export default function Register(props) {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleForm = (event) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await http({
                method: 'POST',
                url: '/register',
                data: form
            })

            console.log(data)
            navigate('/login')

        } catch (error) {
            showError(error)
        }
    }

    return (
        <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"
      }}
    >
      <div
        className="rounded-4 shadow p-5 text-white"
        style={{
          width: "480px",
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <h2 className="fw-bold mb-2 text-center">
          Create Your Account
        </h2>
        <p className="text-center mb-4" style={{ opacity: 0.8 }}>
          Internal Car Borrowing System
        </p>

        <form onSubmit={handleSubmit} onChange={handleForm}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className="form-control form-control-lg"
              placeholder="Enter your full name"
              value={form.fullName}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white'
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={form.email}
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
              name="password"
              className="form-control form-control-lg"
              placeholder="Enter your password"
              value={form.password}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white'
              }}
            />
          </div>

          <Button type="submit" className="w-100 py-3 fs-6">
            Register
          </Button>
        </form>

        <div className="text-center mt-4">
          <span style={{ opacity: 0.8 }}>
            Already have an account?
          </span>{" "}
          <a
            href="/login"
            className="fw-semibold text-decoration-none"
            style={{ color: '#5dade2' }}
          >
            Login
          </a>
        </div>
      </div>
    </div>
    )
}