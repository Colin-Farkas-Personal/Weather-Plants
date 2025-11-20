function getCurrentHour() {
	const now = new Date();
	return now.getHours();
}

export { getCurrentHour };
