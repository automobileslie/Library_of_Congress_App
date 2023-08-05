export default function NavigationButton(props) {
    return ( 
        <span className="navigation-button" onClick={props.clickHandler}>{props.buttonText} </span>
    )
}