import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

import Footer from '../modules/Footer';

import endPoints from '../config/endPoints.json';
import './styles/mainStyle.css';
import { timeout } from 'q';
import { isCompositeComponent } from 'react-dom/test-utils';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loginFailed: false,
            redirect: false,
            loading: false,
            loginRedirect: false,
            cookieChecked: false
        }
        this.HandleChange = this.HandleChange.bind(this);
        this.Submit = this.Submit.bind(this);
        this.CheckCookie = this.CheckCookie.bind(this);
    }
    componentDidMount() {
        this.CheckCookie();
    }
    render() {
        let loginFailed;
        let redirect;
        let submitButton;

        if (this.state.loginFailed)
            loginFailed = <p>Väärä käyttäjänimi tai salasana</p>
        if (this.state.redirect || this.state.loginRedirect)
            redirect = <Redirect to='/'></Redirect>
        submitButton = <input type='Submit' value='Kirjaudu sisään' disabled={this.state.loading}></input>;
        if (this.state.cookieChecked) {
            return (
                <div>
                    {redirect}
                    <div className='header'>
                        <img src={require('./logos/logoWhite.svg')} width={300}></img>
                    </div>
                    <div className='login'>
                        <form onSubmit={this.Submit}>
                            {loginFailed}
                            <input type='text' placeholder='Käyttäjänimi' value={this.state.username} name='username' onChange={this.HandleChange}></input><br />
                            <input type='password' placeholder='Salasana' value={this.state.password} name='password' onChange={this.HandleChange}></input><br />
                            {submitButton}
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            );

        }
        else {
            return (<div>{redirect}</div>);
        }
    }
    HandleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    async Submit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        const cookies = new Cookies();
        axios.post(endPoints.domain + endPoints.login, {
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            if (res.status === 200) {
                cookies.set('loginToken', res.data.token, { path: '/' });
                this.setState({ redirect: true, loading: false });
            }
            else
                this.setState({ loginFailed: true, loading: false });
        }).catch(() => {
            this.setState({ loginFailed: true, loading: false });
        })
    }
    async CheckCookie() {

        const cookies = new Cookies();
        let token;
        try {
            token = cookies.get('loginToken')
        }
        catch{
            this.setState({ cookieChecked: true });
            return;
        }
        if (!token) {
            this.setState({ cookieChecked: true });
            return;
        }
        await axios.post(endPoints.domain + endPoints.checkToken, {
            token: token
        }).then((res) => {
            if (res.status !== 200)
                this.setState({ cookieChecked: true });
            else
                this.setState({ loginRedirect:true });
        }).catch(() => {
            this.setState({ cookieChecked: true });
            return;
        })

    }
}
export default LoginPage;