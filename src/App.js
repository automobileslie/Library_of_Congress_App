import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CollectionList from './CollectionList.js'
import ShowPage from './ShowPage.js'
import Home from './Home.js'
import NavigationBar from './NavigationBar.js'
import {Routes, Route, useNavigate} from 'react-router-dom'

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
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(0)
  const [searchValue, setSearchValue] = useState("")

  const resultsToDisplay = filteredResults.slice(beginningDisplayResultsNumber, finalDisplayResultsNumber)
  const navigate = useNavigate();

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
  }

  function handleBackToHomePage() {
    setCurrentShowPage(null)
    // clear the search filter if there was one in place
    setFilteredResults(results)
    setSearchValue("")
    setTotalNumberOfResults(results.length)
    setBeginningDisplayResultsNumber(0)
    setPageLimit(Math.ceil(results.length/40))
    if (results.length % 40 !== 0 && Math.floor(results.length/40) === 0) {
      setFinalDisplayResultsNumber(results.length)
    }
    else {
      setFinalDisplayResultsNumber(40)
    }
  }

  function handleBackToCollectionFromShow() {
    setCurrentShowPage(null)
    // clear the search filter if there was one in place before going back to the full list
    setSearchValue("")
    setFilteredResults(results)
    goToFirstSetOfCollections()
    setTotalNumberOfResults(results.length)
    setBeginningDisplayResultsNumber(0)
    setPageLimit(Math.ceil(results.length/40))
    if (results.length % 40 !== 0 && Math.floor(results.length/40) === 0) {
      setFinalDisplayResultsNumber(results.length)
    }
    else {
      setFinalDisplayResultsNumber(40)
    }
    navigate("/collection-list")
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
  }

  function goToLastSetOfCollections() {
    setBeginningDisplayResultsNumber(40 * (pageLimit - 1))
    setFinalDisplayResultsNumber(totalNumberOfResults)
    setCurrentPage(pageLimit)
  }

  function handleSearch(searchTerm) {
    setSearchValue(searchTerm)
    let searchResults = results.filter(result => {
      return result.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
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

    if (searchTerm === "") {
      navigate("/collection-list")
    }
    else {
      navigate(`/collection-list/?search=${searchTerm}`)
    }
  }

  return (
    <div>
      <NavigationBar goToFirstSetOfCollections={goToFirstSetOfCollections} handleBackToHomePage={handleBackToHomePage}/>
      <div className="app-container">
        <div className="inner-app-wrapper">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/collection-list" element={<CollectionList results={results} 
              resultsToDisplay={resultsToDisplay}
              filteredResults={filteredResults}
              totalNumberOfResults= {totalNumberOfResults}
              pageLimit={pageLimit}
              handleNextButtonClick={handleNextButtonClick} 
              handleBackButtonClick={handleBackButtonClick} 
              currentPage={currentPage}
              currentShowPage={currentShowPage}
              handleGoToShowPage={handleGoToShowPage}
              loadingCollections={loadingCollections}
              goToFirstSetOfCollections={goToFirstSetOfCollections}
              goToLastSetOfCollections={goToLastSetOfCollections}
              handleSearch={handleSearch}
              beginningDisplayResultsNumber={beginningDisplayResultsNumber}
              finalDisplayResultsNumber={finalDisplayResultsNumber}
              handleBackToCollectionFromShow={handleBackToCollectionFromShow}
            />}/>
            <Route path={`/collection-list?search=${searchValue}`} element={<CollectionList results={results} 
              resultsToDisplay={resultsToDisplay}
              filteredResults={filteredResults}
              totalNumberOfResults= {totalNumberOfResults}
              pageLimit={pageLimit}
              handleNextButtonClick={handleNextButtonClick} 
              handleBackButtonClick={handleBackButtonClick} 
              currentPage={currentPage}
              currentShowPage={currentShowPage}
              handleGoToShowPage={handleGoToShowPage}
              loadingCollections={loadingCollections}
              goToFirstSetOfCollections={goToFirstSetOfCollections}
              goToLastSetOfCollections={goToLastSetOfCollections}
              handleSearch={handleSearch}
              beginningDisplayResultsNumber={beginningDisplayResultsNumber}
              finalDisplayResultsNumber={finalDisplayResultsNumber}
              handleBackToCollectionFromShow={handleBackToCollectionFromShow}
            />}/>
            <Route path={`/collection/${currentShowPage?.title}`} element={<ShowPage currentPage={currentPage} collection={currentShowPage} handleBackToCollectionFromShow={handleBackToCollectionFromShow}/>}/>
          </Routes>
        </div>
     </div>
    </div>
  )
}

