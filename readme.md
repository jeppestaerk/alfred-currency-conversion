# alfred-currency-conversion

> Alfred 4 Workflow - See foreign exchange rates and currency conversion

[![Travis](https://img.shields.io/travis/jeppestaerk/alfred-currency-conversion/master.svg?style=flat-square&label=build%20status)](https://travis-ci.org/jeppestaerk/alfred-currency-conversion) [![npm](https://img.shields.io/npm/dt/alfred-currency-conversion.svg?style=flat-square&label=npm%20downloads)](https://www.npmjs.com/package/alfred-currency-conversion) [![Github](https://img.shields.io/github/downloads/jeppestaerk/alfred-currency-conversion/total.svg?style=flat-square&label=github%20downloads)](https://github.com/jeppestaerk/alfred-currency-conversion/releases/latest)

<img src="https://raw.githubusercontent.com/jeppestaerk/alfred-currency-conversion/master/preview.gif">


## Install

Use `npm`
```
$ npm install --global alfred-currency-conversion
```
or download `alfredworkflow` file by clicking [here](https://github.com/jeppestaerk/alfred-currency-conversion/raw/master/alfred-currency-conversion.alfredworkflow)

(Release might be outdated, so please download a workflow from the link above.)

*Requires [Node.js](https://nodejs.org) 8+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*


## Highlights

- Set your own base currency (default `EUR`)
- Currencies: `AED`, `AFN`, `ALL`, `AMD`, `ANG`, `AOA`, `ARS`, `AUD`, `AWG`, `AZN`, `BAM`, `BBD`, `BDT`, `BGN`, `BHD`, `BIF`, `BMD`, `BND`, `BOB`, `BRL`, `BSD`, `BTN`, `BWP`, `BYN`, `BZD`, `CAD`, `CDF`, `CHF`, `CLP`, `CNY`, `COP`, `CRC`, `CUC`, `CUP`, `CVE`, `CZK`, `DJF`, `DKK`, `DOP`, `DZD`, `EGP`, `ERN`, `ETB`, `EUR`, `FJD`, `FKP`, `FOK`, `GBP`, `GEL`, `GGP`, `GHS`, `GIP`, `GMD`, `GNF`, `GTQ`, `GYD`, `HKD`, `HNL`, `HRK`, `HTG`, `HUF`, `IDR`, `ILS`, `IMP`, `INR`, `IQD`, `IRR`, `ISK`, `JMD`, `JOD`, `JPY`, `KES`, `KGS`, `KHR`, `KID`, `KMF`, `KRW`, `KWD`, `KYD`, `KZT`, `LAK`, `LBP`, `LKR`, `LRD`, `LSL`, `LYD`, `MAD`, `MDL`, `MGA`, `MKD`, `MMK`, `MNT`, `MOP`, `MRU`, `MUR`, `MVR`, `MWK`, `MXN`, `MYR`, `MZN`, `NAD`, `NGN`, `NIO`, `NOK`, `NPR`, `NZD`, `OMR`, `PAB`, `PEN`, `PGK`, `PHP`, `PKR`, `PLN`, `PYG`, `QAR`, `RON`, `RSD`, `RUB`, `RWF`, `SAR`, `SBD`, `SCR`, `SDG`, `SEK`, `SGD`, `SHP`, `SLL`, `SOS`, `SRD`, `SSP`, `STN`, `SYP`, `SZL`, `THB`, `TJS`, `TMT`, `TND`, `TOP`, `TRY`, `TTD`, `TVD`, `TWD`, `TZS`, `UAH`, `UGX`, `USD`, `UYU`, `UZS`, `VES`, `VND`, `VUV`, `WST`, `XAF`, `XCD`, `XDR`, `XOF`, `XPF`, `YER`, `ZAR`, and `ZMW`
- Auto update rates once a day
- Input support locale numbers
- Input support for $ (`USD`), € (`EUR`), £ (`GBP`), ¥ (`JPY`), ₩ (`KRW`), ₽ (`RUB`), and ₹ (`INR`)
- Set your own favorite currency list
- Outputs dates and numbers in locale


## Usage

In Alfred, type `curcon`, <kbd>⏎</kbd>

If you set your favorite currency list, you will get converted amount to your favorite currency by simply typing `curcon {number}`
(Both `favorite currency` -> `base currency` and `base currency` -> `favorite currency`)

`curcon BASE` to set your base currency

`curcon LIST` to add your favorite currency to the list

`curcon RMVE` to remove a currency from the list

`curcon REST` to reset your favorite currency list


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
* Currency rates from [exchangerate-api.com](https://www.exchangerate-api.com/) via `https://open.er-api.com/v6` (exchange rate data is updated once every 24 hours)
* Icons made by [Freepik](http://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/packs/countrys-flags) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)


## License

MIT © [Jeppe Stærk](https://staerk.io)


<p align="center"><img src="https://raw.githubusercontent.com/jeppestaerk/alfred-currency-conversion/master/icon.png" width="64" ></p>
