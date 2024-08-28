import { Close, ErrorOutline } from '@mui/icons-material';
import { Grid2, IconButton, Snackbar, SnackbarContent } from '@mui/material';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as style } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { Result, ResultObj } from '../store/result-context';
import withResultContext from '../store/with-result-context';

function ErrorSnackbar({ error }: Readonly<{ error: Result }>) {
	const [open, setOpen] = useState(true);

	return (
		<Snackbar className='snackbar' open={open}>
			<SnackbarContent
				className='snackbar--error'
				aria-describedby='client-snackbar'
				message={
					<span id='client-snackbar'>
						<ErrorOutline className='snackbar--icon' />
						<div>
							There was an Error during the request:
							<br />
							{error!.toString()}
						</div>
					</span>
				}
				action={[
					<IconButton
						key='close'
						aria-label='Close'
						color='inherit'
						onClick={() => setOpen(false)}
					>
						<Close />
					</IconButton>,
				]}
			/>
		</Snackbar>
	);
}

function ResultContainer({ result }: Readonly<ResultObj>) {
	// if (!result) {
	// 	return null
	// }

	if (result instanceof Error) {
		return <ErrorSnackbar error={result} />;
	}

	return (
		<Grid2
			size='grow'
			// sx={{
			// 	display: 'flex',
			// 	flexDirection: 'column',
			// }}
		>
			<SyntaxHighlighter
				language='json'
				style={style}
				customStyle={{ flexGrow: 1, margin: 0, minHeight: '50vh' }}
			>
				{JSON.stringify(result, null, 4)}
			</SyntaxHighlighter>
		</Grid2>
	);
}

export default withResultContext(ResultContainer);
