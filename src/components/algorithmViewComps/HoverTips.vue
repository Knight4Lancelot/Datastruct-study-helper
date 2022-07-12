<template>
	<div>
		<div class="current-status-show">
			<div :style="{
				'position': 'inherit',
				'height': '20px',
				'width': '20px',
				'border-radius': '50%',
				'background-color': currentStatus.lightColor
			}" />
			<span v-text="currentStatus.text"
				style="margin-left:30px;"/>
		</div>
		<div class="tips-node" style="right: 770px;">
			<div class="sample-node"
				style="border:3px solid #218EFF;background-color:#E3F0FF;">node</div>
			<span style="position:absolute;left:60px;width:200px">已经完成排序的节点</span>
		</div>
		<div class="tips-node" style="right: 500px;">
			<div class="sample-node"
				style="border:3px solid #EEB155;background-color:#FEECD2;">node</div>
			<span style="position:absolute;left:60px;width:200px">当前指针正指向的节点</span>
		</div>
		<div class="tips-node" style="right: 220px;">
			<div class="sample-node"
				style="border:3px solid #909399;background-color:#EBEEF5;">node</div>
			<span style="position:absolute;left:60px;width:200px">尚未完成排序的节点</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HoverTips',
	computed: {
		currentStatus() {
			return this.$parent.playerMutex ?
				{ text: '当前正有动画执行中', lightColor: '#FF2C2C' }:
				{ text: '当前无执行动画', lightColor: '#49DC00' };
		}
	}
}
</script>

<style>
.tips-node {
	position: inherit;
	font-size: 18px;
	color: #535558;
	font-family: 'Microsoft YaHei';	
}
.current-status-show {
	position: inherit;
	width: 200px;
}
.current-status-show span {
	position: inherit;
	top: 20px;
	color: #535558;
	font-family: 'Microsoft YaHei';	
}
.current-status-show div {
	position: inherit;
	top: 20px;
}
.tips-node span {
	user-select: none;
	padding: 3px;
}
.sample-node {
	user-select: none;
	position: inherit;
	height: 25px;
	width: 50px;
	padding: 0;
	text-align: center;
	font-size: 16px;
	border-radius: 10px;
	color: #535558;
	font-family: 'Microsoft YaHei';
}
</style>