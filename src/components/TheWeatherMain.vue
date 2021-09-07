<template>
	<div class="container">
		<div class="weather">
			<div class="weather-icon" v-html="weatherIcon"></div>
			<div class="weather-temp">
				<span>{{ !currentWeather ? '00' : currentWeather.units[currentUnit].temp }}</span>
				<span>º</span>
			</div>
		</div>
		<div class="weather-about">{{ !currentWeather ? 'Loading ...' : currentWeather.condition.text }}</div>
	</div>
</template>

<script>
import getWeatherIcon from '@/helpers/weatherIcon.js'
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters(['currentWeather', 'currentUnit']),
		weatherIcon() {
			if (!this.currentWeather) return getWeatherIcon()
			return getWeatherIcon(this.currentWeather.iconCode, this.currentWeather.isDay)
		}
	}
}
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
</style>
