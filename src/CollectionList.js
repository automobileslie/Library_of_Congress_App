import PaginationBar from './PaginationBar.js'

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
            <div className="collection-list-container">
                { collectionList() }
            </div>
            <PaginationBar 
                goToFirstSetOfCollections={props.goToFirstSetOfCollections} 
                goToLastSetOfCollections={props.goToLastSetOfCollections}
                handleBackButtonClick={props.handleBackButtonClick}
                loadedAllPages={props.loadedAllPages}
                currentPage={props.currentPage}
                pageLimit={props.pageLimit}
                handleNextButtonClick={props.handleNextButtonClick}
            />
        </div>
    )
}