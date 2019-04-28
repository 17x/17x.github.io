import axios from 'axios';

const apiKey = 'JNb95rooODdu61fLPnBXFcQif042UHkt';

export const getBooksList = ({date,list}) => {
  return axios.get(
    `https://api.nytimes.com/svc/books/v3/lists/${date}/${list}.json?api-key=${apiKey}`
  );
};
