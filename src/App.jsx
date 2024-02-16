import { useEffect, useState } from 'react'
import TimeLine from "./New-timeline"
import './App.css'
// import events from './Event.json'
function App() {
  const [data,setData] = useState([])
  const [year,setYear] = useState("")
  const [event,setEvent] = useState('')


  useEffect(()=>{
      fetch("http://localhost:3002/events")
        .then((response) => response.json())
        .then((data) =>{
          setData(data)
        })
  },[])


  const handleClick = () => {
    let newObj ={}
    newObj.year = year
    newObj.event = event
    setData([...data, newObj])
    setYear('')
    setEvent('')
    fetch("http://localhost:3002/events", {
      method : "POST",
      body : JSON.stringify({year, event})
    })

  }
  return (
    <div>
      <h1>Welcome to My Time-Line </h1>
      <br />
      {data.map(event => {
        return (<TimeLine key={event.year} year={event.year} event={event.event} />)
      })}
      <input value={year} type='number' onChange={e => setYear(e.target.value)} />
      <br />
      
      <input value={event} type='text' onChange={e => setEvent(e.target.value)} />
      <button onClick={handleClick}>Sumbit</button>
    </div>
  )
}

export default App


