<template>
	<div>
		<el-button type="danger" @click="add()">Add</el-button>
		<el-button type="danger" @click="decrease()">decrease</el-button><br><br>
		<el-button type="success"
			v-for="(l, k) in list"
			v-text="l"
			:key="k"
			></el-button><br>
		<el-button type="danger" @click="add()">Add</el-button>
		<el-button type="danger" @click="decrease()">decrease</el-button><br><br>
		<canvas class="ca"></canvas>
	</div>
</template>

<script>
export default {
	name: 'TestPage',
	data() {
		return {
			list: [1]
		}
	},
	methods: {
		add() {
			this.list.push(this.list.length+1)
		},
		decrease() {
			this.list.pop()
		}
	}
}
</script>

<style>
.ca {
	border: 2px solid black;
}
</style>