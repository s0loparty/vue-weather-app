<template>
	<div class="app-loader" :class="{hide: data}">Loading weather ...</div>
</template>

<script>
export default {
	props: ['data']
}
</script>

<style scoped>
.app-loader {
	position: absolute;
	top: 0;left: 0;right: 0;bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30px;
	z-index: 999;
	transition: all .5s;
	opacity: 1;
	background-color: var(--blue-color);
}
.app-loader.hide {
	opacity: 0;
	z-index: -1;
}
</style>
