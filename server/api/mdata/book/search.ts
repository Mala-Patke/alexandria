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
        return ({
            id: `b_${e.id}`,
            type: 'book',
            title: e.volumeInfo.title,
            author: e.volumeInfo.authors ? e.volumeInfo.authors[0] : '',
            image: e.volumeInfo.imageLinks?.thumbnail || null
        });
    });
});