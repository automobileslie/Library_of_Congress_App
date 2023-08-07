import NavigationButton from './NavigationButton.js'
import ErrorMessage from './ErrorMessage.js'

export default function ShowPage(props) {
    return (
        props.errorMessage ?
            <ErrorMessage errorMessage={props.errorMessage}></ErrorMessage>
        :
        <div className="show-page-container">
            <h1 className="show-page-header">{props.collection.title}</h1>
            <img className="show-page-image" src={props.collection.image_url} alt={props.collection.title + 'image'}/>
            <p className="show-page-description">{props.collection.description}</p>
            <div className="show-page-link">            
                <a className="highlighted-link" href={props.collection.url} alt="Library of Congress Page" target="_blank" rel="noreferrer">Library of Congress Page</a>
            </div>
            <div id="show-page-go-home-btn-container">
                <NavigationButton clickHandler={props.handleBackToCollectionFromShow} buttonText="Go Back"/>
            </div>
        </div>
    )
}