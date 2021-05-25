import React,{useState,useEffect} from 'react'

export const useCustom = () =>{
    const[record,setRecord] = useState();
    const[error,setError] = useState();
    const[isLoading,setIsLoading] = useState();

    useEffect(() =>{
        async function getdata(){
            setIsLoading(true)
            try{
                const response = await fetch('https://swapi.dev/api/people/1/')
                const data =await response.json()
                setRecord(data);
            
            }
            catch(error){
                <p>{'error message',{error}}</p>
                setError(error.message)
            }
            setIsLoading(false)
    }
    getdata()
   
})

    return [
        record,
        error,
        isLoading
    ]
    
}








import React from 'react'
import {useCustom} from './you-compoent/Custom'

const App = () => {
  const[record,error,isLoading] = useCustom();
  if(isLoading) return<p>your data is loading</p>

  return (
    <div>
      {
        record.map(re =>{
          return <ol><li>{re.name}</li></ol>
        })
      }
      <h2>{error}</h2>
      <h3>{isLoading}</h3>
      {error && <p>Error:{error}</p>}
      {record && <p>data will show here</p>}
    </div>
  )
}

export default App
