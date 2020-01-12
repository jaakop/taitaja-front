import React from 'react';

import ComputerData from '../content/Computers.json';

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
        let changeButton = <button onClick={(e) => this.setState({ optimized: true })}>Optimoi</button>;
        if (this.state.floor === 1)
            leftDisable = true;
        if (this.state.floor === 2)
            rightDisable = true
        if (this.state.optimized)
            changeButton = <button onClick={(e) => this.setState({ optimized: false })}>Palauta</button>
        return (
            <div className='comOp contentBox'>
                <h2>Luokkien tietokoneet</h2>
                <div>
                    <button onClick={(e) => this.UpdateFloor(e, -1)} disabled={leftDisable}>{'<'}</button>
                    {this.RenderAFloor(this.state.floor)}
                    <button onClick={(e) => this.UpdateFloor(e, 1)} disabled={rightDisable}>{'>'}</button>
                </div>
                <br/>
                {changeButton}
            </div>
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
        let render;
        if (floorNumber === 1) {
            render = <table className='computerTable'>
                <tbody>
                    <tr>
                        <td className={this.GetRoomByNumber(15).ComputerType} rowSpan={2}>15 <br/> {this.GetRoomByNumber(15).ComputerType}<br/>{this.GetRoomByNumber(15).Amount} kpl</td>
                        <td className={this.GetRoomByNumber(14).ComputerType}>14 <br/> {this.GetRoomByNumber(14).ComputerType}<br/>{this.GetRoomByNumber(14).Amount} kpl</td>
                        <td className={this.GetRoomByNumber(13).ComputerType}>13 <br/> {this.GetRoomByNumber(13).ComputerType}<br/>{this.GetRoomByNumber(13).Amount} kpl</td>
                        <td className={this.GetRoomByNumber(12).ComputerType}>12 <br/> {this.GetRoomByNumber(12).ComputerType}<br/>{this.GetRoomByNumber(12).Amount} kpl</td>
                        <td className={this.GetRoomByNumber(11).ComputerType}>11 <br/> {this.GetRoomByNumber(11).ComputerType}<br/>{this.GetRoomByNumber(11).Amount} kpl</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td></tr>
                    <tr>
                        <td className={this.GetRoomByNumber(16).ComputerType} rowSpan={2}>16 <br/> {this.GetRoomByNumber(16).ComputerType}<br/>{this.GetRoomByNumber(16).Amount} kpl</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td></tr>
                    <tr>
                        <td className={this.GetRoomByNumber(17).ComputerType}>17 <br/> {this.GetRoomByNumber(17).ComputerType}<br/>{this.GetRoomByNumber(17).Amount} kpl</td>
                        <td className={this.GetRoomByNumber(18).ComputerType}>18 <br/> {this.GetRoomByNumber(18).ComputerType}<br/>{this.GetRoomByNumber(18).Amount} kpl</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        }
        else if (floorNumber === 2) {
            render = <table className='computerTable'>
                <tbody>
                    <tr>
                        <td className={this.GetRoomByNumber(25).ComputerType} rowSpan={2}>25 <br/> {this.GetRoomByNumber(25).ComputerType}<br/>{this.GetRoomByNumber(25).Amount} kpl</td>
                        <td className={this.GetRoomByNumber(24).ComputerType}>24 <br/> {this.GetRoomByNumber(24).ComputerType}<br/>{this.GetRoomByNumber(24).Amount} kpl</td>
                        <td className={this.GetRoomByNumber(23).ComputerType}>23 <br/> {this.GetRoomByNumber(23).ComputerType}<br/>{this.GetRoomByNumber(23).Amount} kpl</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td></tr>
                    <tr>
                        <td className={this.GetRoomByNumber(26).ComputerType} rowSpan={2}>26 <br/> {this.GetRoomByNumber(26).ComputerType}<br/>{this.GetRoomByNumber(26).Amount} kpl</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td></tr>
                    <tr>
                        <td className={this.GetRoomByNumber(27).ComputerType}>27 <br/> {this.GetRoomByNumber(27).ComputerType}<br/>{this.GetRoomByNumber(27).Amount} kpl</td>
                        <td className={this.GetRoomByNumber(28).ComputerType}>28 <br/> {this.GetRoomByNumber(28).ComputerType}<br/>{this.GetRoomByNumber(28).Amount} kpl</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        }
        return render
    }
}
export default ComOp;