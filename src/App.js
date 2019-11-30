import React from 'react';
import Routes from './routes/Routes';
import Academy from './containers/Academy/Academy' ; 



import counterpart from 'counterpart' ; 
import fa from './langs/fa' ; 
import en from './langs/en' ; 
counterpart.registerTranslations('fa' ,fa) ;

counterpart.setLocale('fa') ; 




export default function (){
  return (
    <React.Fragment>
        <Routes />
    </React.Fragment>            
);
}

