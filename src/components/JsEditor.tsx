import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-github_dark'
import 'ace-builds/webpack-resolver'

const JsEditor = ({ onChange, placeholder }: any) => {
	return (
		<AceEditor
			mode="javascript"
			theme="github_dark"
			name="jsEditor"
			value={placeholder}
			onChange={onChange}
			editorProps={{ $blockScrolling: true }}
			style={{ width: '100%', maxHeight: '300px' }}
			setOptions={{
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: false,
				showLineNumbers: true,
				tabSize: 2,
			}}
		/>
	)
}

export default JsEditor
