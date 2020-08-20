import React from "react";

const AppContext = React.createContext({
  folders: [],
  notes: [],
  currentFolder: "",
  currentNote: "",
  handleClickHeader: () => {},
  handleDeleteClick: () => {},
  handleAddFolder: () => {},
  handleAddNote: () => {},
  handleAddNoteSubmit: () => {},
  handleUpdateNoteFields: () => {},
  noteFields: {},
  handleFolderSubmit: () => {},
  handleFolderFormOnChange: () => {},
  folderField: {},
  loading: false,
});

export default AppContext;
