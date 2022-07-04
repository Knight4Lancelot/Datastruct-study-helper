<template>
	<div class="design-hover-menu-control">
		<button class="design-hover-menu-button"
			@click="()=>{ this.$parent.jumpTo(1); }">
			<i class="el-icon-caret-top"></i>
			<span class="hover-menu-description">前往页面顶部</span>
		</button>
		<button class="design-hover-menu-button"
			@click="()=>{ this.$parent.jumpTo(2); }">
			<i class="el-icon-s-promotion"></i>
			<span class="hover-menu-description">前往结构设计</span>
		</button>
		<button class="design-hover-menu-button"
			@click="()=>{ this.$parent.jumpTo(3); }">
			<i class="el-icon-s-claim"></i>
			<span class="hover-menu-description">前往数组结果</span>
		</button>
		<button class="design-hover-menu-button"
			@click="()=>{ this.$parent.jumpTo(4); }">
			<i class="el-icon-s-management"></i>
			<span class="hover-menu-description">前往结构代码</span>
		</button>
		<button class="design-hover-menu-button"
			@click="()=>{ this.$parent.jumpTo(5); }">
			<i class="el-icon-caret-bottom"></i>
			<span class="hover-menu-description">前往页面底部</span>
		</button>
	</div>
</template>

<script>
export default {
	name: 'HoverMenu'
}
</script>

<style>
.design-hover-menu-control {
	width: 50px;
	user-select: none;
}
.design-hover-menu-button {
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
.design-hover-menu-button:hover {
	transition: 0.3s;
	width: 220px;
	height: 70px;
	/* border: 2px solid #C0C4CC; */
	border-bottom-left-radius:50px;
	border-top-left-radius:50px;
	border-bottom-right-radius:50px;
    border-top-right-radius:50px;
}
.design-hover-menu-button i {
	position: absolute;
	left: 8px;
	top: 8px;
	transition: 0.3s;
	font-size: 20px;
	color: #6A6A6A;
}
.design-hover-menu-button:hover i {
	transition: 0.3s;
	left: 20px;
	top: 17px;
	font-size: 30px;
	color: #62AFFF;
}
.design-hover-menu-button:hover span {
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