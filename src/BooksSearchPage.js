import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf  from './Bookshelf'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'

export class BooksSearchPage extends Component {
  
  state = {
    query: '',
    searchBooks:[],
    showingBooks:[]
  }

  static propTypes = {
    query : PropTypes.string,
    searchBooks : PropTypes.array,
    showingBooks : PropTypes.array
  }

  updateQuery = (q) => {
        this.setState({query:q});
        setTimeout(()=>{
          BooksAPI.search(q, 20).then(
            (res)=> {
              this.setState({ searchBooks: res })
              this.updateShowingBooks(res)
            }
          )      
        },300)
  }

  setShelfNone = (arr) => {
   let newArray = arr.map((obj)=>({...obj,['shelf']:"none"})) 
   return newArray
  }
  makeUniqueArray = (arr) => {
    return [...new Set( arr.map(obj => obj)) ]
  }

  updateShowingBooks = (srchBooks) => {
    let ShelfBooksAuthor=[], ShelfBooksTitle=[], NonShelfAuthor=[], NonShelfTitle=[], mergeBooks=[], mergeBooksShelf=[], mergeBooksNonShelf=[]
    const match = new RegExp(escapeRegExp(this.state.query), 'i')
    if (srchBooks) {
      NonShelfTitle = srchBooks.filter((bk) => match.test(bk.title))
      NonShelfAuthor = srchBooks.filter((bk) => match.test(bk.authors))  
      NonShelfTitle && (mergeBooksNonShelf=mergeBooksNonShelf.concat(NonShelfTitle))
      NonShelfAuthor && (mergeBooksNonShelf=mergeBooksNonShelf.concat(NonShelfAuthor))
    }
    mergeBooksNonShelf = this.setShelfNone(mergeBooksNonShelf)
    ShelfBooksTitle = this.props.mybooks.filter((bk) => match.test(bk.title))
    ShelfBooksAuthor = this.props.mybooks.filter((bk) => match.test(bk.authors))
    ShelfBooksTitle && (mergeBooksShelf=mergeBooksShelf.concat(ShelfBooksTitle))
    ShelfBooksAuthor && (mergeBooksShelf=mergeBooksShelf.concat(ShelfBooksAuthor))
    mergeBooks = mergeBooksShelf.concat(mergeBooksNonShelf)
    mergeBooks = this.makeUniqueArray(mergeBooks)
    this.setState({showingBooks:mergeBooks}) 
  }

  
  render() {

    const onSetSearchPage  = this.props.onSetSearchPage
    const onUpdateBookShelf  = this.props.onUpdateBookShelf
    
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
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results"> 
                {
                  this.state.showingBooks.length>0 && this.state.query.trim().length>0
                  && (
                    <Bookshelf 
                      mybooks={this.state.showingBooks} 
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
