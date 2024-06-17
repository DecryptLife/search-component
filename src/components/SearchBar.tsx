import React, { useEffect, useState } from "react";
import { getBooks } from "../APIs/books.ts";
import { BookResponse } from "../Types/types.ts";
import useDebounce from "../Hooks/useDebounce.tsx";

export const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [titles, setTitles] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [queryTitles, setQueryTitles] = useState<string[]>([]);

  const changeTitles = (val: string) => {
    if (val) {
      const newTitles = titles.filter((title) =>
        title.toLowerCase().includes(val.toLowerCase())
      );
      setQueryTitles(newTitles);
    } else {
      setQueryTitles([]);
    }
  };

  const debouncedSearch = useDebounce(
    (value: string) => changeTitles(value),
    500,
    {
      trailing: false,
    }
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  const handleSelectChange = (e: React.MouseEvent<HTMLInputElement>) => {
    const value = e.currentTarget.getAttribute("value") || "";
    setSearchText(value);
    setQueryTitles([]);
    setSelectedBook(value);
  };

  useEffect(() => {
    async function fetchBooks() {
      try {
        const results: BookResponse = await getBooks();
        const titles = results.items.map((item) => {
          return item.volumeInfo.title;
        });

        setTitles(titles);
      } catch (e) {
        console.log(e);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="search-container">
      <h1>Search Component</h1>
      <div className="search-inner">
        <input
          placeholder="books"
          onChange={handleSearchChange}
          value={searchText}
          className="search-field"
        />
      </div>
      {queryTitles.length > 0 && (
        <div className="dropdown">
          <ul>
            {queryTitles.map((title, index) => (
              <li
                key={title}
                className="dropdown-item"
                onClick={handleSelectChange}
                value={title}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
