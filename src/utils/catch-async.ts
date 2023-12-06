export const catchAsync = async (fn: () => Promise<unknown>) => {
	try {
		await fn();
	} catch (e) {
		console.error(e);
	}
};
