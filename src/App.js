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
  const [beginningDisplayResultsNumber, setBeginningDisplayResultsNumber] = useState(0)
  const [finalDisplayResultsNumber, setFinalDisplayResultsNumber] = useState(0)
  const [url, setUrl] = useState('https://www.loc.gov/collections/?fo=json')
  const [currentPage, setCurrentPage] = useState(0)
  const [pageLimit, setPageLimit] = useState(null)
  const [currentShowPage, setCurrentShowPage] = useState(null)
  const [loadingCollections, setLoadingCollections] = useState(true)
  const [showCollectionsPage, setShowCollectionsPage] = useState(false)
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(0)

  const resultsToDisplay = filteredResults.slice(beginningDisplayResultsNumber, finalDisplayResultsNumber)

  useEffect(() => {
    // fetching the first set of collections data from the Library of Congress API
    const getCollections = async () => {
      const collectionData = await axios.get('https://www.loc.gov/collections/?fo=json')
      setResults(collectionData.data.results)
      setFilteredResults(collectionData.data.results)
      setTotalNumberOfResults(collectionData.data.results.length)
      setBeginningDisplayResultsNumber(0)
      setFinalDisplayResultsNumber(40)
      setCurrentPage(1)
      setUrl(collectionData["data"]["pagination"]["next"])
    }
    getCollections()
  }, []) 

  useEffect(() => {
    // fetch the remaining collections
    const getRemainingCollections = async () => {
      const collectionData = await axios.get(url)
      setResults([...results, collectionData.data.results].flat())
      setFilteredResults([...results, collectionData.data.results].flat())
      setTotalNumberOfResults([...results, collectionData.data.results].flat().length)
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
      setBeginningDisplayResultsNumber(beginningDisplayResultsNumber + 40)
      if (Math.floor(totalNumberOfResults/40) === currentPage) {
        setFinalDisplayResultsNumber(totalNumberOfResults)
      }
      else {
        setFinalDisplayResultsNumber(finalDisplayResultsNumber + 40)
      }
      setCurrentPage(currentPage + 1)
    }  
  }

  function handleBackButtonClick() {
    // take the user to the previous page if not currently on the first page
    if(currentPage > 1) {
      setFinalDisplayResultsNumber(beginningDisplayResultsNumber)
      setBeginningDisplayResultsNumber(beginningDisplayResultsNumber - 40)
      setCurrentPage(currentPage - 1)
    } 
  }

  function handleGoToShowPage(collection) {
    setCurrentShowPage(collection)
    setShowCollectionsPage(false)
  }

  function handleBackToHomePage() {
    setCurrentShowPage(null)
    setShowCollectionsPage(false)
  }

  function handleBackToCollectionFromShow() {
    setCurrentShowPage(null)
    setShowCollectionsPage(true)
  }

  function goToFirstSetOfCollections() {
    setCurrentPage(1)
    setBeginningDisplayResultsNumber(0)
    if (totalNumberOfResults % 40 !== 0 && Math.floor(totalNumberOfResults/40) === 0) {
      setFinalDisplayResultsNumber(totalNumberOfResults)
    }
    else {
      setFinalDisplayResultsNumber(40)
    }
    setShowCollectionsPage(true)
  }

  function goToLastSetOfCollections() {
    setBeginningDisplayResultsNumber(40 * (pageLimit - 1))
    setFinalDisplayResultsNumber(totalNumberOfResults)
    setCurrentPage(pageLimit)
    setShowCollectionsPage(true)
  }

  function handleSearch(searchTerm) {
    let searchResults = results.filter(result => {
      return result.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setShowCollectionsPage(true)
    setFilteredResults(searchResults)
    setTotalNumberOfResults(searchResults.length)
    setPageLimit(Math.ceil(searchResults.length/40))
    setCurrentPage(1)
    if (searchTerm === "") {
      goToFirstSetOfCollections()
    }
    setBeginningDisplayResultsNumber(0)
    if (Math.floor(searchResults.length/40) === currentPage && Math.floor(searchResults.length/40) === 0) {
      setFinalDisplayResultsNumber(searchResults.length)
    }
    else if (Math.floor(searchResults.length/40) === 0 && searchTerm !== "") {
      setFinalDisplayResultsNumber(searchResults.length)
    }
    else {
      setFinalDisplayResultsNumber(40)
    }
  }

  function whichPageToRender() {
    if (showCollectionsPage) {
        return <CollectionList results={results} 
        resultsToDisplay={resultsToDisplay}
        filteredResults={filteredResults}
        totalNumberOfResults= {totalNumberOfResults}
        pageLimit={pageLimit}
        handleNextButtonClick={handleNextButtonClick} 
        handleBackButtonClick={handleBackButtonClick} 
        currentPage={currentPage}
        handleGoToShowPage={handleGoToShowPage}
        loadingCollections={loadingCollections}
        goToFirstSetOfCollections={goToFirstSetOfCollections}
        goToLastSetOfCollections={goToLastSetOfCollections}
        handleSearch={handleSearch}
        beginningDisplayResultsNumber={beginningDisplayResultsNumber}
        finalDisplayResultsNumber={finalDisplayResultsNumber}
      />
      }
      else if (currentShowPage) {
        return <ShowPage currentPage={currentPage} collection={currentShowPage} handleBackToCollectionFromShow={handleBackToCollectionFromShow}/>
      }
      else {
        return <Home />
      }
  }

  return (
    <div>
      <NavigationBar goToFirstSetOfCollections={goToFirstSetOfCollections} handleBackToHomePage={handleBackToHomePage}/>
      <div className="app-container">
        <div className="inner-app-wrapper">
          {whichPageToRender()}
        </div>
     </div>
    </div>
  )
}

