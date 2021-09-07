const pressure = (weather, unit) => !weather ? 750 : Math.round(weather.units[unit].pressure)
const pressureUnit = unit => unit === 'c' ? 'мм рт.ст' : 'гПА'

export { pressure, pressureUnit }
