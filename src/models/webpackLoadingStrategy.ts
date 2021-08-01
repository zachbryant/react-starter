/** Helper for dynamic imports */
export enum WebpackLoadStrategy {
	Fetch, // Load after parent is finished
	Load, // Load in paralle with parent
	None, // Don't do anything extra
}
