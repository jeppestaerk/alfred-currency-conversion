# alfred-currency-conversion

> Alfred 4 Workflow - See foreign exchange rates and currency conversion

[![Travis](https://img.shields.io/travis/jeppestaerk/alfred-currency-conversion/master.svg?style=flat-square&label=build%20status)](https://travis-ci.org/jeppestaerk/alfred-currency-conversion) [![npm](https://img.shields.io/npm/dt/alfred-currency-conversion.svg?style=flat-square&label=npm%20downloads)](https://www.npmjs.com/package/alfred-currency-conversion) [![Github](https://img.shields.io/github/downloads/jeppestaerk/alfred-currency-conversion/total.svg?style=flat-square&label=github%20downloads)](https://github.com/jeppestaerk/alfred-currency-conversion/releases/latest)

<img src="https://raw.githubusercontent.com/jeppestaerk/alfred-currency-conversion/master/preview.gif">


## Install

Use `npm`
```
$ npm install --global alfred-currency-conversion
```
or download `alfredworkflow` file from [releases](https://github.com/jeppestaerk/alfred-currency-conversion/releases/latest)

*Requires [Node.js](https://nodejs.org) 8+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*


## Highlights

- Set your own base currency (default `EUR`)
- Currencies: `AED`, `AUD`, `BGN`, `BRL`, `CAD`, `CHF`, `CNY`, `COP`, `CZK`, `DKK`, `EUR`, `GBP`, `HKD`, `HRK`, `HUF`, `IDR`, `ILS`, `INR`, `ISK`, `JPY`, `KRW`, `MXN`, `MYR`, `NOK`, `NZD`, `PHP`, `PLN`, `RON`, `RSD`, `RUB`, `SEK`, `SGD`, `THB`, `TRY`, `USD`, and `ZAR`
- Auto update rates at 4PM CET on working days
- Input support locale numbers
- Input support for <kbd>$</kbd> (`USD`), <kbd>€</kbd> (`EUR`), <kbd>£</kbd> (`GBP`), and <kbd>¥</kbd> (`JPY`)
- Outputs dates and numbers in locale


## Usage

In Alfred, type `curcon`, <kbd>⏎</kbd>, and your amount.


## Contributions

Please feel free to create a PR and/or make a code review!


## To do

- [x] ~~Only update rates on working days~~
- [x] ~~Update to work with Alfred 4~~
- [x] ~~Find a free replacement for fixer.io~~
- [ ] Refactor code
- [ ] *Your idea here*


## Credits

* [alfy](https://github.com/sindresorhus/alfy) made by [Sindre Sorhus](https://sindresorhus.com/) is licensed by [MIT](https://github.com/sindresorhus/alfy/blob/master/license)
* [os-locale](https://github.com/sindresorhus/os-locale) made by [Sindre Sorhus](https://sindresorhus.com/) is licensed by [MIT](https://github.com/sindresorhus/os-locale/blob/master/license)
* Currency rates from [exchangerate-api.com](https://www.exchangerate-api.com/) via `https://api.exchangerate-api.com/v4` (exchange rate data is updated once every 24 hours)
* Icons made by [Freepik](http://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/packs/countrys-flags) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)


## License

MIT © [Jeppe Stærk](https://staerk.io)


<p align="center"><img src="https://raw.githubusercontent.com/jeppestaerk/alfred-currency-conversion/master/icon.png" width="64" ></p>
