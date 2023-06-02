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
    data.id = `s_${data.id}`;
    data.image = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    data.title = data.name;
    data.type = 'show';
    data.year = data.first_air_date.split('-')[0]

    return data;
});