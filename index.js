'use strict';
const alfy = require('alfy');

//const query = alfy.input.toUpperCase().split(" ");
const q = alfy.input.toUpperCase().split(/([0-9]+)([A-z]{1,3})/);
const query = [];
q.forEach(item => {
	item.split(" ").forEach(value => {
		if (value) {
			query.push(value);
		}
	});
});
const api = 'https://api.fixer.io';
const output = [];
const promises = [];
const currencies = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"];
const symbols = {"$": "USD", "€": "EUR", "£": "GBP"};
const baseCurrency = alfy.cache.get('baseCurrency');
const lastUpdate = alfy.cache.get('updateDate');
const debug = false;

if (debug) {
	query.forEach(item => {
		output.push({
			title: `${query.indexOf(item)} ${item}`
		})
	})
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

if (!query[0]) {
	output.push({
		title: `See current rates for ${baseCurrency}`,
		subtitle: `rates last updated: ${lastUpdate}`,
		arg: '1',
		autocomplete: '1',
		icon: {
			path: `flags/${baseCurrency}.png`
		}
	});
	output.push({
		title: 'Set base currency',
		subtitle: `current base currency is: ${baseCurrency}`,
		arg: 'SET',
		autocomplete: 'SET'
	});
} else if (query[0] === 'SET' && !query[1]) {
	currencies.forEach(cur => {
		output.push({
			title: `Set base currency to: ${cur}`,
			icon: {
				path: `flags/${cur}.png`
			},
			arg: `SET ${cur}`
		})
	});
} else if (query[0] === 'SET' && currencies.includes(query[1])) {
	promises.push(updateRates(query[1]));
	output.push({
		title: `Update rates for: ${query[1]}`,
		icon: {
			path: `flags/${query[1]}.png`
		},
		arg: '1'
	})
} else if (query[0].match('^\\d+$') && !query[1]) {
	currencies.forEach(cur => {
		if (cur !== baseCurrency) {
			const rate = alfy.cache.get(cur);
			output.push({
				title: `${query[0]} ${baseCurrency} = ${(rate * query[0]).toFixed(4)} ${cur}`,
				subtitle: `${query[0]} ${cur} = ${(query[0] / rate).toFixed(4)} ${baseCurrency} (Rates last updated: ${lastUpdate})`,
				icon: {
					path: `flags/${cur}.png`
				},
				arg: `${query[0]} ${cur}`,
				autocomplete: `${query[0]} ${cur}`
			});
		}
	});
} else if (query[0].match('^\\d+$') && query[1]) {
	if (query[1] !== baseCurrency && currencies.includes(query[1])) {
		const rate = alfy.cache.get(query[1]);
		output.push({
			title: `${query[0]} ${query[1]} = ${(query[0] / rate).toFixed(4)} ${baseCurrency}`,
			subtitle: `${query[0]} ${baseCurrency} = ${(rate * query[0]).toFixed(4)} ${query[1]} (rates last updated: ${lastUpdate})`,
			icon: {
				path: `flags/${query[1]}.png`
			}
		});
	}

	if (query[1].match('^[A-Z]{1,2}$')) {
		currencies.filter(cur => cur.includes(query[1])).forEach(cur => {
			const rate = alfy.cache.get(cur);
			output.push({
				title: `${query[0]} ${cur} = ${(query[0] / rate).toFixed(4)} ${baseCurrency}`,
				subtitle: `${query[0]} ${baseCurrency} = ${(rate * query[0]).toFixed(4)} ${cur} (rates last updated: ${lastUpdate})`,
				icon: {
					path: `flags/${cur}.png`
				}
			});
		});
	}
}

Promise.all(promises).then(() => {
	alfy.output(output)
});
