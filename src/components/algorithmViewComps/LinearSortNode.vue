<template>
	<div class="linear-sort-node">
		<div class="table-node-pillar"
			:style="{'height':String(pillarH)+'px'}"
		></div>
		<div class="linear-table-node" v-text="valElement"></div>
	</div>
</template>

<script>
export default {
	name: 'LinearSortNode',
	props: {
		pillarHeight: Number,
		index: Number,
		valElement: String
	},
	data() {
		return {
			pillarH: 0
		}
	},
	mounted() {
		this.pillarH = this.pillarHeight;
	},
	methods: {
	}
}
</script>

<style>
.linear-sort-node {
	user-select: none;
	/* border: 1px solid; */
}
.table-node-pillar {
	transition: 0.6s;
	position: inherit;
	width: 20px;
	left: 18px;
	bottom: 60px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background-color: #4CB817;
}
.linear-table-node {
	position: inherit;
	width: 50px;
	height: 30px;
	bottom: 0;
	border: 3px solid #909399;
	font-size: 18px;
	text-align: center;
	padding-top: 5px;
	border-radius: 10px;
	color: #535558;
	font-family: 'Microsoft YaHei';
}
</style>