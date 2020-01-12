import React from 'react';

import GetSolarData from '../content/SolarData';
import Computerdata from '../content/Computers.json';

class Solar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            panels: []
        }

        this.GetData = this.GetData.bind(this);

        this.GetData();
    }
    render() {
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
                solarTable.push(<table className='solarTable' align='center'>
                    <tbody>
                        <tr>
                            <th colSpan={5}>Päivämäärä {panels[0].getElementsByTagName('pvm_' + day)[0].innerHTML}, paistetta keskimäärin {shineAmount} tuntia/paneeli</th>
                        </tr>
                        <tr>
                            <td>Paneelit 1-{panels.length}</td>
                            <td>Tuotanto kWh</td>
                            <td>Tietokoneiden  kulutus kWh</td>
                            <td>Aurinkovoiman kattama %-osuus</td>
                            <td>Verkkovirran %-osuus</td>
                        </tr>
                        <tr>
                            <td>Yhteensä</td>
                            <td>{powerAMount}</td>
                            <td>{computerUsage}</td>
                            <td>{solarCapacity}</td>
                            <td>{gridCapacity}</td>
                        </tr>
                    </tbody>
                </table>);
            }
        }
        return (
            <div className='solar contentBox'>
                <h2>Aurinkopaneelien tuotanto</h2>
                <div>
                {solarTable}
                </div>
            </div>
        );
    }
    async GetData() {
        let data = await GetSolarData();
        this.setState({ panels: data.getElementsByTagName('paneeli') });
    }
}
export default Solar;