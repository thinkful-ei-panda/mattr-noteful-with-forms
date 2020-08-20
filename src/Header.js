import React from 'react'
import AppContext from './AppContext'
import PropTypes from 'prop-types'

class Header extends React.Component{
    static contextType=AppContext
    render(){
        const {handleClickHeader} = this.context
        return (
            <header onClick={()=>handleClickHeader()}>
                <h1>Noteful</h1>
            </header>
        )
    }
}

Header.childContextType={
    handleClickHeader: PropTypes.func.isRequired
}

export default Header