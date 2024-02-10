import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-tomorrow';

const JsonEditor = ({ json }) => {
    return (
      <AceEditor
        className="json-editor"
        mode="json"
        theme="tomorrow_night"
        readOnly={true}
        value={json}
        name="json-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    );
  };

export default JsonEditor;
