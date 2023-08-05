import NavigationButton from './NavigationButton'

export default function PaginationBar(props) {
    return (
        <div className='pagination-bar-container'>
            <span onClick={props.goToFirstSetOfCollections} className="arrow-container">
                <span className="navigate-to-beginning-or-end">
                    <i className="arrow left"></i>
                    <i className="arrow left"></i>
                </span>
            </span>
            <span className="arrow-container">
                <i onClick={props.handleBackButtonClick} className="arrow left"></i>
            </span>
            <span className="page-count-wrapper">  
                <span>Page {" " + props.currentPage + " "} of 
                    <NavigationButton clickHandler={props.goToLastSetOfCollections} buttonText={" " + props.pageLimit}/>
                </span>
            </span>
            <span className="arrow-container">
                <i onClick={props.handleNextButtonClick} className="arrow right"></i>
            </span>
            <span className="arrow-container">
                <span onClick={props.goToLastSetOfCollections} className="navigate-to-beginning-or-end">
                    <i className="arrow right"></i>
                    <i className="arrow right"></i>
                </span>
            </span>
        </div>
    )
}