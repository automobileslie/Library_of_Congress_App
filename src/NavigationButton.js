export default function NavigationButton(props) {
    return ( 
        <span onClick={props.clickHandler}>{props.buttonText} </span>
    )
}