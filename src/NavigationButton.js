export default function NavigationButton(props) {
    return ( 
        <span onClick={props.handleNextPageLoad}>{!props.atEndOfPages ? 'Next' : 'Back'} </span>
    )
}