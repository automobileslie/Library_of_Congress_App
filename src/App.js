import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CollectionList from './CollectionList.js'
import ShowPage from './ShowPage.js'
import Home from './Home.js'
import NavigationBar from './NavigationBar.js'

export default function App() {

  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [displayResultsNumber, setDisplayResultsNumber] = useState(0)
  const resultsToDisplay = filteredResults.slice(displayResultsNumber - 40, displayResultsNumber)
  const [url, setUrl] = useState('https://www.loc.gov/collections/?fo=json')
  const [currentPage, setCurrentPage] = useState(0)
  const [pageLimit, setPageLimit] = useState(null)
  const [currentShowPage, setCurrentShowPage] = useState(null)
  const [loadingCollections, setLoadingCollections] = useState(true)
  const [showCollectionsPage, setShowCollectionsPage] = useState(false)

  useEffect(() => {
    // fetching collections data from the Library of Congress API
    const getCollections = async () => {
      const collectionData = await axios.get('https://www.loc.gov/collections/?fo=json')
      setResults(collectionData.data.results)
      setFilteredResults(collectionData.data.results)
      setDisplayResultsNumber(40)
      setCurrentPage(1)
      setUrl(collectionData["data"]["pagination"]["next"])
    }

    getCollections()
  }, []) 

  useEffect(() => {
    const getRemainingCollections = async () => {
      const collectionData = await axios.get(url)
      setResults([...results, collectionData.data.results].flat())
      setFilteredResults([...results, collectionData.data.results].flat())
      setUrl(collectionData["data"]["pagination"]["next"])

      if (!collectionData["data"]["pagination"]["next"]) {
        // if all pages have loaded, set the loading state to false and set the page limit
        setPageLimit(Math.ceil(filteredResults.length/40) + 1)
        setLoadingCollections(false)
      }
    }
    if (url) {
      getRemainingCollections()
    }

  }, [results, filteredResults, url])

  function handleNextButtonClick() {
    // Take the user to the next page unless we are on the last page
    if (currentPage < pageLimit) {
      setCurrentPage(currentPage + 1)
      setDisplayResultsNumber(displayResultsNumber + 40)
    }  
  }

  function handleBackButtonClick() {
    // take the user to the previous page if not currently on the first page
    if(currentPage > 1) {
      setDisplayResultsNumber(displayResultsNumber - 40)
      setCurrentPage(currentPage - 1)
    } 
  }

    function handleGoToShowPage(collection) {
      setCurrentShowPage(collection)
      setShowCollectionsPage(false)
    }

    function handleBackToHomePageFromShow(page) {
      setShowCollectionsPage(true)
      setCurrentShowPage(null)
      setCurrentPage(page)
      setDisplayResultsNumber(40 * page)
    }

    function handleBackToHomePageFromCollection() {
      setCurrentShowPage(null)
      setShowCollectionsPage(false)
    }

    function goToFirstSetOfCollections() {
      setDisplayResultsNumber(40)
      setCurrentPage(1)
      setShowCollectionsPage(true)
    }

    function goToLastSetOfCollections() {
      setDisplayResultsNumber(40 * pageLimit)
      setCurrentPage(pageLimit)
      setShowCollectionsPage(true)
    }

    function handleSearch(searchTerm) {
      let filteredResults = results.filter(result => {
        return result.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setShowCollectionsPage(true)
      setFilteredResults(filteredResults)
      setPageLimit(Math.ceil(filteredResults.length/40))
      setCurrentPage(1)
      if (searchTerm === "") {
        goToFirstSetOfCollections()
      }
      setDisplayResultsNumber(40)
    }

    function whichPageToRender() {
      if (showCollectionsPage) {
          return <CollectionList results={results} 
          resultsToDisplay={resultsToDisplay}
          filteredResults={filteredResults}
          pageLimit={pageLimit}
          handleNextButtonClick={handleNextButtonClick} 
          handleBackButtonClick={handleBackButtonClick} 
          currentPage={currentPage}
          handleGoToShowPage={handleGoToShowPage}
          loadingCollections={loadingCollections}
          goToFirstSetOfCollections={goToFirstSetOfCollections}
          goToLastSetOfCollections={goToLastSetOfCollections}
          handleSearch={handleSearch}
        />
        }
        else if (currentShowPage) {
          return <ShowPage currentPage={currentPage} collection={currentShowPage} handleBackToHomePageFromShow={handleBackToHomePageFromShow}/>
        }
        else {
          return <Home />
        }
      }

  return (
    <div>
      <NavigationBar goToFirstSetOfCollections={goToFirstSetOfCollections} handleBackToHomePageFromCollection={handleBackToHomePageFromCollection}/>
      <div className="app-container">
        <div className="inner-app-wrapper">
          {whichPageToRender()}
        </div>
     </div>
    </div>
  )
}

