import axios from "axios";
const sendMove = async (row: number, col: number, move: number) => {
  try {
    const response = await axios.post("https://kattam-kutta-backend.onrender.com/api/logMove", {
      row,
      col,
      move,
    });
    console.log("Move sent!Response:", response.data.termination);
    console.log("response1 data termination not -1", response.data.termination);
    if (response.data.termination === 1) {
      setTimeout(() => alert("Player 1.1 Wins"), 20);
    } else if (response.data.termination === 2) {
      setTimeout(() => alert("Agent Smith.1 Wins"), 20);
    } else if (response.data.termination === 0) {
      setTimeout(() => alert("Khichdhi.1"), 20);
    }
    return response;
  } catch (error: any) {
    console.error("Error sending data:", error.message);
  }
};
export default sendMove;
