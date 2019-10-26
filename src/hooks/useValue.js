


import  { useState } from 'react' ; 
export default function(initVal = 0) {
    const [state ,setState ] = useState(initVal) ; 


    const setValue = (value) => {
        // console.log(`hoooo amir ` , e, value)
        setState(value)
    }

    return [state, setValue] ; 
}