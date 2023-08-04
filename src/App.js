import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CollectionList from './CollectionList.js'

export default function App() {

  const [results, setResults] = useState([])
  const [displayResultsNumber, setDisplayResultsNumber] = useState(0)
  const resultsToDisplay = results.slice(displayResultsNumber - 40, displayResultsNumber)
  const [currentFullSetOfCollectionData, setCurrentFullSetOfCollectionData] = useState(null)
  const [atEndOfPages, setAtEndOfPages] = useState(false)

  useEffect(() => {
    // fetching collections data from the Library of Congress API
    const getCollections = async () => {
      const collectionData = await axios.get('https://www.loc.gov/collections/?fo=json')
      setResults(collectionData.data.results)
      setDisplayResultsNumber(40)
      setCurrentFullSetOfCollectionData(collectionData["data"])
      setAtEndOfPages(collectionData["data"]["pagination"]["next"] ? false : true)
    }
    getCollections()
  }, []) 

  function handleNextPageLoad() {
    const getCollections = async () => {
      if (!atEndOfPages) {
        const collectionData = await axios.get(currentFullSetOfCollectionData["pagination"]["next"])
        setResults([...results, collectionData.data.results].flat())
        setDisplayResultsNumber(displayResultsNumber + 40)
        setCurrentFullSetOfCollectionData(collectionData["data"])
        setAtEndOfPages(collectionData["data"]["pagination"]["next"] ? false : true)
      }
    }
    getCollections()
}

  return (
    <div>
      <CollectionList results={results} resultsToDisplay={resultsToDisplay} handleNextPageLoad={handleNextPageLoad} atEndOfPages={atEndOfPages}/>
    </div>
  );
}

