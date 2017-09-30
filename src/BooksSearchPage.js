import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf  from './Bookshelf'

export class BooksSearchPage extends Component {
  
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  
  render() {

    const { mybooks, onSetSearchPage, onUpdateBookShelf } = this.props
    const { query } = this.state

    let showingBooks

    if (query) {
      showingBooks = BooksAPI.search(query, 20).then((res)=>res)
      let res = showingBooks.then((r)=>r)
      console.log(' r : ', res)      
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
