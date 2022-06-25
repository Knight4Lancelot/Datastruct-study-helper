<template>
  <div class="home-view">
	<img src="../assets/home_logo.png" id="home-logo">
	<img src="../assets/home_webname.png" id="home-webname">
	<div id="divider"></div>
  </div>
</template>

<script>
export default {
	name: 'HomeView',
	data() {
		return {
			
		}
	},
	mounted() {
		
	},
	computed: {
	},
	methods: {
		
	}
}
</script>

<style>
.home-view {
	position: inherit;
	width: 100%;
	height: 100%;
}
#home-logo {
	position: inherit;
	top: 60px;
	left: 320px;
	width: 240px;
	user-select: none;
	/* border: 10px solid black; */
}
#home-webname {
	position: inherit;
	width: 308px;
	height: 35px;
	top: 260px;
	left: 285px;
	user-select: none;
}
#divider {
	position: inherit;
	left: 670px;
	top: 60px;
	width: 3px;
	height: 250px;
	background-color: #C0C4CC;
}
</style>