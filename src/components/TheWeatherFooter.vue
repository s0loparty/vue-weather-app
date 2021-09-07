<template>
	<footer>
		<div class="container">
			<div class="wrap-statistic">
				<ul class="statistic-list">
					<li class="statistic-item">
						<div class="item-title">Ветер</div>
						<div class="item-value">
							{{ windSpeed }} {{ unit === 'c' ? 'м/c' : 'мл/ч' }}, {{ windDeg }}
						</div>
					</li>
					<li class="statistic-item">
						<div class="item-title">Давление</div>
						<div class="item-value">
							{{ weatherPressure }} {{ weatherPressureUnit }}
						</div>
					</li>
					<li class="statistic-item">
						<div class="item-title">Влажность</div>
						<div class="item-value">{{ weatherHumidity }}%</div>
					</li>
					<li class="statistic-item">
						<div class="item-title">Вероятность дождя</div>
						<div class="item-value">{{ weatherChanceRain }}%</div>
					</li>
				</ul>
			</div>
		</div>
	</footer>
</template>

<script>
import { calcDeg } from '@/helpers/wind.js'
import { pressure, pressureUnit } from '@/helpers/pressure.js'

export default {
	props: {
		weather: {
			type: Object,
			require: true
		},
		unit: {
			type: String,
			require: true
		}
	},
	computed: {
		windDeg() {
			return calcDeg(!this.weather ? null : this.weather.windDeg)
		},
		weatherPressure() {
			return pressure(this.weather, this.unit)
		},
		weatherPressureUnit() {
			return pressureUnit(this.unit)
		},
		weatherHumidity() {
			return !this.weather ? 1 : this.weather.humidity
		},
		weatherChanceRain() {
			return !this.weather ? 1 : this.weather.chanceRain
		},
		windSpeed() {
			return !this.weather ? 1 : Math.round(this.weather.units[this.unit].max_wind)
		}
	}
}
</script>
