import  { useState } from 'react' ;

export default function(initVal = '') {
    
    const [state ,setState ] = useState(initVal) ; 

    const setValue = (value) => {
         
         setState(value)

    }

    return [state, setValue] ; 

}