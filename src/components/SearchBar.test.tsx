import React, { act } from "react";
import { getAllByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getBooks } from "../APIs/books";
import { BookResponse } from "../Types/types";
import { SearchBar } from "./SearchBar";

// mock API call
jest.mock("../APIs/books");

const mockBooks: BookResponse = {
  items: [
    { volumeInfo: { title: "Master XML" } },
    { volumeInfo: { title: "Data Structures" } },
    { volumeInfo: { title: "Hibernate Recipes" } },
  ],
};

describe("search bar functionalities", () => {
  beforeEach(() => {
    (getBooks as jest.Mock).mockResolvedValue(mockBooks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getBooks API call", async () => {
    const books = await getBooks();

    expect(books.items.length).toBe(3);
  });

  it("search field value change", async () => {
    render(<SearchBar />);

    const searchInput = screen.getByPlaceholderText("books");

    await userEvent.type(searchInput, "test book");

    expect(searchInput).toHaveValue("test book");
  });

  it("display matching results", async () => {
    render(<SearchBar />);

    const searchInput = screen.getByPlaceholderText("books");

    await userEvent.type(searchInput, "master");

    const options = await screen.findAllByRole("listitem");

    expect(options.length).toBe(1);
  });
});
