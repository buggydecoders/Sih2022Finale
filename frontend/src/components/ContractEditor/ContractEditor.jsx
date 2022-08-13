import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import React from 'react';

const ContractEditor = () => {

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
      );
  return (
    <div className='w-full h-full'>
         <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  )
}

export default ContractEditor