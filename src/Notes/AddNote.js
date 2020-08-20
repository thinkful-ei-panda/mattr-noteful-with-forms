import React from 'react'
import AppContext from '../AppContext'
import PropTypes from 'prop-types'

class AddNote extends React.Component {

    static contextType=AppContext;

    render () {
        const {handleAddNoteSubmit, handleUpdateNoteFields, noteFields,folders,currentFolder,loading} = this.context;
        let validation=[];
        
        
        if (noteFields.name.value.length === 0 && noteFields.name.touched===true) {
            validation.push('Name is required');
        }

        if(noteFields.folderName.touched===true && folders.find(folder => folder.id===noteFields.folderName.value)===undefined){
            validation.push('Please select an existing folder');
        }

        validation= validation.map((requirement,index)=>{
            return(
                <li key='index'>
                    {requirement}
                </li>
            )
        })

        let options=folders.map((folder,i) => {
            let option
            let currentFolderId
            if(currentFolder){
                currentFolderId=folders.find((folder) => folder.id === currentFolder).id
                if(folder.id===currentFolderId){
                    option=<option selected='selected' key={i} value={folder.id}>{folder.name}</option>
                }else{
                    option=<option key={i} value={folder.id}>{folder.name}</option>
                }
            } else{
                option=<option key={i} value={folder.id}>{folder.name}</option>
            }
            
            return (
                option                
            )
        })

        let disabled = false;
        if (validation.length !== 0 || noteFields.name.touched === false || loading===true) {
            disabled = true
        }
        
        return (
            <div>
                <form onSubmit={e=>handleAddNoteSubmit(e)}>
                    <legend><h2>New Note</h2></legend>
                    <fieldset>
                        <div>
                            <div><label htmlFor='name'>Title</label></div>
                            <input name='name' id='name' onChange={e=>handleUpdateNoteFields(e)}></input>
                        </div>
                        <div>
                            <div><label>Text</label></div>
                            <input id='content' onChange={e=>handleUpdateNoteFields(e)}></input>
                        </div>
                        <div>
                            <div><label>Folder</label></div>
                            <select id='folderName' onChange={e=>handleUpdateNoteFields(e)}>
                                {options}
                            </select>
                        </div>
                        <button type='submit' disabled = {disabled}>Save</button>
                    </fieldset>
                </form>

                <ul>
                  {validation} 
                </ul>
            </div>
        )
    }
}

AddNote.childContextType = {
    handleAddNoteSubmit: PropTypes.func.isRequired, 
    handleUpdateNoteFields: PropTypes.func.isRequired, 
    noteFields: PropTypes.object.isRequired,
    folders: PropTypes.array.isRequired
}

export default AddNote