import PaginationBar from './PaginationBar.js'

export default function CollectionList(props) {
    const finalNumberForListing = props.currentPage * 40
    const beginningNumberForListing = finalNumberForListing - 39

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
            <p id="items-display-range">(Displaying items {beginningNumberForListing} - {finalNumberForListing})</p>
        </div>
    )
}