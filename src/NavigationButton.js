export default function NavigationButton(props) {
    return ( 
        <span class="navigation-button" onClick={props.clickHandler}>{props.buttonText} </span>
    )
}