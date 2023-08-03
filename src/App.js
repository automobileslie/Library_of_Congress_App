import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CollectionList from './CollectionList.js'

export default function App() {

  const [results, setResults] = useState([])
  const [displayresultsnumber, setDisplayresultsnumber] = useState(0)
  const resultstodisplay = results.slice(displayresultsnumber - 40, displayresultsnumber)
  const [fullsetofcollectiondata, setFullsetofcollectiondata] = useState(null)
  const [atEndOfPages, setAtEndOfPages] = useState(false)

  useEffect(() => {
    // fetching collections data from the Library of Congress API
    const getCollections = async () => {
      const collectionData = await axios.get('https://www.loc.gov/collections/?fo=json')
      setResults(collectionData.data.results)
      setDisplayresultsnumber(40)
      setFullsetofcollectiondata(collectionData["data"])
      setAtEndOfPages(collectionData["data"]["pagination"]["next"] ? false : true)
    }
    getCollections()
  }, []) 

  function handleNextPageLoad() {
    const getCollections = async () => {
      if (!atEndOfPages) {
        const collectionData = await axios.get(fullsetofcollectiondata["pagination"]["next"])
        setResults([...results, collectionData.data.results].flat())
        setDisplayresultsnumber(displayresultsnumber + 40)
        setFullsetofcollectiondata(collectionData["data"])
        setAtEndOfPages(collectionData["data"]["pagination"]["next"] ? false : true)
      }
    }

    getCollections()
}

  return (
    <div>
      <CollectionList results={results} resultstodisplay={resultstodisplay} handleNextPageLoad={handleNextPageLoad} atEndOfPages={atEndOfPages}/>
    </div>
  );
}

