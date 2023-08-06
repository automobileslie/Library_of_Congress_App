import PaginationBar from './PaginationBar.js'
import SearchBar from './SearchBar.js'

export default function CollectionList(props) {
    function collectionList() {    
        return props.resultsToDisplay?.map(result => {
            return <p className="collection-items" onClick={() => props.handleGoToShowPage(result)} key={result.title}>{result.title}</p>
        })
    }

    return(
        props.loadingCollections ?
        <div>
            <h1 className="loading-collections-message">Loading Collections</h1>
        </div>
        : 
        <div>
            <h2>List of Collections </h2>
            <div className="collection-list-container">
                <SearchBar handleSearch={props.handleSearch}/>
                { collectionList() }
            </div>
            <PaginationBar 
                goToFirstSetOfCollections={props.goToFirstSetOfCollections} 
                goToLastSetOfCollections={props.goToLastSetOfCollections}
                handleBackButtonClick={props.handleBackButtonClick}
                currentPage={props.currentPage}
                pageLimit={props.pageLimit}
                handleNextButtonClick={props.handleNextButtonClick}
            />
            <p id="items-display-range">(Displaying items {props.beginningDisplayResultsNumber + 1} - {props.finalDisplayResultsNumber} of {props.totalNumberOfResults})</p>
        </div>
    )
}