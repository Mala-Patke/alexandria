//@ts-nocheck file
export default defineEventHandler(async e => {
    const params = new URLSearchParams({
        language: 'en-US',
        api_key: process.env.TMDB_API_KEY
    });
    let showid = e.context.params.mid.split('_')[1];

    let res = await fetch(`https://api.themoviedb.org/3/tv/${showid}?${params.toString()}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }        
    });
    
    let data = await res.json();
    return data.results.map(e => {
        e.id = `s_${e.id}`;
        e.image = `https://image.tmdb.org/t/p/w500${e.poster_path}`;
        e.title = e.name;
        e.type = 'show';
        e.year = e.first_air_date.split('-')[0]
        return e;
    });
});