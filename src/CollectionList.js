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
            <NavigationButton handleNextPageLoad={props.handleNextPageLoad} atEndOfPages={props.atEndOfPages}/>
        </div>

    )
        


}