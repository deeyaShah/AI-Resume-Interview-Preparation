import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/AuthHook'

const Register = () => {

    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({})

    const validatePassword = (password) => {

        if (!password) {
            return 'Password is required'
        }

        if (password.length < 8) {
            return 'Password must be at least 8 characters'
        }

        if (password.length > 30) {
            return 'Password cannot exceed 30 characters'
        }

        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter'
        }

        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one number'
        }

        if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(password)) {
            return 'Password must contain at least one special character'
        }

        return ''
    }
    const validateForm = () => {

        const newErrors = {}

        // Username
        if (!username.trim()) {
            newErrors.username = 'Username is required'
        } else if (username.trim().length < 3) {
            newErrors.username = 'Username must be at least 3 characters'
        } else if (username.trim().length > 30) {
            newErrors.username = 'Username cannot exceed 30 characters'
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        const passwordError = validatePassword(password)

        if (passwordError) {
            newErrors.password = passwordError
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!validateForm()) {
            return
        }

        await handleRegister({
            username: username.trim(),
            email: email.trim(),
            password
        })

        navigate('/login')
    }

    const clearError = (field) => {

        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: ''
            })
        }
    }

    const getPasswordStrength = () => {

        if (!password) {
            return null
        }

        let score = 0

        if (password.length >= 8) score++
        if (/[A-Z]/.test(password)) score++
        if (/[a-z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(password)) score++

        if (score <= 2) {
            return {
                text: 'Weak password',
                width: 'w-1/3'
            }
        }

        if (score <= 4) {
            return {
                text: 'Medium password',
                width: 'w-2/3'
            }
        }

        return {
            text: 'Strong password',
            width: 'w-full'
        }
    }

    const passwordStrength = getPasswordStrength()

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 flex items-center justify-center">

                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-white text-lg">
                        Creating your account...
                    </p>

                </div>

            </main>
        )
    }

    return (
        <main className="min-h-screen bg-linear-to-br from-slate-950 via-cyan-950 to-slate-900 flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md">

                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">

                    <div className="text-center mb-8">

                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cyan-950 flex items-center justify-center">

                            <span className="text-white text-2xl font-bold">
                                AI
                            </span>

                        </div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            Create Account
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Start preparing for your next interview
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >

                        <div>

                            <label
                                htmlFor="username"
                                className="block text-sm font-semibold text-slate-700 mb-2"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={username}
                                autoComplete="username"
                                placeholder="Enter your username"
                                className={`w-full px-4 py-3 rounded-xl border outline-none transition
                                ${
                                    errors.username
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-slate-300 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100'
                                }`}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                    clearError('username')
                                }}
                            />

                            {errors.username && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.username}
                                </p>
                            )}

                        </div>

                        <div>

                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-slate-700 mb-2"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                autoComplete="email"
                                placeholder="Enter your email"
                                className={`w-full px-4 py-3 rounded-xl border outline-none transition
                                ${
                                    errors.email
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-slate-300 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100'
                                }`}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    clearError('email')
                                }}
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.email}
                                </p>
                            )}

                        </div>

                        <div>

                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-slate-700 mb-2"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                autoComplete="new-password"
                                placeholder="Create a strong password"
                                className={`w-full px-4 py-3 rounded-xl border outline-none transition
                                ${
                                    errors.password
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-slate-300 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100'
                                }`}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    clearError('password')
                                }}
                            />

                            {passwordStrength && !errors.password && (
                                <div className="mt-2">

                                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">

                                        <div
                                            className={`h-full bg-cyan-600 transition-all duration-300 ${passwordStrength.width}`}
                                        ></div>

                                    </div>

                                    <p className="text-xs text-slate-500 mt-1">
                                        {passwordStrength.text}
                                    </p>

                                </div>
                            )}

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.password}
                                </p>
                            )}

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-950 hover:bg-cyan-900 text-white font-semibold py-3.5 rounded-xl transition duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Create Account
                        </button>

                    </form>

                    {/* Login */}
                    <p className="text-center text-sm text-slate-500 mt-7">

                        Already have an account?{' '}

                        <Link
                            to="/login"
                            className="font-semibold text-cyan-800 hover:text-cyan-600 transition"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register

