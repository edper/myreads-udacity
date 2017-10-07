import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BooksShelf  from './BooksShelf'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'

// Component for Book Search page or the book library search
export class BooksSearchPage extends Component {
  
  // State for query by the user, search books and books to show in the list
  state = {
    query: '', // Query
    searchBooks:[], // Search Books that could have duplicates
    showingBooks:[] // Books shown to user on screen after query
  };

  // Proptypes for BooksSearchPage component to use
  static propTypes = {
    onAddBookToShelf: PropTypes.func.isRequired
  };

  /**
  * @description Update display based on query for books from the library
  * @param {string} q - The query or the string typed by the user
  */
  updateQuery = (q) => {
        this.setState({query:q});
        // Put timeout in a search so as not to overwhelmed the system
        setTimeout(()=>{
          BooksAPI.search(q, 20).then(
            (res)=> {
              this.setState({ searchBooks: res }); // Update searchBooks state based on result
              this.updateShowingBooks(res); // Update what books to show based on results
            }
          )      
        },200);
  };

  /**
  * @description Create a field named shelf and set initial value to 'none'
  * @param {array} arr - Array for the books search from the library
  * @returns {array} newArray - Return books with shelf field with initial value 'none' 
  */
  setShelfNone = (arr) => {
   let newArray = arr.map((obj)=>({...obj,'shelf':"none"})) 
   return newArray;
  };

  /**
  * @description Remove duplicates from books array since it is a merger between library and shelf books
  * @param {array} arr - Array for the books search from the library
  * @returns {array} <value> - Return unique array of books
  */
  makeUniqueArray = (arr) => {    
    return arr.filter((el, index) => 
      arr.findIndex(a => a['id'] === el['id']) === index);
  };

  /**
  * @description Update books to be shown based on the query from the user
  * @param {array} srchBooks - Array of books from query (with possible duplicates)
  */
  updateShowingBooks = (srchBooks) => {
    // Initialize arrays needed for the operation
    let ShelfBooksAuthor=[], ShelfBooksTitle=[], NonShelfAuthor=[], 
        NonShelfTitle=[], mergeBooks=[], mergeBooksShelf=[], mergeBooksNonShelf=[];
    // Do regular expression based on query by the user
    const match = new RegExp(escapeRegExp(this.state.query), 'i');
    // if there are books to show
    if (srchBooks.length>0) {
      // Filter Library books (Non-Shelf books) according to Title or Author
      NonShelfTitle = srchBooks.filter((bk) => match.test(bk.title));
      NonShelfAuthor = srchBooks.filter((bk) => match.test(bk.authors));
      // Merge search Library books
      NonShelfTitle && (mergeBooksNonShelf=mergeBooksNonShelf.concat(NonShelfTitle));
      NonShelfAuthor && (mergeBooksNonShelf=mergeBooksNonShelf.concat(NonShelfAuthor));
    }
    // Set shelf value to none first for each book search
    mergeBooksNonShelf = this.setShelfNone(mergeBooksNonShelf);
    // Filter Shelves books according to Title or Author
    ShelfBooksTitle = this.props.books.filter((bk) => match.test(bk.title));
    ShelfBooksAuthor = this.props.books.filter((bk) => match.test(bk.authors));
    // Merge Shelves books
    ShelfBooksTitle && (mergeBooksShelf=mergeBooksShelf.concat(ShelfBooksTitle));
    ShelfBooksAuthor && (mergeBooksShelf=mergeBooksShelf.concat(ShelfBooksAuthor));
    // Merge All books
    mergeBooks = mergeBooksShelf.concat(mergeBooksNonShelf);
    // Make sure no duplicate in the search books
    mergeBooks = this.makeUniqueArray(mergeBooks);
    // Change state for books to be shown so UI could be triggered
    this.setState({showingBooks:mergeBooks});
  }

  
  render() {

    const onSetSearchPage  = this.props.onSetSearchPage;
    const onAddBookToShelf  = this.props.onAddBookToShelf;
  
    return (
        <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={onSetSearchPage}>Close</a>
              <div className="search-books-input-wrapper">
                {
                  // User Input area for book search 
                  <input type="text" 
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => {this.updateQuery(event.target.value); 
                      this.makeUniqueArray(this.props.books.concat(this.state.showingBooks));}}
                  />
                }
              </div>
            </div>
            <div className="search-books-results"> 
                {
                  // if there are books to show based on query display it
                  this.state.showingBooks.length>0 && this.state.query.trim().length>0
                  && (
                    <BooksShelf 
                      books={this.state.showingBooks} 
                      onUpdateBookShelf={onAddBookToShelf}
                    />
                  )
                }
            </div>
        </div>
    );
  }
}

export default BooksSearchPage;
