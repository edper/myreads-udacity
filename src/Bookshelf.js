import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Bookshelf extends Component {

  static propTypes = {
        mybooks : PropTypes.array.isRequired,
        onUpdateBookShelf: PropTypes.func.isRequired
      }
    
  render() {

    const {mybooks, onUpdateBookShelf} = this.props
    
    return (
            <ol className="books-grid">
                {
                    mybooks.map(
                        (mybook)=> (
                            <li key={mybook.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193,
                                            backgroundImage:`url(${mybook.imageLinks.thumbnail})` }}>
                                        </div>
                                        <div className="book-shelf-changer">
                                            <select value={mybook.shelf.toLowerCase()} onChange={ (event) => onUpdateBookShelf(mybook, event.target.value)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyreading">Currently Reading</option>
                                                <option value="wanttoread">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{mybook.title}</div>
                                    <div className="book-authors">{(mybook.authors.length>1)?mybook.authors.join(' '):mybook.authors}</div>
                                </div>
                            </li>      					
                        )
                    )
                }
            </ol>
      )
  }
}

export default Bookshelf