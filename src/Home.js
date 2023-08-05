export default function Home() {
    return (
        <div className="home-page-container">
            <p className="home-page-intro">This is a site meant to generate interest in collections at the 
            <a className="highlighted-link" href="https://www.loc.gov/" alt="go to the homepage of the Library of Congress website" target="_blank" rel="noreferrer"> Library of Congress</a>. 
                To that end, there is a complete list of individual collections available digitally to the public, 
                and each collection has a show page with a description and link to more information on the Library of Congress website.
            </p>
            <img src='https://tile.loc.gov/storage-services/service/pnp/ppmsca/42000/42050r.jpg' alt="Three cheers for books. Book week, November 10-16, 1963."/>
            <a className="home-page-link highlighted-link" href="https://www.loc.gov/resource/ppmsca.42050/" target="_blank" rel="noreferrer" alt="Three cheers for books. Book week, November 10-16, 1963">Three cheers for books. Book week, November 10-16, 1963.</a>
        </div>
    )

}