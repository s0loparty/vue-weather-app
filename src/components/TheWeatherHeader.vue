<template>
	<header>
		<div class="container">
			<div class="wrap-header">
				<div class="wrap-city-and-search">
					<div class="wrap-search" :class="{ show: searchIsActive }">
						<form @submit.prevent="submitSearch">
							<div class="city-search">
								<input 
									type="text" 
									placeholder="Введите город" 
									class="city-search_input" 
									@input="inputEvent"
									@keyup.esc="$store.commit('toggleSearchCity')"
									:value="inputSearchQuery"
								>
								<button type="submit" class="city-search_btn">ОК</button>
							</div>
						</form>
						<div 
							class="search-results" 
							:class="{ 'search-results--show': searchResults.length && searchIsActive }"
						>
							<div 
								class="search-results_item" 
								v-for="city in searchResults" 
								:key="city"
								@click="selectCityFromResult(city)"
							>{{ city }}</div>
						</div>
					</div>
					<div class="wrap-city" :class="{ hide: searchIsActive }">
						<div class="current-city">{{ currentCity }}</div>
						<!-- <div class="city-buttons">
							<button class="btn city-buttons_btn" @click="$store.commit('toggleSearchCity')">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
									<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
								</svg>
								<span>Сменить город</span>
							</button>
							<button class="btn city-buttons_btn" @click="$store.dispatch('getMemberLocation')">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
									<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
									<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
								</svg>
								<span>Мое местоположение</span>
							</button>
							<router-link to="/weather-list" class="btn city-buttons_btn" style="display: block;">Погода на 3 дня</router-link>
						</div> -->
					</div>
				</div>
				<!-- <div class="wrap-units">
					<div class="units">
						<button 
							class="btn units_btn" 
							:class="unitActiveClass('c')"
							@click="$store.commit('setCurrentUnit', 'c')"
						>C</button>
						<button 
							class="btn units_btn" 
							:class="unitActiveClass('f')"
							@click="$store.commit('setCurrentUnit', 'f')"
						>F</button>
					</div>
				</div> -->
			</div>
		</div>
	</header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			inputSearchQuery: '',
			searchResults: []
		}
	},
	methods: {
		// unitActiveClass(btnUnit) {
		// 	return { active: btnUnit === this.currentUnit }
		// },
		inputEvent(event) {
			const value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);

			this.inputSearchQuery = value

			if (!value.length) {
				this.searchResults = []
				return
			}

			this.searchResults = this.cityList
				.filter(item => item.toLowerCase().indexOf(this.inputSearchQuery.toLowerCase()) !== -1)
		},
		submitSearch() {
			if (!this.inputSearchQuery.length) return

			this.$store.commit('toggleSearchCity')
			this.$store.commit('setCurrentCity', this.inputSearchQuery)

			this.$store.dispatch('getWeather', this.inputSearchQuery)
			this.searchResults = []
		},
		selectCityFromResult(city) {
			this.inputSearchQuery = city
			this.searchResults = []
		}
	},
	computed: {
		...mapGetters(['currentCity', 'cityList']),
		searchIsActive() {
			return this.$store.getters.searchCityIsActive
		}
	},
	watch: {
		currentCity(v) {
			this.inputSearchQuery = v
		}
	}
}
</script>
