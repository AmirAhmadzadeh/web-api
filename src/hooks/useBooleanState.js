


import  { useState } from 'react' ; 
export default function(initVal = false) {
    const [state ,setState ] = useState(initVal) ; 

    const toggle = () => { 
        setState(!state) ; 
    }
    const setBool = (bool) => {

        setState(bool)
    }

    return [ state , setBool , toggle ] ; 
}