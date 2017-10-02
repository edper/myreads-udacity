import React from 'react'
import { Route, Redirect }  from 'react-router-dom'
import BooksList  from './BooksList'
import BooksSearch  from './BooksSearch'
import BooksSearchPage  from './BooksSearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends React.Component {

  state = {
    mybooks : [], 
    showSearchPage: false
  }

  componentDidMount() { 
    BooksAPI.getAll().then( (mybooks)=> { 
    	this.setState({mybooks})
  	})
  }

  toCamelShelf(Shelf) {
    if (Shelf==="currentlyreading") return "currentlyReading"
    if (Shelf==="wanttoread") return "wantToRead"
    return Shelf
  }

  updateBookShelf = (mybook, shelf) => {
    shelf=this.toCamelShelf(shelf)
    BooksAPI.update(mybook, shelf).then(
    this.setState((state)=>({
        mybooks: state.mybooks.map((bk)=>bk.id === mybook.id ? {...bk, shelf:shelf} : bk)
    })))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Route path='/search' render={({history})=>(
            <BooksSearchPage mybooks={this.state.mybooks} onSetSearchPage={
                ()=>{ this.setState({showSearchPage:false})
                  history.push('/')}}
                  onUpdateBookShelf={this.updateBookShelf}
                  />
          )} />           
        ) : (
          <Route exact path='/' render={()=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>My Reads</h1>
              </div>
              <BooksList mybooks={this.state.mybooks} 
                onUpdateBookShelf={this.updateBookShelf}/>
              <BooksSearch onSetSearchPage={()=>this.setState({showSearchPage:true})}/>
            </div>
          )} />           
        )}
      </div>
    )
  }
}

export default App
