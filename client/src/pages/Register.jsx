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
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)"
      }}
    >
      <div
        className="bg-white rounded-4 shadow p-5"
        style={{ width: "480px" }}
      >
        <h2 className="fw-bold mb-2 text-center">
          Create Your Account
        </h2>
        <p className="text-center text-muted mb-4">
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
            />
          </div>

          <Button type="submit" className="w-100 py-3 fs-6">
            Register
          </Button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted">
            Already have an account?
          </span>{" "}
          <a
            href="/login"
            className="fw-semibold text-primary text-decoration-none"
          >
            Login
          </a>
        </div>
      </div>
    </div>
    )
}