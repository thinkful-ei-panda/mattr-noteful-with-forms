import React from 'react'
import Header from './Header'
import Folders from './Folders/Folders'
import Notes from './Notes/Notes'
import {Route, withRouter} from 'react-router-dom'
import AppContext from './AppContext'
import AddFolder from './Folders/AddFolder'
import AddNote from './Notes/AddNote'
import ErrorBoundary from './ErrorBoundary'

class App extends React.Component{
  state = {
    currentFolder:null,
    currentNote:null,
    folders: [],
    notes: [],
    noteFields: {
      name: {
        value: '',
        touched: false,
      },
      content: {
        value: '',
        touched: false,
      },
      folderName: {
        value: '',
        touched: false,
      }
    },
    folderField: {value:'', touched:false},
    loading:false
  }

  componentDidMount(){
    this.setState({loading:true})
    fetch(`http://localhost:9090/db`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        ...data,
        currentFolder:null,
        currentNote: null,
        loading:false
      })
    })
  }

  handleFolderSelect = (e) => {
    this.setState({
      currentFolder:e.target.id,
      currentNote:null
    })
    this.props.history.push(`/folders/folders/${e.target.id}`)
  }

  handleNoteSelect = (e) => {
    this.setState({currentNote:e.currentTarget.id})
    this.props.history.push(`/notes/notes/${e.currentTarget.id}`)
  }

  handleClickHeader= () => {
    this.setState({currentNote:null, currentFolder:null})
    this.props.history.push(`/`)
  }

  handleBackClick= () =>{
    this.setState({currentNote:null})
    this.props.history.goBack()
  }

  handleDeleteClick = (e) =>{
    e.stopPropagation();
    const noteId=e.target.id;
    this.setState({
      loading:true
    })
    fetch(`http://localhost:9090/notes/${e.target.id}`,{
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response=>response.json())
    .then(()=>{

      let newNotes=this.state.notes

      newNotes=newNotes.filter(note => note.id !== noteId)
      

      this.setState({
        notes: newNotes,
        currentNote:null,
        loading:false
      }, ()=> this.props.history.goBack())
    })
  }


  handleAddFolder= (e) =>{
    this.props.history.push('/folders/addfolder')
  }

  handleAddNote = (e) => {
    this.props.history.push('/notes/addnote')
  }

  handleAddNoteSubmit = (e) => {
    e.preventDefault();
    const {name, content} = this.state.noteFields;
    const id=e.target.closest('form').folderName.value;
    const date = new Date(Date.now());
    const newNote={
      name:name.value,
      content:content.value,
      folderId:id,
      modified:date.toISOString()
    };
    this.setState({loading:true})
    fetch('http://localhost:9090/notes',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(newNote)
    })
      .then(response => response.json())
      .then((result)=> {
        let newNotes=this.state.notes;
        newNotes.push(result);
        this.setState({
          notes:newNotes,
          loading:false,
          noteFields: {
            name: {
              value: '',
              touched: false,
            },
            content: {
              value: '',
              touched: false,
            },
            folderName: {
              value: '',
              touched: false,
            }
          }
        })
      }
    )
    this.props.history.goBack();
  }

  handleUpdateNoteFields = (e) => {
    let newNoteFields=this.state.noteFields
    newNoteFields[e.target.id].value=e.target.value;
    newNoteFields[e.target.id].touched=true;

    this.setState({noteFields: newNoteFields});     
  }

  handleFolderSubmit = (e) => {
    e.preventDefault();
    const newFolder= {name: e.target.folderName.value}
    fetch('http://localhost:9090/folders',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newFolder)
    })
    .then(response => response.json())
    .then((result) => {
      let newFolders=this.state.folders
      newFolders.push(result)
      this.setState({
        folders:newFolders,
        folderField: {value:'', touched:false}})
    })
    this.props.history.goBack();

  }

  handleFolderFormOnChange = (e) => {
    let newFolderField = this.state.folderField;
    newFolderField.value=e.target.value;
    newFolderField.touched=true;
    this.setState({folderField: newFolderField});
  }

  render(){
    return (
      <AppContext.Provider value={{
        folders:this.state.folders,
        notes:this.state.notes,
        currentFolder:this.state.currentFolder,
        currentNote:this.state.currentNote,
        handleClickHeader: this.handleClickHeader,
        handleDeleteClick: this.handleDeleteClick,
        handleAddFolder: this.handleAddFolder,
        handleAddNote: this.handleAddNote,
        handleAddNoteSubmit: this.handleAddNoteSubmit,
        handleUpdateNoteFields: this.handleUpdateNoteFields,
        noteFields: this.state.noteFields,
        handleFolderSubmit:this.handleFolderSubmit,
        handleFolderFormOnChange:this.handleFolderFormOnChange,
        folderField: this.state.folderField,
        loading:this.state.loading
      }} >

        <div className='App'>
          <ErrorBoundary>
          <Header />
          <main>
            <Route exact 
              path='/' 
              render={() => <Folders handleFolderSelect={this.handleFolderSelect}/>}
            />

            <Route
              exact
              path='/'
              render={() => <Notes currentFolder={this.state.currentFolder} handleNoteSelect={this.handleNoteSelect} currentNote={this.state.currentNote} notes={this.state.notes}/>}
            />

            <Route
              exact
              path='/folders/folders/:folderId' 
              render={() => <Folders currentFolder={this.state.currentFolder} handleFolderSelect={this.handleFolderSelect}/>} 
            />

            <Route
              path='/folders/folders/:folderId'
              render={() => <Notes currentFolder={this.state.currentFolder} handleNoteSelect={this.handleNoteSelect} currentNote={this.state.currentNote} notes={this.state.notes}/>}
            />

            <Route
              exact
              path='/notes/notes/:noteId' 
              render={(routeProps) => <Folders {...routeProps} handleBackClick={this.handleBackClick} handleFolderSelect={this.handleFolderSelect} />} 
            />

            <Route
              exact
              path='/notes/notes/:noteId'
              render={() => <Notes currentFolder={this.state.currentFolder} handleNoteSelect={this.handleNoteSelect} currentNote={this.state.currentNote} notes={this.state.notes}/>}
            />

            <Route
              path='/folders/addfolder'
              render={() => <AddFolder />}
            />

            <Route
              path='/notes/addnote'
              render={() => <AddNote />}
            />

          </main>
          </ErrorBoundary>
        </div>

      </AppContext.Provider>

    )
  }
}

export default withRouter(App)