import axios from "axios";
const getMove = async () => {
  try {
    const response = await axios.get("https://kattam-kutta-backend.onrender.com/api/newMove");
    console.log(
      `Move recieved: row:${response.data.row} col:${response.data.col} tStatus:${response.data.termination}`
    );
    console.log("response2 data termination not -1", response.data.termination);
    if (response.data.termination === 1) {
      setTimeout(() => alert("Player 1.1 Wins"), 20);
    } else if (response.data.termination === 2) {
      setTimeout(() => alert("Agent Smith.1 Wins"), 20);
    } else if (response.data.termination === 0) {
      setTimeout(() => alert("Khichdhi.1"), 20);
    }
    return response;
  } catch (error: any) {
    console.log(error);
  }
};
export default getMove;
