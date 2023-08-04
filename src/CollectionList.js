import NavigationButton from './NavigationButton.js'

export default function CollectionList(props) {
    function collectionList() {    
        return props.resultsToDisplay.map(result => {
            return <p key={result.title}>{result.title}</p>
        })
    }

    return(
        <div>
            { collectionList() }
            <NavigationButton clickHandler={props.handleNextPageLoad} loadedAllPages={props.loadedAllPages} buttonText="Next"/>
            <span>{props.currentPage}</span>
            <NavigationButton clickHandler={props.handleBackButtonClick} loadedAllPages={props.loadedAllPages} buttonText="Back"/>
        </div>

    )
        


}