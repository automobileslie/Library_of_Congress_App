import NavigationButton from './NavigationButton'

export default function PaginationBar(props) {
    const finalNumberForListing = props.currentPage * 40
    const beginningNumberForListing = finalNumberForListing - 39

    return (
        <div className='pagination-bar-container'>
        <NavigationButton clickHandler={props.goToFirstSetOfCollections} loadedAllPages={props.loadedAllPages} buttonText="First |"/>
        <NavigationButton clickHandler={props.handleBackButtonClick} loadedAllPages={props.loadedAllPages} buttonText="Back"/>
        <span className="arrow-container">
            <i onClick={props.handleBackButtonClick} className="arrow left"></i>
        </span>
        <span className="page-count-wrapper">  
            <span>Page {props.currentPage} of {props.pageLimit} </span>
            <span>(Items {beginningNumberForListing} - {finalNumberForListing})</span>
        </span>
        <span className="arrow-container">
            <i onClick={props.handleNextButtonClick} class="arrow right"></i>
        </span>
        <NavigationButton clickHandler={props.handleNextButtonClick} loadedAllPages={props.loadedAllPages} buttonText=" Next |"/>
        <NavigationButton clickHandler={props.goToLastSetOfCollections} loadedAllPages={props.loadedAllPages} buttonText="Last"/>
    </div>
    )
}