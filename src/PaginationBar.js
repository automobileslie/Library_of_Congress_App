
export default function PaginationBar(props) {
    let finalPageDisplayNumber = props.totalNumberOfResults ? props.pageLimit : 1
    return (
        <div className='pagination-bar-container'>
            <span onClick={props.goToFirstSetOfCollections} className={`arrow-container${props.onTheFirstPage ? "-disabled" : ""}`}>
                <span className={`navigate-to-beginning-or-end${props.onTheFirstPage ? "-disabled" : ""}`}>
                    <i className={`arrow${props.onTheFirstPage ? "-disabled" : ""} left`}></i>
                    <i className={`arrow${props.onTheFirstPage ? "-disabled" : ""} left`}></i>
                </span>
            </span>
            <span className={`arrow-container${props.onTheFirstPage ? "-disabled" : ""}`}>
                <i onClick={props.handleBackButtonClick} className={`arrow${props.onTheFirstPage ? "-disabled" : ""} left`}></i>
            </span>
            <span className="page-count-wrapper">  
                <span>Page {" " + props.currentPage + " "} of {finalPageDisplayNumber}
                </span>
            </span>
            <span className={`arrow-container${props.onTheLastPage ? "-disabled" : ""}`}>
                <i onClick={props.handleNextButtonClick} className={`arrow${props.onTheLastPage ? "-disabled" : ""} right`}></i>
            </span>
            <span className={`arrow-container${props.onTheLastPage ? "-disabled" : ""}`}>
                <span onClick={props.goToLastSetOfCollections} className={`navigate-to-beginning-or-end${props.onTheLastPage ? "-disabled" : ""}`}>
                    <i className={`arrow${props.onTheLastPage ? "-disabled" : ""} right`}></i>
                    <i className={`arrow${props.onTheLastPage ? "-disabled" : ""} right`}></i>
                </span>
            </span>
        </div>
    )
}