import React from 'react'
import AppContext from '../AppContext'
import PropTypes from 'prop-types'

class Folder extends React.Component{
    static contextType=AppContext;

    render(){
        const {currentFolder}=this.context;

        if(currentFolder===this.props.id){
                
                return (
                    <div onClick={(e)=>this.props.handleFolderSelect(e)} id={this.props.id} className='folder-active'>
                        {this.props.name}
                    </div>
            )
        }else{
            return (
                <div className='folder'>
                        <div onClick={(e)=>this.props.handleFolderSelect(e)} id={this.props.id}>
                            {this.props.name}
                        </div>           
                </div>
            )
        }
    }
}

Folder.childContextType ={
    currentFolder: PropTypes.string.isRequired
}

Folder.propTypes ={
    id: PropTypes.string.isRequired,
    handleFolderSelect: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default Folder