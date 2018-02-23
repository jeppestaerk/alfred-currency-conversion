'use strict';
const alfy = require('alfy');

const query = [];
const output = [];
const promises = [];
const api = 'https://api.fixer.io';
const currencies = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"];
const baseCurrency = alfy.cache.get('baseCurrency');
const lastUpdate = alfy.cache.get('updateDate');
const q = alfy.input.toUpperCase().replace('$', 'USD').replace('€', 'EUR').replace('£', 'GBP').replace('¥', 'JPY').split(/([0-9]+)([A-z]{1,3})/);
q.forEach(item => {
	item.split(" ").forEach(value => {
		if (value) {
			query.push(value);
		}
	});
});

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

function addInitOutput() {
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
		title: 'Set/Update base currency',
		subtitle: `current base currency is: ${baseCurrency} (rates last updated: ${lastUpdate})`,
		arg: 'SET',
		autocomplete: 'SET'
	});
}

function addSetBaseCurrencyListOutput() {
	currencies.forEach(currency => {
		output.push({
			title: `Set base currency to: ${currency}`,
			icon: {
				path: `flags/${currency}.png`
			},
			arg: `SET ${currency}`
		})
	});
}

function addUpdateRatesOutput(currency) {
	output.push({
		title: `Update rates for: ${currency}`,
		icon: {
			path: `flags/${currency}.png`
		},
		arg: '1'
	})
}

function addCurrencyOutput(multiplier, currency) {
	const rate = alfy.cache.get(currency);
	const baseAmount = (multiplier / rate).toFixed(4);
	const currencyAmount = (rate * multiplier).toFixed(4);
	output.push({
		title: `${multiplier} ${currency} = ${baseAmount} ${baseCurrency}`,
		subtitle: `${multiplier} ${baseCurrency} = ${currencyAmount} ${currency}`,
		icon: {
			path: `flags/${currency}.png`
		},
		arg: `${baseAmount} ${baseCurrency}`,
		variables: {
			function: 'copy'
		},
		text: {
			copy: `${baseAmount} ${baseCurrency}`,
			largetype: `${multiplier} ${currency} = ${baseAmount} ${baseCurrency}`
		}
	});
}

function addCurrencyListOutput(multiplier) {
	currencies.forEach(currency => {
		if (currency !== baseCurrency) {
			const rate = alfy.cache.get(currency);
			const baseAmount = (multiplier / rate).toFixed(4);
			const currencyAmount = (rate * multiplier).toFixed(4);
			output.push({
				title: `${multiplier} ${currency} = ${baseAmount} ${baseCurrency}`,
				subtitle: `${multiplier} ${baseCurrency} = ${currencyAmount} ${currency}`,
				icon: {
					path: `flags/${currency}.png`
				},
				arg: `${multiplier} ${currency}`,
				autocomplete: `${multiplier} ${currency}`,
				text: {
					copy: `${baseAmount} ${baseCurrency}`,
					largetype: `${multiplier} ${currency} = ${baseAmount} ${baseCurrency}`
				}
			});
		}
	});
}

if (!query[0]) {
	addInitOutput();
} else if (query[0] === 'SET') {
	if (!query[1]) {
		addSetBaseCurrencyListOutput()
	} else if (currencies.includes(query[1])) {
		promises.push(updateRates(query[1]));
		addUpdateRatesOutput(query[1]);
	}
} else if (query[0].match('^\\d+$') && !query[1]) {
	addCurrencyListOutput(query[0]);
} else if (query[0].match('^\\d+$') && query[1]) {
	if (currencies.includes(query[1]) && query[1] !== baseCurrency) {
		addCurrencyOutput(query[0], query[1]);
	} else if (query[1].match('^[A-Z]{1,2}$')) {
		currencies.filter(currency => currency.includes(query[1])).forEach(currency => {
			addCurrencyListOutput(query[0], currency);
		});
	}
}

Promise.all(promises).then(() => {
	alfy.output(output)
});
