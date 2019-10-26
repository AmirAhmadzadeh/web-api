


import  { useState } from 'react' ; 
export default function(initVal = []) {

    const [state ,setState ] = useState(initVal) ; 

    const setValue = (index) => {
        const newArray = [...state];

        if (newArray[index]) {
          for (let i = 0; i < newArray.length; i++) {
             newArray[i] = false;
          }
        } else {
          for (let i = 0; i < newArray.length; i++) {
            newArray[i] = false;
          }
          newArray[index] = true;
        }

        setState(newArray);
    }




    return [state, setValue] ; 
}