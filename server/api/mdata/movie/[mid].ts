//@ts-nocheck file
export default defineEventHandler(async e => {
    const params = new URLSearchParams({
        language: 'en-US',
        api_key: process.env.TMDB_API_KEY
    });
    let movieid = e.context.params.mid.split('_')[1];

    let res = await fetch(`https://api.themoviedb.org/3/movie/${movieid}?${params.toString()}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }        
    });
    
    let data = await res.json();
    data.id = `m_${data.id}`;
    data.image = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    data.type = 'movie';
    data.year = data.release_date.split('-')[0];

    return data;
});