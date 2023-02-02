export interface ResponseError {
	status: "ERROR",
	response: {
		reason: string,
		positionInText: number
	}
};
