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
  const [errorMessage, setErrorMessage] = useState(null)

  const resultsToDisplay = filteredResults?.slice(beginningDisplayResultsNumber, finalDisplayResultsNumber)
  const navigate = useNavigate();

  useEffect(() => {
    // fetching the first set of collections data from the Library of Congress API
    const getCollections = async () => {
      try {
        const collectionData = await axios.get('https://www.loc.gov/collections/?fo=json')
          setResults(collectionData.data.results)
          setFilteredResults(collectionData.data.results)
          setTotalNumberOfResults(collectionData.data.results?.length)
          setBeginningDisplayResultsNumber(0)
          setFinalDisplayResultsNumber(40)
          setCurrentPage(1)
          setUrl(collectionData["data"]["pagination"]["next"])
          setErrorMessage(null)
      }
      catch(error) {
        setErrorMessage('Error loading the collection list.') 
      }
    }
    getCollections()
  }, []) 

  useEffect(() => {
    // fetch the remaining collections
    const getRemainingCollections = async () => {
      try {
        const collectionData = await axios.get(url)
        setResults([...results, collectionData.data.results].flat())
        setFilteredResults([...results, collectionData.data.results].flat())
        setTotalNumberOfResults([...results, collectionData.data.results].flat().length)
        setUrl(collectionData["data"]["pagination"]["next"])
  
        if (!collectionData["data"]["pagination"]["next"]) {
          // if all pages have loaded, set the loading state to false and set the page count
          setPageLimit(Math.ceil(filteredResults.length/40) + 1)
          setLoadingCollections(false)
        }

        // Below is a workaround for routing purposes, as a backend is not yet hooked up to handle this.
        // I am checking for whether there is a show page title in local storage.
        // If that is the case, it means that the user refreshed the page while on the show page,
        // and this makes sure the show page is not lost if that happens.
        let currentShowPageTitle = localStorage.getItem('currentShowPageTitle')
        if(currentShowPageTitle) {
          let collectionForShowPage = [...results, collectionData.data.results].flat().find(result => {
            return result.title === currentShowPageTitle
          })
          setCurrentShowPage(collectionForShowPage)
        }

        setErrorMessage(null)
      } catch (error) {
        setErrorMessage('Error loading the collection list') 
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
    localStorage.removeItem('currentShowPageTitle')
    localStorage.setItem('currentShowPageTitle', collection.title)
  }

  function handleBackToHomePage() {
    setCurrentShowPage(null)
    localStorage.removeItem('currentShowPageTitle')
    // clear the search filter if there was one in place 
    // and set up users to land back on the full collection list if they return later to the collection list tab
    setFilteredResults(results)
    setSearchValue("")
    setTotalNumberOfResults(results.length)
    setBeginningDisplayResultsNumber(0)
    setPageLimit(Math.ceil(results.length/40))
    // calculate the display numbers for determining how to paginate
    if (results.length % 40 !== 0 && Math.floor(results.length/40) === 0) {
      setFinalDisplayResultsNumber(results.length)
    }
    else {
      setFinalDisplayResultsNumber(40)
    } 
  }

  function handleBackToCollectionFromShow() {
    setCurrentShowPage(null)
    localStorage.removeItem('currentShowPageTitle')
    navigate("/collection-list")
  }

  function goToFirstSetOfCollections() {
    setCurrentPage(1)
    // calculate the display numbers for determining how to paginate
    setBeginningDisplayResultsNumber(0)
    if (totalNumberOfResults % 40 !== 0 && Math.floor(totalNumberOfResults/40) === 0) {
      setFinalDisplayResultsNumber(totalNumberOfResults)
    }
    else {
      setFinalDisplayResultsNumber(40)
    }
  }

  function goToLastSetOfCollections() {
    // calculate the display numbers for determining pagination
    setBeginningDisplayResultsNumber(40 * (pageLimit - 1))
    setFinalDisplayResultsNumber(totalNumberOfResults)
    setCurrentPage(pageLimit)
  }

  function handleSearch(searchTerm) {
    // reset the filteredResults to take the search into account and pass that information down
    setSearchValue(searchTerm)
    let searchResults = results.filter(result => {
      return result.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setFilteredResults(searchResults)

    // do calculations for pagination purposes
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

    // if there is a search term, reflect that in the url; otherwise clear the old search term from the url, if there was one
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
              errorMessage={errorMessage}
              searchValue={searchValue}
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
              errorMessage={errorMessage}
              searchValue={searchValue}
            />}/>
            <Route path={`/collection/${currentShowPage?.title}`} element={<ShowPage collection={currentShowPage} handleBackToCollectionFromShow={handleBackToCollectionFromShow}/>}/>
          </Routes>
        </div>
     </div>
    </div>
  )
}

