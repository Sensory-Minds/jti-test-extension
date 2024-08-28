import React, { createContext, useState, useContext, ReactNode } from 'react'

export type Result = JSON | Error | undefined

export interface ResultObj {
	result: Result
}

export const ResultContext = createContext<{
	result: Result
	displayResult: (result: Result) => void
}>({
	result: undefined,
	displayResult: () => {},
})

export const useResult = () => useContext(ResultContext)

const ResultProvider = ({ children }: { children: ReactNode }) => {
	const [result, setResult] = useState<Result>(undefined)

	return (
		<ResultContext.Provider
			value={{
				result,
				displayResult: setResult,
			}}
		>
			{children}
		</ResultContext.Provider>
	)
}

export default ResultProvider
