'use strict';
const alfy = require('alfy');

const query = alfy.input.toUpperCase();
const api = 'https://api.fixer.io';
const output = [];
const promises = [];
const currencies = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"];
const baseCurrency = alfy.cache.get('baseCurrency');

function addOutput(multiplier) {
	const lastUpdate = alfy.cache.get('updateDate');
	const base = alfy.cache.get('baseCurrency');
	currencies.forEach(cur => {
		if (cur !== base) {
			const rate = alfy.cache.get(cur);
			output.push({
				title: `${multiplier} ${base} = ${(rate * multiplier).toFixed(4)} ${cur}`,
				subtitle: `Rates last updated: ${lastUpdate}`,
				icon: {
					path: `flags/${cur}.png`
				},
				arg: cur,
				autocomplete: cur
			});
		}
	});
}

function cacheRates(data) {
	const rates = data.rates;
	Object.keys(rates).forEach((cur) => {
		alfy.cache.set(cur, rates[cur]);
	});
	alfy.cache.set('updateDate', data.date);
	alfy.cache.set('baseCurrency', data.base);
}

function updateRates(base) {
	return alfy.fetch(`${api}/latest?base=${base}`).then(cacheRates);
}

if (currencies.includes(query)) {
	promises.push(updateRates(query));
} else {
	promises.push(updateRates(baseCurrency));
}

Promise.all(promises).then(() => {

	if (query.match('^\\d+$')) {
		addOutput(query);
	} else {
		addOutput(1);
	}

	alfy.output(output)
});
