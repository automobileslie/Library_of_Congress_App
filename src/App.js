import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CollectionList from './CollectionList.js'

export default function App() {

  const [results, setResults] = useState([])
  const [displayResultsNumber, setDisplayResultsNumber] = useState(0)
  const resultsToDisplay = results.slice(displayResultsNumber - 40, displayResultsNumber)
  const [loadedAllPages, setLoadedAllPages] = useState(false)
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(null)
  const [url, setUrl] = useState('https://www.loc.gov/collections/?fo=json')
  const [currentPage, setCurrentPage] = useState(0)
  const [pageLimit, setPageLimit] = useState(null)

  useEffect(() => {
    // fetching collections data from the Library of Congress API
    const getCollections = async () => {
      const collectionData = await axios.get(url)
      setResults([...results, collectionData.data.results].flat())
      setDisplayResultsNumber(40)
      setCurrentPage(1)
      setUrl(collectionData["data"]["pagination"]["next"])
    }

    getCollections()
    console.log(currentPage, 'currentPage')
  }, []) 

  function handleNextPageLoad() {
    // getting the next set of collections data to display
    
    // if the back button has been hit before all of the pages have been loaded, make sure we do not 
    // make an API call to get data we already have
    let backButtonHit = (results.length / (currentPage) !== 40)

    const getCollections = async () => {
      if (!loadedAllPages) {
        if (!backButtonHit) {
          const collectionData = await axios.get(url)
          setResults([...results, collectionData.data.results].flat())
          setUrl(collectionData["data"]["pagination"]["next"])
  
          if (!collectionData["data"]["pagination"]["next"]) {
            // if we have loaded all pages at this point, then store information to indicate that
            setLoadedAllPages(true)
            setTotalNumberOfResults(results.length)
            setPageLimit(results.length/40)
          }
        }
        else {
          let firstPartUrl = 'https://www.loc.gov/collections/?fo=json'
          let secondPartUrl = "&sp=" + (currentPage + 2)
          let newUrl = firstPartUrl + secondPartUrl
          setUrl(newUrl)
        } 
      }
    }

    getCollections()

    // Take the user to the next page unless we are on the last page
    if (!pageLimit || currentPage <= pageLimit) {
      setCurrentPage(currentPage + 1)
      setDisplayResultsNumber(displayResultsNumber + 40)
    }  
  }

function handleBackButtonClick() {
  // take the user to the previous page if not currently on the first page
  if(currentPage > 1) {
    setDisplayResultsNumber(displayResultsNumber - 40)
    setCurrentPage(currentPage - 1)

  // if the pages have not all loaded yet, set the url to fetch the next page when needed
    if (!loadedAllPages) {
      let firstPartUrl = 'https://www.loc.gov/collections/?fo=json'
      let secondPartUrl = "&sp=" + currentPage
      let newUrl = firstPartUrl + secondPartUrl
      setUrl(newUrl)
    }
  } 
}

  return (
    <div>
      <CollectionList results={results} resultsToDisplay={resultsToDisplay} handleNextPageLoad={handleNextPageLoad} handleBackButtonClick={handleBackButtonClick} loadedAllPages={loadedAllPages} currentPage={currentPage}/>
    </div>
  );
}

