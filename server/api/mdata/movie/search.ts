//@ts-nocheck file
export default defineEventHandler(async e => {
    let query = getQuery(e);
    const params = new URLSearchParams({
        include_adult: false,
        language: 'en-US',
        page: 1,
        query: query.term,
        api_key: process.env.TMDB_API_KEY
    });

    let res = await fetch(`https://api.themoviedb.org/3/search/movie?${params.toString()}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }        
    });
    
    let data = await res.json();
    return data.results.map(e => {
        e.id = `m_${e.id}`;
        e.poster_path = `https://image.tmdb.org/t/p/w500${e.poster_path}`
        return e;
    });
});