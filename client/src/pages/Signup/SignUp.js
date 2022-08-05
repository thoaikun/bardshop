import React from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import clsx from 'clsx'
import UserContext from '../../contexts/UserContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './SignUp.css' 

const SignUp = () => {
    const initailError = {
        username: '',
        email: '',
        password: ''
    }
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')  
    const [formErrors, setFormErrors] = React.useState(initailError)
    const [submit, setSubmit] = React.useState(false)
    const { handleCreate, signupErr, setSignupErr } = React.useContext(UserContext)

    React.useEffect(() => {
        document.title = 'Sign Up'
    }, [])


    React.useEffect(() => {
        if (!signupErr && submit)
            swal({
                title: "congratulations",
                text: "Your account is created",
                icon: "success",
            })
        else if (signupErr && submit)
            swal({
                title: "error",
                text: signupErr,
                icon: "error",
            })
    }, [signupErr, submit])

    const validate = (username, email, password, confirmPassword) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (username === '')
            setFormErrors({...initailError, username: 'Username is required'})
        else {
            if (email === '')
                setFormErrors({...initailError, email: 'Email is required'})
            else if (!regex.test(email))
                setFormErrors({...initailError, email: 'Invalid email format'})
            else {
                if (password === '')
                    setFormErrors({...initailError, password: 'Password is required'})
                else if (password.length > 0  && password.length <= 4)
                    setFormErrors({...initailError, password: 'Password must have at least 5 characters'})
                else {
                    if (confirmPassword === '')
                        setFormErrors({...initailError, password: 'Please enter your password again'})
                    else if (password !== confirmPassword)
                        setFormErrors({...initailError, password: 'Confirm password doesn\'t correct, please check again'})   
                    else {
                        handleCreate(email, password, username)
                        setSubmit(true)
                    }
                }
            }
        }
    }

    return (
        <div className="login-bg">
            <div className="login">
                <form 
                    onSubmit={(e) => e.preventDefault()}
                    className="login__form"
                >
                    <div className="mb-3">
                        <h3 className="mb-2 fs-3 fw-bold"><b>Create account to Bard</b></h3>
                        <label className="form-label">Already have account ?&nbsp;<Link to='/signin'>Sign in</Link></label>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'form-error': formErrors.username === 'Username is required' || signupErr === 'Username had been used'
                            })}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <p className='login-err login-err--red'>{formErrors && formErrors?.username ? formErrors.username : ''}</p>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'form-error': formErrors.email === 'Email had been used' || signupErr === 'Email had been used'
                            })}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className='login-err login-err--red'>{formErrors && formErrors?.email ? formErrors.email : ''}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className={clsx('form-control', {
                                'form-error': formErrors.password === 'Password is required' || formErrors.password === 'Password must have at least 5 characters'
                            })}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className='login-err login-err--red'>{formErrors && formErrors?.password && (formErrors.password === 'Password is required' || formErrors.password === 'Password must have at least 5 characters') ? formErrors.password : ''}</p>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className={clsx('form-control', {
                                'form-error': formErrors.password === 'Please enter your password again' || formErrors.password === 'Confirm password doesn\'t correct, please check again'
                            })}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <p className='login-err login-err--red'>{formErrors && formErrors?.password && (formErrors.password === 'Confirm password doesn\'t correct, please check again' || formErrors.password === 'Please enter your password again') ? formErrors.password : ''}</p>
                    </div>
                    <div
                        className="btn button__submit"
                        onClick={() => {
                            setFormErrors(initailError)
                            setSignupErr(undefined)
                            validate(username, email, password, confirmPassword)
                        }}
                    >
                        Sign up
                    </div>
                </form>
            </div>
        </div>   
    )
}
  
export default SignUp ; 