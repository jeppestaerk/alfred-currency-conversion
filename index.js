'use strict';
const alfy = require('alfy');
const osLocale = require('os-locale');

const query = [];
const output = [];
const promises = [];
const api = 'https://api.exchangerate-api.com/v4';
const currencies = ["AED", "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "COP", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RSD", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "USD", "VND", "ZAR"];
const topCurrencies = ["USD", "EUR", "JPY", "GBP", "CHF", "CAD", "AUD"];
const lastUpdate = new Date(alfy.cache.get('updateDate'));
const nextUpdate = new Date(alfy.cache.get('nextUpdate'));
const l = alfy.cache.get('locale') || 'en-GB';
const locale = l.replace('_', '-');
const baseCurrency = alfy.cache.get('baseCurrency');
const q = alfy.input.toUpperCase().replace('$', 'USD').replace('€', 'EUR').replace('£', 'GBP').replace('¥', 'JPY').split(/(\d*[.,]?\d+)([A-z]{1,3})/);
q.forEach(item => item.split(" ").filter(item => item.length > 0).forEach(item => query.push(item)));

function getOSLocale() {
	return osLocale().then(locale => alfy.cache.set('locale', locale));
}

function cacheRates(data) {
	const rates = data['rates'];
	Object.keys(rates).forEach(cur => alfy.cache.set(cur, rates[cur]));
	const lastUpdateTime = new Date(data['date']);
	lastUpdateTime.setUTCHours(15, 0, 0, 0);
	const nextUpdateTime = new Date(data['date']);
	nextUpdateTime.getUTCDay() >= 5 ? nextUpdateTime.setUTCDate(nextUpdateTime.getDate() + 3) : nextUpdateTime.setUTCDate(nextUpdateTime.getDate() + 1);
	nextUpdateTime.setUTCHours(15, 15, 0, 0);
	alfy.cache.set('nextUpdate', nextUpdateTime);
	alfy.cache.set('updateDate', lastUpdateTime);
	alfy.cache.set('baseCurrency', data['base']);
}

function updateRates(base) {
	return alfy.fetch(`${api}/latest/${base}`).then(cacheRates);
}

function addBaseOutput() {
	output.push({
		title: `Type amount to see current rates for ${baseCurrency}`,
		subtitle: `rates last updated: ${lastUpdate.toLocaleString(locale)}, next update: ${nextUpdate.toLocaleString(locale)}`,
		arg: '1',
		autocomplete: '1',
		icon: {
			path: `flags/${baseCurrency}.png`
		}
	});
	output.push({
		title: 'Set/Update base currency',
		subtitle: `current base currency is: ${baseCurrency}`,
		arg: 'BASE ',
		autocomplete: 'BASE ',
		icon: {
			path: 'settings.png'
		}
	});
}

function addSetBaseCurrencyListOutput(currency) {
	output.push({
		title: `Set base currency to: ${currency}`,
		icon: {
			path: `flags/${currency}.png`
		},
		arg: `BASE ${currency}`
	})
}

function addUpdateRatesOutput(currency) {
	output.push({
		title: `Set ${currency} as base and update rates`,
		icon: {
			path: `flags/${currency}.png`
		},
		arg: '1'
	})
}

function addCurrencyListOutput(multiplier, currency) {
	if (currency !== baseCurrency) {
		const rate = alfy.cache.get(currency);
		const amount = Number(multiplier.replace(',', '.'));
		const baseAmount = Number(amount / rate);
		const currencyAmount = Number(rate * amount);
		output.push({
			title: `${amount.toLocaleString(locale)} ${currency} = ${baseAmount.toLocaleString(locale)} ${baseCurrency}`,
			subtitle: `${amount.toLocaleString(locale)} ${baseCurrency} = ${currencyAmount.toLocaleString(locale)} ${currency}`,
			icon: {
				path: `flags/${currency}.png`
			},
			arg: `${amount.toLocaleString(locale)} ${currency}`,
			autocomplete: `${amount.toLocaleString(locale)} ${currency}`,
			text: {
				copy: `${baseAmount.toLocaleString(locale)}`,
				largetype: `${amount.toLocaleString(locale)} ${currency} = ${baseAmount.toLocaleString(locale)} ${baseCurrency}`
			}
		});
	}
}

function addCurrencyOutput(multiplier, currency) {
	const rate = alfy.cache.get(currency);
	const amount = Number(multiplier.replace(',', '.'));
	const baseAmount = Number(amount / rate);
	const currencyAmount = Number(rate * amount);
	output.push({
		title: `${amount.toLocaleString(locale)} ${currency} = ${baseAmount.toLocaleString(locale)} ${baseCurrency}`,
		subtitle: `${amount.toLocaleString(locale)} ${baseCurrency} = ${currencyAmount.toLocaleString(locale)} ${currency}`,
		icon: {
			path: `flags/${currency}.png`
		},
		arg: `${baseAmount.toLocaleString(locale)}`,
		variables: {
			function: 'copy'
		},
		text: {
			copy: `${baseAmount.toLocaleString(locale)}`,
			largetype: `${amount.toLocaleString(locale)} ${currency} = ${baseAmount.toLocaleString(locale)} ${baseCurrency}`
		}
	});
}

if (nextUpdate < new Date()){
	promises.push(getOSLocale());
	promises.push(updateRates(baseCurrency));
	output.push({
		title: `INFO: Rates for ${baseCurrency} updated: ${new Date(alfy.cache.get('updateDate')).toLocaleString(locale)}`,
		subtitle: `next update: ${new Date(alfy.cache.get('nextUpdate')).toLocaleString(locale)}`,
		icon: {
			path: 'settings.png'
		}
	});
}

if (query[0] !== 'BASE' && (!baseCurrency || !lastUpdate)) {
	promises.push(getOSLocale());
	if (!query[0]) {
		currencies.forEach(currency => addSetBaseCurrencyListOutput(currency));
	} else if (query[0].match('^[A-Z]{1,2}$')) {
		currencies.filter(currency => currency.includes(query[0])).forEach(currency => addSetBaseCurrencyListOutput(currency));
	} else if (currencies.includes(query[1]) && query[1] !== baseCurrency) {
		addSetBaseCurrencyListOutput(query[1]);
	}
} else if (!query[0]) {
	addBaseOutput();
	topCurrencies.forEach(currency => addCurrencyListOutput('1', currency));
} else if (query[0] === 'BASE' && !query[1]) {
	currencies.forEach(currency => addSetBaseCurrencyListOutput(currency));
} else if (query[0] === 'BASE' && query[1]) {
	if (query[1].match('^[A-Z]{1,2}$')) {
		currencies.filter(currency => currency.includes(query[1])).forEach(currency => addSetBaseCurrencyListOutput(currency));
	} else if (currencies.includes(query[1])) {
		promises.push(getOSLocale());
		promises.push(updateRates(query[1]));
		addUpdateRatesOutput(query[1]);
	}
} else if (query[0].match(/\d*([.,]?\d+)/) && !query[1]) {
	currencies.forEach(currency => addCurrencyListOutput(query[0], currency));
} else if (query[0].match(/\d*([.,]?\d+)/) && query[1]) {
	if (query[1].match('^[A-Z]{1,2}$')) {
		currencies.filter(currency => currency.includes(query[1])).forEach(currency => addCurrencyListOutput(query[0], currency));
	} else if (currencies.includes(query[1]) && query[1] !== baseCurrency) {
		addCurrencyOutput(query[0], query[1]);
	}
}

Promise.all(promises).then(() => {
	alfy.output(output)
});
