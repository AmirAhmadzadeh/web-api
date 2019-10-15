


import React, { memo } from 'react'
import SearchBar from  './SearchBar/SearchBar'  ; 
import Logo from  '../Logo/Logo' ; 



const topHeader = () => {
    return (  
        <nav className="topheader">
           <Logo 
            class="topheader__logoArea"
            iconClass="logo"
           />

            <h1 className="heading__first"> آکادمی امیر</h1>
            <h2 className="headin__secondary">آموزش ۰ تا۱۰۰ طراحی وب</h2>

           <SearchBar
             class="topheader__searchBar"
             inpClass="topheader__searchBar-inp"
             iconClass="topheader__searchBar-icon"
           />
        </nav>
    );
}
 
export default topHeader;