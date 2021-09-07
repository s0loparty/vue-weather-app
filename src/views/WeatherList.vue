<template>
	<!-- <AppLoader :data="currentWeatherList" v-show="!currentWeatherList.length"></AppLoader> -->
	<div class="container">
		<template v-if="currentWeatherList.length >= 3">
			<div class="wrapper">
					<div style="display: flex;align-items: center;justify-content: space-between;">
					<h1>Погода на 3 дня ({{ currentCity }})</h1>
					<router-link to="/" style="font-size: 18px;color:#fff;">Текущая погода</router-link>
				</div>
				<div class="weather-list">
					<div class="item-list" 
						:class="{'item-list--show': item.isOpen}"
						v-for="(item, idx) in currentWeatherList" :key="item.date"
					>
						<div class="item-list__main-wrap">
							<div class="item-list__info" :title="item.day.text" :alt="item.day.text">
								<div class="item-list__week-title">
									{{ weekName(new Date(item.date)) }}
									<div class="item-list__week-date">{{ new Date(item.date).toLocaleDateString('ru-RU', {year: 'numeric', month: '2-digit', day: '2-digit'}) }}</div>
								</div>
								<div class="item-list__icon" v-html="weatherIcon(item.day.iconCode, item.day.isDay)"></div>
								<div class="item-list__temp">
									<span class="item-list__temp-day">Днём ~ <strong>{{ item.day.units[currentUnit].avgtemp }}</strong></span>
									<span class="item-list__temp-night">Ночью ~ <strong>{{ Math.round(currentUnit === 'c' ? item.day.hours[3].temp_c : item.day.hours[3].temp_f) }}</strong></span>
								</div>
								<div class="item-list__sun">
									<span class="item-list__sun-event">
										<i class="bi bi-sunrise"></i>
										<span>&nbsp;Восход в &nbsp;<strong>{{ convertTime(item.sun.sunrise) }}</strong></span>
									</span>
									<span class="item-list__sun-event">
										<i class="bi bi-sunset"></i>
										<span>&nbsp;Закат в&nbsp; <strong>{{ convertTime(item.sun.sunset) }}</strong></span>
									</span>
								</div>
								<div class="item-list__moon-weather">
									<div class="item-list__moon-phase">
										<i class="bi bi-moon"></i>
										<span>&nbsp;Фаза луны&nbsp; <strong>{{ moonName(item.moon.phase) }}</strong></span>
									</div>
									<div class="item-list__weather-text">
										<i class="bi bi-info-circle"></i>
										<span>&nbsp;&nbsp;{{ item.day.text }}</span>
									</div>
								</div>
							</div>
							<div class="item-list__options">
								<button class="item-list__btn-more" @click="$store.commit('toggleInfoWeather', idx)">Подробнее</button>
							</div>
						</div>
						<div class="item-list__two-wrap">
							<div class="item-list__hour-item" v-for="hour in item.day.hours" :key="hour.time_epoch">
								<div class="flex flex-item-center">
									<i class="bi bi-clock"></i>
									<span>{{ hour.time.split(' ').pop() }}</span>
								</div>
								<div class="flex flex-item-center" v-html="weatherIcon(hour.condition.icon, hour.is_day, true)"></div>
								<div class="flex flex-item-center">
									<i class="bi bi-thermometer-half"></i>
									<span>{{ Math.round(currentUnit === 'c' ? hour.temp_c : hour.temp_f) }}</span>	
								</div>
								<div class="flex flex-item-center" style="width: 300px">
									<i class="bi bi-info-circle"></i>
									<span>{{ hour.condition.text }}</span>
								</div>
								<div>
									<div class="flex flex-item-center">
										<i class="bi bi-wind"></i>
										<span>Ветер <strong>{{ windName(hour.wind_degree) }}</strong></span>
									</div>
									<div class="flex flex-item-center">
										<i class="bi bi-umbrella"></i>
										<span>Вероятность дождя <strong>{{ hour.chance_of_rain }}%</strong></span>	
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<div v-else class="vue-skeletor-wrap">
			<Skeletor v-for="item in 3" :key="item"/>
		</div>
	</div>

	<AppFooter />
</template>

<script>
import { Skeletor } from 'vue-skeletor';

import convert12time from '@/helpers/convertTime12to24.js'
import weekDay from '@/helpers/weekDay.js'
import getWeatherIcon from '@/helpers/weatherIcon.js'
import ruMoonPhase from '@/helpers/moonPhases.js'
import {calcDeg} from '@/helpers/wind.js'

