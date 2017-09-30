import React, {Component} from 'react'
import Books  from './Books'

class BooksList2 extends Component {
  render() {
    const mybooks = this.props.mybooks
    const currentlyReading = mybooks.filter( (mybook)=> mybook.shelf.toLowerCase()==="currentlyreading")
    const wantToRead = mybooks.filter( (mybook)=> mybook.shelf.toLowerCase()==='wanttoread')
    const Read = mybooks.filter( (mybook)=> mybook.shelf.toLowerCase()==="read")

    return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
      			  <div className="bookshelf">
               		<h2 className="bookshelf-title">Currently Reading</h2>
      				<div className="bookshelf-books">
            			<ol className="books-grid">
      					{
      						currentlyReading.map((mybook)=>(
                          		<li key={mybook.id}><Books mybook={mybook} /></li>      					
    						))
      					}
  						</ol>
  					</div>
               		<h2 className="bookshelf-title">Want To Read</h2>
      				<div className="bookshelf-books">
            			<ol className="books-grid">
	      					{
    	  					  wantToRead.map(mybook=>(
        	                  	<li key={mybook.id}><Books mybook={mybook} /></li>      					
    						))
      						}
						</ol>
					</div>
               		<h2 className="bookshelf-title">Read</h2>
      				<div className="bookshelf-books">
            			<ol className="books-grid">
	      				{
    	  					Read.map(mybook=>(
        	                	<li key={mybook.id}><Books mybook={mybook} /></li>      					
    						))
      					}
						</ol>
					</div>
  				 </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
      )
  }
}

export default BooksList2