//@ts-nocheck file
export default defineEventHandler(async e => {
    let bookid = e.context.params.mid.split('_')[1];
    let res = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookid}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }        
    });
    
    
    let data = await res.json();
    return ({
        id: `b_${data.id}`,
        type: 'book',
        title: data.volumeInfo.title,
        author: data.volumeInfo.authors[0],
        image: data.volumeInfo.imageLinks?.thumbnail || null
    });
});