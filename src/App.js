import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import MainPage from './pages/Main-Page';
import LoginPage from './pages/Login-Page';

const App = () => {
  let theme = createMuiTheme({
    typography: {
      fontFamily: 'Segoe UI',
    },
    palette: {
      primary: {
        main: '#3A405A',
        contrastText: '#F9DEC9'
      },
      secondary: {
        main: '#99B2DD',
        contrastText: '#F9DEC9'
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route exact path='/' component={MainPage}></Route>
          <Route path='/login' component={LoginPage}></Route>
        </Router>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
