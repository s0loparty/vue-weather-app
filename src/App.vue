<template>
   <router-view />
	<TheAlert v-if="$store.getters.appAlerts.length" />
</template>

<script>
import { mapGetters } from 'vuex'

import TheAlert from '@/components/TheAlerts'

export default {
	created() {
		this.$store.dispatch('getMemberLocation')
	},
	mounted() {
		setInterval(() => {
			if (this.$route.path === "/weather-list") {
				this.$store.dispatch('getWeatherList', this.currentCity)
			} else {
				this.$store.dispatch('getWeather', this.currentCity)
			}

			this.$store.commit('setAlert', {title: 'Weather has been update', text: 'Данные о погоде обновлены', type: ''})
		}, this.$store.getters.UPDATE_INTERVAL)
	},
	methods: {
		bodyStyle() {
			let bodyClass = ''

			const text = this.currentWeather.condition.text.toLowerCase()
			const arr = [
				{types: ['солн', 'ясно'], class: 'sun'},
				{types: ['дожд', 'пасмурн'], class: 'rain'},
				// {types: ['пасмурно', 'облачн'], class: 'cloud'},
			]

			text.split(' ').forEach(item => {
				arr.forEach(obj => {
					obj.types.forEach(v => {
						if (item.includes(v)) {
							// console.log('bodyClass:', ' - item:', item, ' / v:', v, ' / obj:', obj);
							bodyClass = obj.class
						}
					})
				})
			})

			if (this.currentWeather && !this.currentWeather.isDay) {
				document.querySelector('html').dataset.theme = 'dark'
			}

			document.getElementById('app').className = bodyClass
		}
	},
	watch: {
		currentWeather(v) {
			this.bodyStyle()
		}
	},
	computed: mapGetters(['currentCity', 'currentWeather']),
	components: { TheAlert }
}
</script>

<style lang="scss">
	@import "~normalize.css/normalize.css";
	@import "@/assets/styles/scss/main.scss";
</style>