import AppFooter from '@/components/AppFooter'

import { mapGetters } from 'vuex'

export default {
	mounted() {
		this.$store.dispatch('getWeatherList', {city: this.currentCity})
	},
	methods: {
		weekName(date) {
			return weekDay(date)
		},
		convertTime(time) {
			return convert12time(time)
		},
		weatherIcon(apiIcon, isDay, condition = false) {
			const code = condition ? +apiIcon.split('/').pop().slice(0, 3) : apiIcon
			return getWeatherIcon(code, isDay)
		},
		moonName(moonPhase) {
			return ruMoonPhase(moonPhase)
		},
		windName(deg) {
			return calcDeg(deg, true)
		}
	},
	computed: mapGetters(['currentCity', 'currentWeatherList', 'currentUnit']),
	components: { Skeletor, AppFooter }
}
</script>

<style scoped>
	body, #app {
		height: unset;
		min-height: unset;
		max-height: unset;
	}
	#app {
		display: block;
		flex-direction: unset;
		justify-content: unset;
	}
</style>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");

.flex {display: flex;}
.flex-item-center {align-items: center;}

$space: 40px;

.wrapper {
	width: 70vw;
}

.weather-list { }
.item-list {
	box-sizing: border-box;
	border: 1px solid #ffffff30;

	width: 100%;
	min-height: ($space * 2);
	height: auto;
	max-height: ($space * 2);
	overflow: hidden;

	border-radius: 4px;
	transition: all .5s ease-out;
	background-color: transparent;

	margin-bottom: $space;
	&:last-child {margin-bottom: 0;}

	&:hover {
		background-color: #00000040;
	}

	&--show {
		max-height: 255px + ($space * 2);
	}

	&__main-wrap {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		min-height: inherit;
	}
	&__two-wrap {
		border-top: 1px solid #ffffff30;
		max-height: 255px;
		overflow: auto;
	}
	&__hour-item {
		display: flex;
		align-items: center;

		border-bottom: 1px solid #ffffff30;
		padding: 0 $space 0 $space;
		min-height: 70px;

		transition: background-color .3s;

		&:hover {
			background-color: #ffffff0d;
		}

		& > div {
			margin-right: $space;

			&:nth-child(2) {font-size: 30px;} // иконки бутстрапа

			& > span {margin-left: 5px;}
			& > div > span {
				margin-left: 5px;
				&:last-child {margin-top: 5px;}
			}
		}
	}

	&__info {
		display: flex;
		align-items: center;

		& > * {
			margin-right: $space;
			&:last-child {margin-right: 0;}
			&:first-child {margin-left: $space;}
		}
	}
	&__icon {
		i {font-size: 50px;}
	}
	&__temp {
		display: flex;
		flex-direction: column;
	}
	&__temp-day {
		margin-bottom: 10px;
	}
	&__temp-night {}
	&__week-title {
		font-size: $space;
		font-weight: bold;
		text-align: center;
	}
	&__week-date {
		font-size: 16px;
		font-weight: normal;
	}
	&__sun {
		display: flex;
		flex-direction: column;
	}
	&__sun-event {
		&:first-child {margin-bottom: 10px;}

		display: flex;
		align-items: center;

		&:last-child {align-items: end;}
	}
	&__moon-weather {
		& > div {
			display: flex;
			align-items: center;

			&:last-child {align-items: end;}
		}
	}
	&__moon-phase {}
	&__weather-text {
		border-top: 1px solid #ffffff30;
		padding-top: 5px;
		margin-top: 5px;
		font-size: 15px;
		box-sizing: border-box;
	}
	&__options {
		margin: 0 $space 0 $space;
	}
	&__btn-more {
		padding: 0 10px;
		display: inline-block;
		border: none;
		background-color: #ffffff2e;
		// background: var(--white-color);
		// color: var(--blue-color);
		color: #f5f5f5;
		border-radius: 4px;
		min-height: 30px;
		cursor: pointer;
	}
}

@media screen and (max-width: 1360px) {
	.wrapper {
		width: 90vw;
	}
}
@media screen and (max-width: 1060px) {
	.item-list__info > div {
		transition: margin .3s;
		margin-right: 20px;
		&:first-child {margin-left: 20px;}
	}
	.item-list__sun {display: none;}
	.item-list__options {margin: 0 20px;}
}
</style>
