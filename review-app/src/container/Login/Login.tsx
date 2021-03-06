import React, { useState, useEffect, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import { loginRequest } from './Login.action'


interface Props {
    isAuthenticated: boolean,
    history: any,
    LoginPage: any
}


const LoginPage = (props: Props) => {
    const history = useHistory();

    const dispatch = useDispatch();
    const { isAuthenticated } = props;
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('')

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const submit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(loginRequest(userName, password));


    }


    useEffect(() => {
        const isAuth = props.LoginPage.token;
        // const isAuth = localStorage.getItem('token');

        if (isAuth && isAuthenticated) {
            history.push('/');
        } else {
            history.push('/login')

        }
    }, [isAuthenticated]);


    useEffect(() => {

        const TokenStorage = localStorage.getItem('token');
        if (TokenStorage) {
            history.push('/');
        }
    }, []);


    return (
        <div className="container">
            <div className="min-vh-100 row">
                <div className="col-md-5 m-auto">
                    <form className="p-5 rounded-sm shadow text-center" onSubmit={submit}>
                        <h1 className="text-info">Login </h1>
                        {/* <i className="fas fa-camera"></i> */}
                        <p className="text-muted">Please enter your userName and password!</p>
                        <input
                            type="email"
                            placeholder="Username"

                            onChange={handleUsername}
                            className="form-control form-control-lg mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handlePassword}
                            className="form-control form-control-lg mb-4"
                        />
                        {/* {error && (
                            <div className="mb-3 text-danger text-xl-center">{error}</div>
                        )} */}
                        <button type="submit" className="btn btn-block btn-info btn-lg">
                            Login
            </button>
                    </form>
                </div>
            </div>
        </div>
    )

}

// const dispatchProps = {
//     onLogin: loginRequest,
// };

const mapState = (state: any) => ({
    LoginPage: state.login,
    isAuthenticated: state.home.isAuthenticated
})




export default connect(
    mapState
    // dispatchProps
)(LoginPage);


