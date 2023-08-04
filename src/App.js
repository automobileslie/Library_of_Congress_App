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
  const [displayResultsNumber, setDisplayResultsNumber] = useState(0)
  const resultsToDisplay = results.slice(displayResultsNumber - 40, displayResultsNumber)
  const [loadedAllPages, setLoadedAllPages] = useState(false)
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(null)
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
      setDisplayResultsNumber(40)
      setCurrentPage(1)
      setUrl(collectionData["data"]["pagination"]["next"])
    }

    getCollections()
  }, []) 

  useEffect(() => {
    const getMoreCollections = async () => {
      const collectionData = await axios.get(url)
      setResults([...results, collectionData.data.results].flat())
      setUrl(collectionData["data"]["pagination"]["next"])

      if (!collectionData["data"]["pagination"]["next"]) {
        // if we have loaded all pages at this point, then store information to indicate that
        setLoadedAllPages(true)
        setTotalNumberOfResults(results.length)
        setPageLimit(Math.ceil(results.length/40) + 1)
        setLoadingCollections(false)
      }
     
    }
    if (url) {
      getMoreCollections()
    }

  }, [url])

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
      setDisplayResultsNumber(Math.ceil(results.length))
      setCurrentPage(pageLimit)
    }

    function whichPageToRender() {
      if (showCollectionsPage) {
          return <CollectionList results={results} 
          resultsToDisplay={resultsToDisplay}
          totalNumberOfResults={totalNumberOfResults} 
          pageLimit={pageLimit}
          handleNextButtonClick={handleNextButtonClick} 
          handleBackButtonClick={handleBackButtonClick} 
          loadedAllPages={loadedAllPages} 
          currentPage={currentPage}
          handleGoToShowPage={handleGoToShowPage}
          loadingCollections={loadingCollections}
          goToFirstSetOfCollections={goToFirstSetOfCollections}
          goToLastSetOfCollections={goToLastSetOfCollections}
        />
        }
        else if (currentShowPage) {
          return <ShowPage currentPage={currentPage} collection={currentShowPage} handleBackToHomePageFromShow={handleBackToHomePageFromShow}/>
        }
        else {
        return  <Home />
        }
      }

  return (
     <div className="app-container">
      <NavigationBar goToFirstSetOfCollections={goToFirstSetOfCollections} handleBackToHomePageFromCollection={handleBackToHomePageFromCollection}/>
      <div className="inner-app-wrapper">
        {whichPageToRender()}
      </div>
     </div>
  )
}

