import React from 'react'
import Bookshelf  from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App2 extends React.Component {
  state = {
    mybooks : [], 
    showSearchPage: false
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }


  componentDidMount() { 
    BooksAPI.getAll().then( (mybooks)=> { 
    	this.setState({mybooks})
  	})
  }

  updateBookShelf = (mybook, shelf) => {
    
    shelf==="currentlyreading" && (shelf="currentlyReading")
    shelf==="wanttoread" && (shelf="wantToRead")
    
    BooksAPI.update(mybook, shelf).then(
    this.setState((state)=>({
        mybooks: state.mybooks.map((bk)=>bk.id === mybook.id ? {...bk, shelf:shelf} : bk)
    })))
  }

  render() {
    
    return (
      <div className="app">
       
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
    	       	  <Bookshelf 
                  mybooks={ this.state.mybooks.filter( 
                   (mybook)=> mybook.shelf.toLowerCase()==="currentlyreading")
                  } 
                  shelfTitle={"Currently Reading"} 
                  onUpdateBookShelf={this.updateBookShelf}
                />
    	       	  <Bookshelf 
                  mybooks={ this.state.mybooks.filter( 
                   (mybook)=> mybook.shelf.toLowerCase()==="wanttoread")
                  } 
                  shelfTitle={"Want To Read"} 
                  onUpdateBookShelf={this.updateBookShelf}
                 />
    	       	  <Bookshelf 
                  mybooks={ this.state.mybooks.filter( 
                   (mybook)=> mybook.shelf.toLowerCase()==="read")
                  } 
                  shelfTitle={"Read"} 
                  onUpdateBookShelf={this.updateBookShelf}
                 />
              </div>
            </div>
            <div className="open-search">
               <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>

        )}
      </div>
    )
  }
}

export default App2
