import React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ComputerData from '../content/Computers.json';
import { Container, Grid } from '@material-ui/core';

class ComOp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optimized: false,
            floor: 1
        }

        this.GetRoomByNumber = this.GetRoomByNumber.bind(this);
        this.RenderAFloor = this.RenderAFloor.bind(this);
        this.UpdateFloor = this.UpdateFloor.bind(this);
    }
    render() {
        let leftDisable = false;
        let rightDisable = false;
        let changeButton = <Button color='primary'size='large' variant='contained' onClick={(e) => this.setState({ optimized: true })}>Optimoi</Button>;

        if (this.state.floor === 1)
            leftDisable = true;
        if (this.state.floor === 2)
            rightDisable = true
        if (this.state.optimized)
            changeButton = <Button color='primary' variant='contained' size='large' onClick={(e) => this.setState({ optimized: false })}>Palauta</Button>
        
        return (
            <Container fixed className='marginBottom'>
                <h2>Luokkien tietokoneet</h2>
                <Grid container direction='row' spacing={3} alignItems='center' justify='center'>
                    <Button color='primary' variant='contained' size='large' onClick={(e) => this.UpdateFloor(e, -1)} disabled={leftDisable}>{'<'}</Button>
                    <TableContainer style={{overflowY:'hidden', maxWidth: 500}} component={Paper} align='center'>
                        <Table>
                            {this.RenderAFloor(this.state.floor)}
                        </Table>
                    </TableContainer>
                    <Button color='primary' variant='contained' size='large' onClick={(e) => this.UpdateFloor(e, 1)} disabled={rightDisable}>{'>'}</Button>
                </Grid>
                <br/>
                {changeButton}
            </Container>
        );
    }
    UpdateFloor(event, number) {
        this.setState({ floor: this.state.floor + number })
    }
    GetRoomByNumber(number) {
        let roomSetup = ComputerData.Rooms.NormalSetup;
        let room = null;
        if (this.state.optimized)
            roomSetup = ComputerData.Rooms.AiSetup
        roomSetup.map(_room => {
            if (_room.RoomNumber == number) {
                room = _room;
                return;
            }
        })
        return (room);
    }
    RenderAFloor(floorNumber) {
        let render = [];
        if (floorNumber === 1) {
            render.push(<TableRow className='comOpRow'>
                        <TableCell align='center' className={this.GetRoomByNumber(15).ComputerType} rowSpan={2}>15 <br/> {this.GetRoomByNumber(15).ComputerType}<br/>{this.GetRoomByNumber(15).Amount} kpl</TableCell>
                        <TableCell align='center' className={this.GetRoomByNumber(14).ComputerType}>14 <br/> {this.GetRoomByNumber(14).ComputerType}<br/>{this.GetRoomByNumber(14).Amount} kpl</TableCell>
                        <TableCell align='center' className={this.GetRoomByNumber(13).ComputerType}>13 <br/> {this.GetRoomByNumber(13).ComputerType}<br/>{this.GetRoomByNumber(13).Amount} kpl</TableCell>
                        <TableCell align='center' className={this.GetRoomByNumber(12).ComputerType}>12 <br/> {this.GetRoomByNumber(12).ComputerType}<br/>{this.GetRoomByNumber(12).Amount} kpl</TableCell>
                        <TableCell align='center' className={this.GetRoomByNumber(11).ComputerType}>11 <br/> {this.GetRoomByNumber(11).ComputerType}<br/>{this.GetRoomByNumber(11).Amount} kpl</TableCell>
                    </TableRow>) 
                    render.push(<TableRow className='comOpRow'>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell></TableRow>)
                    render.push(<TableRow className='comOpRow'>
                        <TableCell align='center' className={this.GetRoomByNumber(16).ComputerType} rowSpan={2}>16 <br/> {this.GetRoomByNumber(16).ComputerType}<br/>{this.GetRoomByNumber(16).Amount} kpl</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell></TableRow>)
                    render.push(<TableRow className='comOpRow'>
                        <TableCell align='center' className={this.GetRoomByNumber(17).ComputerType}>17 <br/> {this.GetRoomByNumber(17).ComputerType}<br/>{this.GetRoomByNumber(17).Amount} kpl</TableCell>
                        <TableCell align='center' className={this.GetRoomByNumber(18).ComputerType}>18 <br/> {this.GetRoomByNumber(18).ComputerType}<br/>{this.GetRoomByNumber(18).Amount} kpl</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>)
        }
        else if (floorNumber === 2) {
            render.push(
                    <TableRow className='comOpRow'>
                        <TableCell align='center' className={this.GetRoomByNumber(25).ComputerType} rowSpan={2}>25 <br/> {this.GetRoomByNumber(25).ComputerType}<br/>{this.GetRoomByNumber(25).Amount} kpl</TableCell>
                        <TableCell align='center' className={this.GetRoomByNumber(24).ComputerType}>24 <br/> {this.GetRoomByNumber(24).ComputerType}<br/>{this.GetRoomByNumber(24).Amount} kpl</TableCell>
                        <TableCell align='center' className={this.GetRoomByNumber(23).ComputerType}>23 <br/> {this.GetRoomByNumber(23).ComputerType}<br/>{this.GetRoomByNumber(23).Amount} kpl</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>)
                    render.push(<TableRow className='comOpRow'>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell></TableRow>)
                    render.push(<TableRow className='comOpRow'>
                        <TableCell align='center' className={this.GetRoomByNumber(26).ComputerType} rowSpan={2}>26 <br/> {this.GetRoomByNumber(26).ComputerType}<br/>{this.GetRoomByNumber(26).Amount} kpl</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell></TableRow>)
                    render.push(<TableRow className='comOpRow'>
                        <TableCell align='center' className={this.GetRoomByNumber(27).ComputerType}>27 <br/> {this.GetRoomByNumber(27).ComputerType}<br/>{this.GetRoomByNumber(27).Amount} kpl</TableCell>
                        <TableCell align='center' className={this.GetRoomByNumber(28).ComputerType}>28 <br/> {this.GetRoomByNumber(28).ComputerType}<br/>{this.GetRoomByNumber(28).Amount} kpl</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>)
        }
        return render
    }
}
export default ComOp;