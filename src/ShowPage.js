import NavigationButton from './NavigationButton.js'

export default function ShowPage(props) {
    return (
        <div>
            <h1>{props.collection.title}</h1>
            <img src={props.collection.image_url} alt={props.collection.title + 'image'}/>
            <p>{props.collection.description}</p>
            <a href={props.collection.url} target="_blank" rel="noreferrer">Go To Library of Congress Webpage</a>
            <div>
            <NavigationButton clickHandler={props.handleBackToHomePage} buttonText="Go Back"/>
            </div>
        </div>
    )
}