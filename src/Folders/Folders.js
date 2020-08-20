import React from 'react'
import Folder from './Folder'
import AppContext from '../AppContext'
import PropTypes from 'prop-types'

class Folders extends React.Component{  
    static contextType=AppContext;  

    render(){
        const {folders, notes, currentNote,handleAddFolder}=this.context;

        if(currentNote){
            const noteMatch= notes.find(note=>note.id===currentNote)
            const noteBelongsToFolder= folders.find(folder => noteMatch.folderId===folder.id)
            return(
                <div className='folderslist'>
                    <div className='folder'><h2>{noteBelongsToFolder.name}</h2></div>
                    <button onClick={() => this.props.handleBackClick()} type='button'>Back</button>
                </div>
            )
        }

        const folder= folders.map((folder)=> {
            return <Folder handleFolderSelect={this.props.handleFolderSelect} key={folder.id} id={folder.id} name={folder.name}/>
        })

        return (
            <div className='folderslist'>
                <h2>{folder}</h2>
                <button onClick={(e)=>handleAddFolder(e)} type='button'>New Folder</button>
            </div>
        )
    }
}

Folders.propTypes ={
    handleFolderSelect: PropTypes.func,
    handleBackClick: PropTypes.func    
}

export default Folders