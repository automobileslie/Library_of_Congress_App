import NavigationButton from './NavigationButton.js'

export default function CollectionList(props) {
    function collectionList() {    
        return props.resultsToDisplay?.map(result => {
            return <p onClick={() => props.handleGoToShowPage(result)} key={result.title}>{result.title}</p>
        })
    }

    const finalNumberForListing = props.currentPage * 40
    const beginningNumberForListing = finalNumberForListing - 39

    return(
        props.loadingCollections ?
        <div>
            <h1>Loading Collections</h1>
        </div>
        : 
        <div>
            { collectionList() }
            <NavigationButton clickHandler={props.goToFirstSetOfCollections} loadedAllPages={props.loadedAllPages} buttonText="First"/>
            <NavigationButton clickHandler={props.handleBackButtonClick} loadedAllPages={props.loadedAllPages} buttonText="Back"/>
            <span>Page {props.currentPage} of {props.pageLimit} </span>
            <span>(Items {beginningNumberForListing} - {finalNumberForListing})</span>
            <NavigationButton clickHandler={props.handleNextButtonClick} loadedAllPages={props.loadedAllPages} buttonText="Next"/>
            <NavigationButton clickHandler={props.goToLastSetOfCollections} loadedAllPages={props.loadedAllPages} buttonText="Last"/>
        </div>
    )
}