<template>
	<div class="top-container">
		<button @click="()=>{ this.$parent.changeHelperStatus(false); }"
			style="position:absolute;background-color:#FBFBFB;border:none;">
			<i class="el-icon-close" style="font-size:30px;color:#909399;cursor:pointer;"></i>
		</button>
		<div id="funtion-introduction-1">
			<span class="introduction-head">
				<i class="el-icon-arrow-left" />&nbsp;返回数组设计
			</span>
			<span class="introduction-text">&nbsp;&nbsp;&nbsp;&nbsp;
				点击此按钮以回到输入待排序数组的界面。但是确定使用此功能后，当前排序的所有数据都不会被保存。
			</span>
		</div>
		<div id="funtion-introduction-2">
			<span class="introduction-head">
				<i class="el-icon-refresh-right" />&nbsp;刷新演示页面
			</span>
			<span class="introduction-text">&nbsp;&nbsp;&nbsp;&nbsp;
				点击此按钮后，当前演示页面的内容会被刷新，也就是当前可视化数组的节点顺序内容会被重置到最初的未排序状态。
			</span>
		</div>
		<div id="funtion-introduction-3">
			<span class="introduction-head">
				<i class="el-icon-right" />&nbsp;完成全部过程
			</span>
			<span class="introduction-text">&nbsp;&nbsp;&nbsp;&nbsp;
				点击此按钮后，可视化数组会直接开始动画演示直到完成所有节点的排序。
			</span>
		</div>
		<div id="funtion-introduction-4">
			<span class="introduction-head">
				<i class="el-icon-arrow-right" />&nbsp;完成一趟排序
			</span>
			<span class="introduction-text">&nbsp;&nbsp;&nbsp;&nbsp;
				点击此按钮后，可视化数组动画演示一趟排序的过程，不会直接演示所有的过程，后续每一趟需要用户继续点击各种执行功能按钮进行。
			</span>
		</div>
		<div id="funtion-introduction-5">
			<span class="introduction-head">
				<i class="el-icon-d-arrow-right" />&nbsp;直接展示结果
			</span>
			<span class="introduction-text">&nbsp;&nbsp;&nbsp;&nbsp;
				点击此按钮后，页面会跳过动画直接展示排序后的数组结果。
			</span>
		</div>
		<div id="funtion-introduction-6">
			<span class="introduction-head">
				<i class="el-icon-bell" />&nbsp;附加提示
			</span>
			<span class="introduction-text">&nbsp;&nbsp;&nbsp;&nbsp;
				以上的演示功能在各自执行过程中且未完成的时候，不允许中间执行其他的演示执行命令。但是其他功能还是可以正常使用。
			</span>
		</div>
		<div id="last-blank-area"></div>
	</div>
</template>

<script>
export default {
	name: 'FunctionHelper'
}
</script>

<style>
#funtion-introduction-1 {
	position: inherit;
	width: 100%;
	left: 40px;
	top: 50px;
}
#funtion-introduction-2 {
	position: inherit;
	width: 100%;
	left: 40px;
	top: 170px;
}
#funtion-introduction-3 {
	position: inherit;
	width: 100%;
	left: 40px;
	top: 290px;
}
#funtion-introduction-4 {
	position: inherit;
	width: 100%;
	left: 40px;
	top: 380px;
}
#funtion-introduction-5 {
	position: inherit;
	width: 100%;
	left: 40px;
	top: 500px;
}
#funtion-introduction-6 {
	position: inherit;
	width: 100%;
	left: 40px;
	top: 590px;
}
#last-blank-area {
	position: inherit;
	width: 100%;
	top: 590px;
	height: 200px;
}
.top-container {
	padding: 10px;
	border: 1px solid #C0C4CC;
	width: 1000px;
	height: 500px;
	max-height: 500px;
	overflow-x: hidden;
	overflow-y: scroll;
	border-radius: 15px;
	background-color: #FBFBFB;
}
.top-container span {
	font-family: "Microsoft YaHei";
	color: #303133;
}
.introduction-head {
	position: inherit;
	font-size: 25px;
	left: 40px;
	margin-top: 20px;
}
.introduction-head i {
	color: #409EFF;
	font-size: 30px;;
}
.introduction-text {
	position: inherit;
	font-size: 19px;
	font-weight: 100;
	left: 75px;
	width: 700px;
	margin-top: 65px;
}
</style>