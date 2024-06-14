export interface Book {
    volumeInfo: {
      title: string;
      [key: string]: any; 
    };
    [key: string]: any; 
  }


export interface BookResponse {
    items: Book[];
    [key: string]: any; 
}