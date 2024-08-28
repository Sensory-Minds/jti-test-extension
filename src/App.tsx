import React from 'react';

import ResultProvider from './store/result-context';

import ButtonContainer from './components/ButtonContainer';
import { Grid2 } from '@mui/material';
import ResultContainer from './components/ResultContainer';

function App() {
	return (
		<ResultProvider>
			<Grid2 container spacing={1}>
				<ButtonContainer />
				<ResultContainer />
			</Grid2>
		</ResultProvider>
	);
}

export default App;
