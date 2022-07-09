<template>
	<div>
		<div class="tips-node" style="left: 10px;">
			<div class="sample-node"
				style="border:3px solid #218EFF;background-color:#E3F0FF;">node</div>
			<span style="position:absolute;left:60px;width:200px">已经完成排序的节点</span>
		</div>
		<div class="tips-node" style="left: 280px;">
			<div class="sample-node"
				style="border:3px solid #EEB155;background-color:#FEECD2;">node</div>
			<span style="position:absolute;left:60px;width:200px">当前指针正指向的节点</span>
		</div>
		<div class="tips-node" style="left: 560px;">
			<div class="sample-node"
				style="border:3px solid #909399;background-color:#EBEEF5;">node</div>
			<span style="position:absolute;left:60px;width:200px">尚未完成排序的节点</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HoverTips'
}
</script>

<style>
.tips-node {
	position: absolute;
	font-size: 18px;
	color: #535558;
	font-family: 'Microsoft YaHei';	
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