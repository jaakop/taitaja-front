import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Solar from '../modules/Solar';
import ComOp from '../modules/ComOp';
import Footer from '../modules/Footer';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {styled} from '@material-ui/styles';

import endPoints from '../config/endPoints.json';

import { removeTypeDuplicates } from '@babel/types';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginRedirect: false,
            cookieChecked: false
        }
        this.CheckCookie = this.CheckCookie.bind(this);
    }
    componentDidMount(){
        this.CheckCookie();
    }
    render() {
        const StyledPaper = styled(Paper)`
            background-color: ${props => this.props.theme.palette.secondary.main}
        `;
        let loginRedirect;
        if (this.state.loginRedirect)
            loginRedirect = <Redirect to='/login'></Redirect>
        if (this.state.cookieChecked) {
            return (
                <div className='main'>
                    {loginRedirect}
                    <div className='header'>
                        <img src={require('./logos/logoWhite.svg')} width={300}></img>
                        <br />
                        <div className='info'>Tietoja
                        <div className='megaMenu'>
                                <a className='link'> Link 1 </a>
                                <a className='link'> Link 2 </a>
                                <a className='link'> Link 3 </a>
                                <a className='link'> Link 4 </a>
                                <a className='link'> Link 5 </a>
                                <a className='link'> Link 6 </a>
                            </div>
                        </div>

                    </div>
                    <div>
                        <StyledPaper component={Box} display='block' className='content' bgcolor='secondary.main' border={5} borderColor='secondary.contrastText' borderRadius={25}>
                            <Solar></Solar>
                        </StyledPaper>
                        <StyledPaper component={Box} display='block' className='content' bgcolor='secondary.main' border={5} borderColor='secondary.contrastText' borderRadius={25}>
                            <ComOp></ComOp>
                        </StyledPaper>
                    </div>
                    <Footer></Footer>
                </div>
            );

        }
        else{
            return(<div>{loginRedirect}</div>);
        }
    }
    async CheckCookie(){
        
        const cookies = new Cookies();
        let token;
        try{
            token = cookies.get('loginToken')
        }
        catch{
            this.setState({loginRedirect: true});
            return;
        }
        if(!token){
            this.setState({loginRedirect: true});
            return;
        }
        await axios.post(endPoints.domain + endPoints.checkToken, {
            token: token
        }).then((res) => {
            if(res.status !== 200)
                this.setState({loginRedirect: true});
            else
                this.setState({cookieChecked: true});
        }).catch(() => {
            console.log('ree');
            this.setState({loginRedirect: true});
            return;
        })
    
    }
}
export default MainPage;