export function dateFormat(content, lang, day, month, year) {
	return new Date(content).toLocaleDateString(lang, {
		day: day,
		month: month,
		year: year,
	});
}
