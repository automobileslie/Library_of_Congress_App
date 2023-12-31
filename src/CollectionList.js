import PaginationBar from './PaginationBar.js'
import SearchBar from './SearchBar.js'
import { NavLink } from 'react-router-dom';
import ErrorMessage from './ErrorMessage.js'

export default function CollectionList(props) {
    let displayItemStartNumber = props.totalNumberOfResults >= 1 ? props.beginningDisplayResultsNumber + 1 : props.beginningDisplayResultsNumber

    function listOfCollections() {    
        return props.resultsToDisplay?.map(result => {
            return <p className="collection-items" onClick={() => props.handleGoToShowPage(result)} key={result?.title}>
                        <NavLink to={`/collection/${result?.title}`}>{result?.title}</NavLink>
                    </p>
        })
    }

    function determineDisplayForCollectionListPage() {
        if (props.loadingCollections) {
            return <div> <h2 className="loading-or-error-collections-message">Loading Collections</h2></div>
        }
        else if (props.errorMessage) {
            return <ErrorMessage errorMessage={props.errorMessage}></ErrorMessage>
        }
        else {
            return <div>
                <h2>List of Collections </h2>
                    <div className="collection-list-container">
                        <SearchBar handleSearch={props.handleSearch} searchValue={props.searchValue}/>
                        { listOfCollections() }
                    </div>
                    <PaginationBar 
                        goToFirstSetOfCollections={props.goToFirstSetOfCollections} 
                        goToLastSetOfCollections={props.goToLastSetOfCollections}
                        handleBackButtonClick={props.handleBackButtonClick}
                        currentPage={props.currentPage}
                        pageLimit={props.pageLimit}
                        handleNextButtonClick={props.handleNextButtonClick}
                        onTheLastPage={props.finalDisplayResultsNumber === props.totalNumberOfResults}
                        onTheFirstPage={props.beginningDisplayResultsNumber === 0}
                        totalNumberOfResults={props.totalNumberOfResults}
                    />
                    <p id="items-display-range">(Displaying items {displayItemStartNumber} - {props.finalDisplayResultsNumber} of {props.totalNumberOfResults})</p>
            </div>
        }

        }

    return <>{determineDisplayForCollectionListPage()}</>
}