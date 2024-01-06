import axios from "axios";
const sendBot = async (f: number) => {
  try {
    const response = await axios.post("https://kattam-kutta-backend.onrender.com/api/setFile", {
      f,
    });
    console.log("Bot sent!", response.data);
    return response;
  } catch (error: any) {
    console.error("Error sending data:", error.message);
  }
};
export default sendBot;
