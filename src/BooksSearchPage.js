import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf  from './Bookshelf'
import escapeRegExp from 'escape-string-regexp'

export class BooksSearchPage extends Component {
  
  state = {
    query: '',
    searchBooks:[]
  }

  updateQuery = (query) => {
    setTimeout(
    BooksAPI.search(this.query, 20).then((res)=>
    { if (res)
        this.setState({ searchBooks: res })
    }),800)
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  
  render() {

    const { mybooks, onSetSearchPage, onUpdateBookShelf } = this.props
    const { query } = this.state

    let showingBooks
    let ShelfBooksAuthor=[], ShelfBooksTitle=[], NonShelfAuthor=[], NonShelfTitle=[]

    if (query) {
      showingBooks = new Set()
      const match = new RegExp(escapeRegExp(query), 'i')
      console.log('All Books : ', this.searchBooks)
      {/*
      NonShelfTitle = this.allBooks.filter((bk) => match.test(bk.title))
      NonShelfAuthor = this.allBooks.filter((bk) => match.test(bk.authors))
      ShelfBooksTitle = mybooks.filter((bk) => match.test(bk.title))
      ShelfBooksAuthor = mybooks.filter((bk) => match.test(bk.authors))
        */  
      }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={onSetSearchPage}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" 
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results"> 
                {
                  showingBooks && (
                    <Bookshelf 
                      mybooks={mybooks} 
                      onUpdateBookShelf={onUpdateBookShelf}
                    />
                  )
                }
            </div>
        </div>
    )
  }
}

export default BooksSearchPage
