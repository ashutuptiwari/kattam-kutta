import axios from "axios";
const sendMove = async (row: number, col: number, move: number) => {
  try {
    const response = await axios.post("http://localhost:5000/api/logMove", {
      row,
      col,
      move,
    });
    console.log('Move sent!Response:',response.data.termination)
    return response;
  } catch (error: any) {
    console.error("Error sending data:", error.message);
  }
};
export default sendMove;
