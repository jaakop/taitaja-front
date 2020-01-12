import axios from 'axios';

async function GetSolarData(){
    return(
        await axios.get('https://public.bc.fi/katta/taitaja2020/paneeli.xml').then((res)=>{   
            let parser = new DOMParser();
            let data = parser.parseFromString(res.data, 'text/xml');
            return(data);
        })
    );
}
export default GetSolarData;