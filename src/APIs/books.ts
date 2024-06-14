import { Book, BookResponse } from "../Types/types";

const url  = "https://www.googleapis.com/books/v1/volumes?q=bookname&startIndex=0&maxResults=20";


export const getBooks = () : Promise<BookResponse> => {
    return fetch(url).then(res => res.json())
}