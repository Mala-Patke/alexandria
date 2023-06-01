//@ts-nocheck file
export default defineEventHandler(async e => {
    let query = getQuery(e);
    const params = new URLSearchParams({
        q: query.term
    });

    let res = await fetch(`https://www.googleapis.com/books/v1/volumes?${params.toString()}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }        
    });
    
    let data = await res.json();
    return data.items.map(e => {
        e.id = `b_${e.id}`;
        return e;
    });
});