


import  { useState } from 'react' ; 
export default function(initVal = false) {
    const [state ,setState ] = useState(initVal) ; 


    const setValue = (value) => {
        // console.log(`hoooo amir ` , e, value)
        setState(value)
    }

    return [state, setValue] ; 
}