import ErrorMessage from './ErrorMessage.js'

export default function Home(props) {
    return (
        props.errorMessage ?
        <ErrorMessage errorMessage={props.errorMessage}></ErrorMessage>
        :
        <div className="home-page-container">
            <p className="home-page-intro">This is a site meant to generate interest in resources at the 
            <a className="highlighted-link" href="https://www.loc.gov/" alt="go to the homepage of the Library of Congress website" target="_blank" rel="noreferrer"> Library of Congress</a>. 
                To that end, there is a list of collections available digitally to the public, 
                each with a show page including a description, a photo, and a link to more information on the Library of Congress website. I hope you enjoy browsing through the virtual stacks. Three cheers for books!
            </p>
            <img src='https://tile.loc.gov/storage-services/service/pnp/ppmsca/42000/42050r.jpg' alt="Three cheers for books. Book week, November 10-16, 1963."/>
            <a className="home-page-link highlighted-link" href="https://www.loc.gov/resource/ppmsca.42050/" target="_blank" rel="noreferrer" alt="Three cheers for books. Book week, November 10-16, 1963">Three cheers for books. Book week, November 10-16, 1963.</a>
        </div>
    )

}