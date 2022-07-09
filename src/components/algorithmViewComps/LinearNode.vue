<template>
	<div class="linear-sort-node">
		<div class="table-node-pillar"
			:style="{'height':String(pillarH)+'px'}"/>
		<div class="linear-table-node"
			v-text="valElement"
			:style="currentNodeStyle"/>
	</div>
</template>

<script>
export default {
	name: 'LinearSortNode',
	props: {
		pillarHeight: Number,
		valElement: String,
		initStatus: Number
	},
	data() {
		return {
			pillarH: 0,
			currentStatus: 0,
			statusStyle: [
				{ 'border' : '2px solid #909399', 'background-color': '#F2F6FC'}, // 未完成
				{ 'border' : '3px solid #EEB155', 'background-color': '#FEECD2'}, // 当前正在
				{ 'border' : '3px solid #218EFF', 'background-color': '#E3F0FF'}, // 已完成
				{ 'border' : '2px solid #909399', 'background-color': 'white'} // 无用节点
			]
		}
	},
	computed: {
		currentNodeStyle() {
			return this.statusStyle[this.currentStatus];
		}
	},
	mounted() {
		this.pillarH = this.pillarHeight;
		this.currentStatus = this.initStatus;
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
	transition: 0.5s;
	position: inherit;
	width: 20px;
	left: 18px;
	bottom: 60px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background-color: #4CB817;
}
.linear-table-node {
	transition: 0.1s;
	position: inherit;
	width: 50px;
	height: 30px;
	bottom: 0;
	font-size: 18px;
	text-align: center;
	padding-top: 5px;
	border-radius: 10px;
	color: #535558;
	font-family: 'Microsoft YaHei';
}
</style>