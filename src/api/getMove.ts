import axios from "axios";
const getMove=async ()=>{
    try
    {
        const response = await axios.get('http://localhost:5000/api/newMove');
        console.log(`Move recieved: row:${response.data.row} col:${response.data.col} tStatus:${response.data.termination}`)
        return response;
    }
    catch(error:any){
        console.log(error);
    }
    

}
export default getMove;