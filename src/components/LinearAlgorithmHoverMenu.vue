<template>
	<div style="user-select: none;">
		<button class="linear-algorithm-hover-menu-button"
			@click="()=>{ this.$parent.changeHelperStatus(true); }">
			<i class="el-icon-s-opportunity"></i>
			<span class="hover-menu-description">各个功能说明</span>
		</button>
		<button class="linear-algorithm-hover-menu-button"
			@click="()=>{ this.$parent.backToInputIndex(); }">
			<i class="el-icon-arrow-left"></i>
			<span class="hover-menu-description">返回数组设计</span>
		</button>
		<button class="linear-algorithm-hover-menu-button"
			@click="()=>{ this.$parent.refreshPlayer(); }">
			<i class="el-icon-refresh-right"></i>
			<span class="hover-menu-description">刷新演示内容</span>
		</button>
		<button class="linear-algorithm-hover-menu-button"
			@click="()=>{ 
				if (this.$parent.playerMutex) {
					this.$message({
						showClose: true,
						message: '当前有动画正在执行中，请等待完成后再开始下一段演示',
						type: 'error'});
				} else { this.$parent.playPopSortAll(); }
			}">
			<i class="el-icon-caret-right"></i>
			<span class="hover-menu-description">完成全部过程</span>
		</button>
		<button class="linear-algorithm-hover-menu-button"
			@click="()=>{
				if (this.$parent.playerMutex) {
					this.$message({
						showClose: true,
						message: '当前有动画正在执行中，请等待完成后再开始下一段演示',
						type: 'error'});
				} else { this.$parent.playPopSortAll(); }
			}">
			<i class="el-icon-arrow-right"></i>
			<span class="hover-menu-description">完成一趟比较</span>
		</button>
		<button class="linear-algorithm-hover-menu-button"
			@click="()=>{
				if (this.$parent.playerMutex) {
					this.$message({
						showClose: true,
						message: '当前有动画正在执行中，请等待完成后再开始下一段演示',
						type: 'error'});
				} else { this.$parent.playPopSortAll(); }
			}">
			<i class="el-icon-d-arrow-right"></i>
			<span class="hover-menu-description">直接展示结果</span>
		</button>
	</div>
</template>

<script>
</script>

<style>
.linear-algorithm-hover-menu-button {
	transition: 0.3s;
	position: relative;
	cursor: pointer;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 2px solid #C0C4CC;
	/* border: 2px solid #ffffff; */
	background-color: #ffffff;
	margin: 5px;
	overflow: hidden;
}
.linear-algorithm-hover-menu-button:hover {
	transition: 0.3s;
	width: 220px;
	height: 70px;
	/* border: 2px solid #C0C4CC; */
	border-bottom-left-radius:50px;
	border-top-left-radius:50px;
	border-bottom-right-radius:50px;
    border-top-right-radius:50px;
}
.linear-algorithm-hover-menu-button i {
	position: absolute;
	left: 8px;
	top: 8px;
	transition: 0.3s;
	font-size: 20px;
	color: #6A6A6A;
}
.linear-algorithm-hover-menu-button:hover i {
	transition: 0.3s;
	left: 20px;
	top: 17px;
	font-size: 30px;
	color: #62AFFF;
}
.linear-algorithm-hover-menu-button:hover span {
	transition: 0.3s;
	font-size: 19px;
	color: #62AFFF;
}
.hover-menu-description {
	position: inherit;
	margin-left: 20px;
	color: #62AFFF;
	width: 120px;
	font-family: 'Microsoft YaHei';
	font-size: 0px;
}
</style>