import JtiExtension from '@jti-extensions/client';
import { Response } from '@jti-extensions/types';
import {
	Button,
	FormControl,
	FormControlLabel,
	Grid2,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Switch,
	TextField,
} from '@mui/material';

import React from 'react';
import withResultContext from '../store/with-result-context';
// import schema from '../state-schema.json';

// const ajv = new Ajv({ allErrors: true, verbose: true });

const placeholderGameState = {
	key_1: 'string',
	key_2: 2,
	key_3: [],
	key_4: {
		lol: true,
	},
	key_5: true,
};

function ButtonContainer(props: any) {
	const { displayResult } = props;

	const [points, setPoints] = React.useState<number | ''>(0.5);
	const [pointsError, setPointsError] = React.useState(false);

	const [score, setScore] = React.useState<number | ''>(321);
	const [scoreError, setScoreError] = React.useState(false);

	const [rankingTimeRange, setRankingTimeRange] = React.useState<
		'all-time' | 'today'
	>('all-time');
	const [rankingAscending, setRankingAscending] = React.useState<boolean>(true);

	// const [gameState, setGameState] = React.useState<string>(
	// 	JSON.stringify(placeholderGameState, null, 2)
	// );
	// const [gameStateValidationError, setGameStateValidationError] =
	// 	React.useState<boolean>(false);

	// const [trackCategory, setTrackCategory] = React.useState<string>('');
	// const [trackAction, setTrackAction] = React.useState<string>('');
	// const [trackLabel, setTrackLabel] = React.useState<string>('');
	// const [trackValue, setTrackValue] = React.useState<number>(0);
	// const [trackError, setTrackError] = React.useState<boolean>(false);

	const handleInitButtonClick = async () => {
		JtiExtension.init({
			extensionName: 'react-test-extension',
			mock: true,
			labels: {
				TEST_LABEL: 'Test',
			},
			quitUrl: 'http://www.sensory-minds.com',
		})
			.then((response: Response.Init) => displayResult(response))
			.catch((error: any) => console.log(error.message));
	};

	const handleResultButtonClick = async () => {
		if (pointsError === true || scoreError === true) return;

		if (score !== '' && points) {
			await JtiExtension.setResult({
				displayScore: score,
				normalizedPoints: points,
			})
				.then((response: Response.Result) => displayResult(response))
				.catch((error: any) => console.log(error.message));
		}
	};

	const handleRankingButtonClick = async () => {
		await JtiExtension.getRanking({
			extensionName: 'react-test-extension',
			ascending: rankingAscending,
			limit: 10,
			timeRange: rankingTimeRange,
		})
			.then((response: Response.Ranking) => displayResult(response))
			.catch((error: any) => console.log(error.message));
	};

	// const handleTrackButtonClick = async () => {
	// 	const isValid =
	// 		trackCategory &&
	// 		trackAction &&
	// 		trackLabel &&
	// 		trackValue !== undefined &&
	// 		trackValue !== null;

	// 	if (isValid) {
	// 		setTrackError(false);

	// 		await JtiExtension.trackData({
	// 			category: trackCategory,
	// 			action: trackAction,
	// 			label: trackLabel,
	// 			value: trackValue,
	// 		})
	// 			.then((response: Response.Track) => displayResult(response))
	// 			.catch((error: any) => console.log(error.message));
	// 	} else {
	// 		setTrackError(true);
	// 	}
	// };

	// const handleStateInputChange = (data: string) => {
	// 	setGameState(data);
	// 	setGameStateValidationError(false);
	// };

	// const handleStateButtonClick = async () => {
	// 	try {
	// 		const parsedData = JSON.parse(gameState);
	// 		const isValid = ajv.validate(schema, parsedData);
	// 		if (isValid) {
	// 			await JtiExtension.setState(parsedData)
	// 				.then((response: StateResponse) => displayResult(response))
	// 				.catch((error: any) => console.log(error.message));
	// 		} else {
	// 			console.log(ajv.errors);
	// 			setGameStateValidationError(true);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const validatePoints = (points: string): boolean => {
		const parsedPoints = parseFloat(points);
		return parsedPoints >= 0 && parsedPoints <= 1;
	};

	const validateScore = (score: string): boolean => {
		const parsedScore = parseInt(score);
		return parsedScore >= 0;
	};

	return (
		<Grid2 size={{ xs: 12, sm: 5, md: 4, lg: 3, xl: 2 }}>
			<Grid2 container>
				<Grid2 size={{ xs: 12 }}>
					<Button
						id='init-button'
						variant='contained'
						fullWidth
						onClick={handleInitButtonClick}
					>
						Init
					</Button>
				</Grid2>

				<Grid2 container size={{ xs: 12 }}>
					<Grid2 size={{ xs: 6 }}>
						<TextField
							type='number'
							label='Points'
							value={points}
							onChange={(e) => {
								const isValid = validatePoints(e.target.value);

								if (isValid) {
									setPoints(parseFloat(e.target.value));
									setPointsError(false);
								} else {
									setPoints('');
									setPointsError(true);
								}
							}}
							margin='normal'
							fullWidth
							size='small'
							error={pointsError}
							helperText={pointsError ? 'Points must be between 0 and 1' : ''}
						/>
					</Grid2>
					<Grid2 size={{ xs: 6 }}>
						<TextField
							type='number'
							label='Score'
							value={score}
							onChange={(e) => {
								const isValid = validateScore(e.target.value);

								if (isValid) {
									setScore(parseInt(e.target.value));
									setScoreError(false);
								} else {
									setScore('');
									setScoreError(true);
								}
							}}
							margin='normal'
							fullWidth
							size='small'
							error={scoreError}
							helperText={scoreError ? 'Score must be a positive integer' : ''}
						/>
					</Grid2>
					<Grid2 size={{ xs: 12 }}>
						<Button
							id='result-button'
							variant='contained'
							fullWidth
							onClick={handleResultButtonClick}
						>
							Set Result
						</Button>
					</Grid2>
				</Grid2>
				<Grid2 container size={{ xs: 12 }}>
					<Grid2 size={{ xs: 6 }}>
						<FormControl margin='normal' fullWidth>
							<InputLabel id='ranking-timerange-label'>Timerange</InputLabel>
							<Select
								size='small'
								id='ranking-timerange'
								label='TimeRange'
								value={rankingTimeRange}
								onChange={(e: SelectChangeEvent) =>
									setRankingTimeRange(e.target.value as 'all-time' | 'today')
								}
							>
								<MenuItem value={'all-time'}>all-time</MenuItem>
								<MenuItem value={'today'}>today</MenuItem>
							</Select>
						</FormControl>
					</Grid2>
					<Grid2 size={{ xs: 6 }}>
						<FormControl margin='normal' fullWidth>
							<FormControlLabel
								control={
									<Switch
										checked={rankingAscending}
										onChange={(event: React.ChangeEvent<any>) => {
											setRankingAscending(event.target.checked);
										}}
									/>
								}
								label='ascending'
							/>
						</FormControl>
					</Grid2>
					<Grid2 size={{ xs: 12 }}>
						<Button
							variant='contained'
							fullWidth
							onClick={handleRankingButtonClick}
						>
							Get Ranking
						</Button>
					</Grid2>
				</Grid2>

				{/* <Grid2 container columnSpacing={2} rowSpacing={1}>
					<Grid2 xs={6}>
						<TextField
							label='Category'
							value={trackCategory}
							onChange={(e) => setTrackCategory(e.target.value)}
							size='small'
						/>
					</Grid2>
					<Grid2 xs={6}>
						<TextField
							label='Action'
							value={trackAction}
							onChange={(e) => setTrackAction(e.target.value)}
							size='small'
						/>
					</Grid2>
					<Grid2 xs={6}>
						<TextField
							label='Tracking label'
							value={trackLabel}
							onChange={(e) => setTrackLabel(e.target.value)}
							fullWidth
							size='small'
						/>
					</Grid2>
					<Grid2 xs={6}>
						<TextField
							type='number'
							label='Tracking value'
							value={trackValue}
							onChange={(e) => setTrackValue(parseInt(e.target.value))}
							fullWidth
							size='small'
						/>
					</Grid2>
					<Grid2 xs={12}>
						<Button
							variant='contained'
							fullWidth
							onClick={handleTrackButtonClick}
						>
							Track data
						</Button>
						{trackError && (
							<div style={{ color: 'red' }}>
								<p>All track fields required</p>
							</div>
						)}
					</Grid2>
				</Grid2> */}

				{/* <Grid2 container item>
					<Grid2 xs={12} my={1}>
						<JsEditor
							onChange={handleStateInputChange}
							placeholder={gameState}
						/>
						{gameStateValidationError && (
							<div style={{ color: 'red' }}>
								<h4>Validation Error</h4>
							</div>
						)}
					</Grid2>
					<Grid2 xs={12}>
						<Button
							variant='contained'
							fullWidth
							onClick={handleStateButtonClick}
						>
							Set state
						</Button>
					</Grid2> 
				</Grid2> */}
			</Grid2>
		</Grid2>
	);
}

export default withResultContext(ButtonContainer);
