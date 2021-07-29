import React from 'react';
import ReactPaginate from 'react-paginate';
import CreateNew from './CreateNew';


function SearchResults() {
    return (
        <div>
            {/* <div className="d-flex">
                <button className="button is-solid accent-button form-button">Add New</button>
            </div> */}
            <div className="view-wrapper is-full">
                <div className="settings-wrapper"><CreateNew /></div>
            </div>
            <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={10}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                // onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
      )
}

export default SearchResults
