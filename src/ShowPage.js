import NavigationButton from './NavigationButton.js'

export default function ShowPage(props) {
    return (
        <div className="show-page-container">
            <h1 className="show-page-header">{props.collection.title}</h1>
            <img className="show-page-image" src={props.collection.image_url} alt={props.collection.title + 'image'}/>
            <p className="show-page-description">{props.collection.description}</p>
            <div className="show-page-link">            
                <a href={props.collection.url} target="_blank" rel="noreferrer">Go To Library of Congress Webpage</a>
            </div>
            <div id="show-page-go-home-btn-container">
                <NavigationButton clickHandler={() => props.handleBackToHomePageFromShow(props.currentPage)} buttonText="Go Back"/>
            </div>
        </div>
    )
}