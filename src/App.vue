<template>
  <div id="app">
	<div class="main-head">head</div>
	<div class="main-part">
		<div class="aside-body-show"
			@mouseover="changeOpacity(true)"
			@mouseleave="changeOpacity(false)">
			<div class="link-container">
				<div class="selector-head"
					style="width: 60%;">
					<router-link to="/" exact>
						<i class="el-icon-house"/>
						<transition name="head-word-transform">
							<span class="selector-head-word" v-if="showHeadWord">主页</span>
						</transition>
					</router-link>
				</div>
			</div>
			<div class="link-container"
				@mouseover="openHiddenComs(1,true)"
				@mouseleave="openHiddenComs(1,false)">
				<div class="selector-head"
					style="width: 60%;">
					<i class="el-icon-edit"/>
					<transition name="head-word-transform">
						<span class="selector-head-word" v-if="showHeadWord">设计结构</span>
					</transition>
				</div>
				<transition name="hidden-list-transform">
					<div class="hidden-components" v-if="showDesignHidden&&mainOpacity!==1">
						<div><router-link to="/designtree" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>设计树</span>
						</router-link></div>
						<div><router-link to="/designlink" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>设计链表</span>
						</router-link></div>
					</div>
				</transition>
			</div>
			<div class="link-container"
				@mouseover="openHiddenComs(2,true)"
				@mouseleave="openHiddenComs(2,false)">
				<div class="selector-head"
					style="width: 60%;">
					<i class="el-icon-document-remove"/>
					<transition name="head-word-transform">
						<span class="selector-head-word" v-if="showHeadWord">生成代码</span>
					</transition>
				</div>
				<transition name="hidden-list-transform">
					<div class="hidden-components" v-if="showMakeHidden&&mainOpacity!==1">
						<div><router-link to="/maketree" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>二叉树</span>
						</router-link></div>
						<div><router-link to="/makelink" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>链表</span>
						</router-link></div>
					</div>
				</transition>
			</div>
		</div>
		<div class="main-body-show" :style="{'opacity':mainOpacity}">
			<transition name="main-view-show"><router-view></router-view></transition>
		</div>
		<div class="cover-layer" v-if="isCover"></div>
	</div>
  </div>
</template>

<script>
import { Stack, Queue, BinaryTree } from "./utils/DatastructUtils.js"

export default {
	name: 'App',
	data() {
		return {
			isCover: false,
			mainOpacity: 1,
			showHeadWord: false,
			headWordSize: 0.1,
			showDesignHidden: false, // 控制设计数据结构的隐藏组件是否显示
			showMakeHidden: false, // 控制生成代码的隐藏组件是否显示
			elLinkStyle: {
				'color': 'white',
				'text-decoration': 'none'
			}
		}
	},
	mounted() {
		// var list=[ "S", "0", "0", "0", "0", "0", "0", "nil", "0", "0", 
		// 			"0", "0", "0", "0", "0", "nil", "nil", "0", "nil",
		// 			"0", "0", "nil", "nil", "nil", "nil", "0", "nil",
		// 			"nil", "0", "0", "0", "nil", "nil", "nil", "nil",
		// 			"nil", "nil", "nil", "nil", "nil", "nil", "nil",
		// 			"0", "nil", "nil", "nil", "nil", "nil", "nil",
		// 			"nil", "nil", "nil", "nil", "nil", "nil", "nil",
		// 			"nil", "0" ]
		// var s = new BinaryTree(list)
		// console.log(s.descendantIndexs(0))
		// s.getPositionX(50)
	},
	methods: {
		changeOpacity(status) {
			this.isCover=status
			this.mainOpacity = status ? 0.6 : 1
			this.showHeadWord = status
			this.headWordSize = status ? 16 : 0.1
		},
		openHiddenComs(index, status) {
			switch (index) {
				case 1:
					this.showDesignHidden=true&&status
					break
				case 2:
					this.showMakeHidden=true&&status
					break
			}
		}
	}
}
</script>

<style lang="scss">
#app {
	padding: 0;
	margin: 0;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 99%;
	height: 100%;
	border: hidden;
}
.main-head {
	position: absolute;
	height: 10%;
	width: 101%;
	background-color: #606266;
}
.main-part {
	position: absolute;
	top: 10%;
	height: 90%;
	width: 99%;
}
.aside-body-show {
	transition: 0.3s;
	position: inherit;
	width: 5%;
	height: 100%;
	z-index: 2;
	background-color: #545c64;
}
.aside-body-show:hover {
	transition: 0.3s;
	width: 20%;
	.link-container {
		transition: 0.2s;
		left: 15%;
	}
}
.main-body-show {
	position: inherit;
	top: 2%;
	left: 10%;
	width: 90%;
	height: 90%;
	z-index: 0;
}
.cover-layer {
	position: inherit;
	left: 6%;
	width: 96%;
	height: 100%;
	background-color: #909399;
	z-index: 1;
	opacity: 0.35;
}
.link-container {
	transition: 0.4s;
	position: relative;
	left: 30%;
	margin-top: 25px;
	width: 55%;
	padding-bottom: 20px;
}
.link-container i {
	transition: 0.3s;
	font-size: 28px;
	// color: #DCDFE6;
	color: blanchedalmond;
}
.selector-head-word {
	padding-top: 5px;
	font-size: 17px;
	position: absolute;
	user-select: none;
	transition: 0.15s;
	// color:  #DCDFE6;
	color: blanchedalmond;
	padding-left: 20px;
}
.hidden-components {
	padding-top:10px;
	position: absolute;
	margin-left: 20%;
	div i {
		font-size: 16px;
		color: #CFD7DE;
	}
	div span {
		user-select: none;
		margin-left: 15px;
		color: #CFD7DE;
	}
	div {
		margin-top: 15px;
		position: inherit;
		:hover {
			cursor: pointer;
			color: #5EADFF;
			i { color: #5EADFF; }
			span { color: #5EADFF; }
		}
	}
}
.selector-head:hover {
	cursor: pointer;
	i,span {
		transition: 0.3s;
		color: #5EADFF;
	}
	.description {
		color: black;
	}
}
// 下面为transition的移动动画
// router-view的过渡动画
.main-view-show-enter-active { 
  transition:all 1s;
}
// .main-view-show-leave-active { 
//   transition:all 0.1s;
// }
.main-view-show-enter {
  opacity:0;
  transform:translateY(1000px);
}
.main-view-show-leave-to { 
  opacity:0;
  transform:translateY(-20px);
}
// 边栏的选项头描述文字的显示与隐藏的过渡动画
.head-word-transform-enter-active { 
  transition:all 1s;
}
.head-word-transform-enter {
  opacity:0;
  transform:translateX(-20px);
}
.head-word-transform-leave-to { 
  opacity:0;
  transform:translateX(-100px);
}
// 边栏的选项头下的隐藏组件的显示与隐藏的过渡动画
.hidden-list-transform-enter-active { 
  transition:all 0.6s;
}
.hidden-list-transform-leave-active { 
  transition:all 0.1s;
}
.hidden-list-transform-enter {
  opacity:0;
  transform:translateY(-20px);
}
.hidden-list-transform-leave-to { 
  opacity:0;
  transform:translateY(-20px);
}
</style>
