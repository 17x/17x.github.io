import axios from 'axios';

const apiKey = 'XHrXHYMzpbXmnaIn41jCx2Gh7dPITlei';

export const getBooksList = ({date,list}) => {
  return axios.get(
    `https://api.nytimes.com/svc/books/v3/lists/${date}/${list}.json?api-key=${apiKey}`
  );
};
