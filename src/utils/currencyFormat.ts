export function CurrencyCustomized(
	lang: string,
	currencyLocal: string,
	currencyDate: number
) {
	return new Intl.NumberFormat(lang, {
		style: 'currency',
		currency: currencyLocal,
	}).format(currencyDate);
}
