import NavigationButton from './NavigationButton.js'

export default function CollectionList(props) {
    function collectionList() {    
        return props.resultstodisplay.map(result => {
            return <p>{result.title}</p>
        })
    }

    return(
        <div>
            { collectionList() }
            <NavigationButton handleNextPageLoad={props.handleNextPageLoad} atEndOfPages={props.atEndOfPages}/>
        </div>

    )
        


}