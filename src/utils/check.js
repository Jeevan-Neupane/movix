

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzZkZmYwZWM5YWI0ZTM0YWUxNWQ5NDQ4OWRiYTUxMCIsInN1YiI6IjY0OTZhYWM3YjM0NDA5MDEzOTgzZTRiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZKJOgACrcLFisDA5jZJ6XGWr2AZIUanYZpb59wGB80E'
    }
};

fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));