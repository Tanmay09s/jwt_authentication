import axios from 'axios';
export const getRandomJoke = async()=>{
    const response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
    );
    return response.data;
}