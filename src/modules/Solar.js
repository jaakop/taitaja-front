import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import GetSolarData from '../content/SolarData';
import Computerdata from '../content/Computers.json';

class Solar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            panels: []
        }

        this.GeStyledTableCellata = this.GeStyledTableCellata.bind(this);

        this.GeStyledTableCellata();
    }
    render() {
        const StyledTableCell = withStyles(theme => ({
            head: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
            },  
            body: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
            }
        }))(TableCell);

        let panels = this.state.panels;
        let solarTable = [];

        if (panels.length > 0) {
            let computerUsage = (Computerdata.PcAmount * Computerdata.PcUsage * 6) + (Computerdata.MacAmount * Computerdata.MacUsage * 6) + (Computerdata.ChromeAmount * Computerdata.ChromeUsage * 6);
            for (let day = 1; day < 3; day++) {
                let powerAMount = 0;
                let shineAmount = 0;
                let solarCapacity = 100;
                let gridCapacity = 0;
                for (let i = 0; i < panels.length; i++) {
                    powerAMount += parseInt(panels[i].getElementsByTagName('tuotanto_' + day)[0].innerHTML);
                    shineAmount += parseInt(panels[i].getElementsByTagName('paiste_' + day)[0].innerHTML)
                }
                shineAmount = shineAmount / panels.length;
                if (powerAMount < computerUsage) {
                    solarCapacity = Math.round((powerAMount / computerUsage) * 100);
                    gridCapacity = 100 - solarCapacity;
                }
                solarTable.push(
                    <TableContainer component={Paper} className='marginTop marginBottom'>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{maxWidth:'100%'}} colSpan={5}>Päivämäärä {panels[0].getElementsByTagName('pvm_' + day)[0].innerHTML}, paistetta keskimäärin {shineAmount} tuntia/paneeli</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <StyledTableCell>Paneelit 1-{panels.length}</StyledTableCell>
                                    <StyledTableCell>Tuotanto kWh</StyledTableCell>
                                    <StyledTableCell>Tietokoneiden  kulutus kWh</StyledTableCell>
                                    <StyledTableCell>Aurinkovoiman kattama %-osuus</StyledTableCell>
                                    <StyledTableCell>Verkkovirran %-osuus</StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell>Yhteensä</StyledTableCell>
                                    <StyledTableCell>{powerAMount}</StyledTableCell>
                                    <StyledTableCell>{computerUsage}</StyledTableCell>
                                    <StyledTableCell>{solarCapacity}</StyledTableCell>
                                    <StyledTableCell>{gridCapacity}</StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>);
            }
        }
        return (
            <Container fixed>
                <Box color='primary.contrastText' component='h2' display='inline' className='paddingTop paddingBottom paddingLeft paddingRight'>Aurinkopaneelien tuotanto</Box>
                <Container>
                    {solarTable}
                </Container>
            </Container>

        );
    }
    async GeStyledTableCellata() {
        let data = await GetSolarData();
        this.setState({ panels: data.getElementsByTagName('paneeli') });
    }
}
export default Solar;