import { ResultContext } from './result-context'

function withResultContext(Component: any) {
	return function ConnectedComponent(props: any) {
		return (
			<ResultContext.Consumer>
				{({ result, displayResult }: any) => (
					<Component {...props} result={result} displayResult={displayResult} />
				)}
			</ResultContext.Consumer>
		)
	}
}

export default withResultContext
