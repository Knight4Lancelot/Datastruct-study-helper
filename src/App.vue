<template>
  <div id="app">
	<homehead class="main-head"></homehead>
	<div class="main-part">
		<div class="aside-body-show"
			@mouseover="changeOpacity(true)"
			@mouseleave="changeOpacity(false)">
			<div class="link-container">
				<div class="selector-head"
					style="width: 40%;">
					<router-link to="/" exact>
						<i class="el-icon-house"/>
						<transition name="head-word-transform">
							<span class="selector-head-word" v-if="showHeadWord">主页</span>
						</transition>
					</router-link>
				</div>
			</div>
			<div class="link-container" id="design-struct"
				@mouseover="openHiddenComs(1,true)"
				@mouseleave="openHiddenComs(1,false)">
				<div class="selector-head"
					style="width: 40%;">
					<i class="el-icon-edit"/>
					<transition name="head-word-transform">
						<span class="selector-head-word" v-if="showHeadWord">设计结构</span>
					</transition>
				</div>
				<transition name="hidden-list-transform">
					<div class="hidden-components" v-if="showDesignHidden&&mainOpacity!==1">
						<div><router-link to="/designlink" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>设计链表</span>
						</router-link></div>
						<div><router-link to="/designtree" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>设计树</span>
						</router-link></div>
						<div><router-link to="/designgraph" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>设计图</span>
						</router-link></div>
					</div>
				</transition>
			</div>
			<div class="link-container" id="make-code"
				@mouseover="openHiddenComs(2,true)"
				@mouseleave="openHiddenComs(2,false)">
				<div class="selector-head"
					style="width: 50%;">
					<i class="el-icon-document-remove"/>
					<transition name="head-word-transform">
						<span class="selector-head-word" v-if="showHeadWord">生成代码</span>
					</transition>
				</div>
				<transition name="hidden-list-transform">
					<div class="hidden-components" v-if="showMakeHidden&&mainOpacity!==1">
						<div><router-link to="/makelink" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>链表</span>
						</router-link></div>
						<div><router-link to="/maketree" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>二叉树</span>
						</router-link></div>
						<div><router-link to="/makegraph" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>图</span>
						</router-link></div>
					</div>
				</transition>
			</div>
			<div class="link-container" id="view-algorithm"
				@mouseover="openHiddenComs(3,true)"
				@mouseleave="openHiddenComs(3,false)">
				<div class="selector-head"
					style="width: 50%;">
					<i class="el-icon-collection"/>
					<transition name="head-word-transform">
						<span class="selector-head-word" v-if="showHeadWord">算法可视化</span>
					</transition>
				</div>
				<transition name="hidden-list-transform">
					<div class="hidden-components" v-if="showViewAlgorithm&&mainOpacity!==1">
						<div><router-link to="/" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>冒泡排序</span>
						</router-link></div>
						<div><router-link to="/" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>选择排序</span>
						</router-link></div>
					</div>
				</transition>
			</div>
		</div>
		<div class="main-body-show" :style="{'opacity':mainOpacity}">
			<transition name="main-view-show">
				<router-view></router-view>				
			</transition>
		</div>
		<div class="cover-layer" v-if="isCover"></div>
	</div>
  </div>
</template>

<script>
import { Stack, Queue, BinaryTree } from "./utils/DatastructUtils.js"
import homehead from './components/homeHead/HomeHead.vue'

export default {
	name: 'App',
	components: {
		homehead
	},
	data() {
		return {
			isCover: false,
			mainOpacity: 1,
			showHeadWord: false,
			headWordSize: 0.1,
			showDesignHidden: false, // 控制设计数据结构的隐藏组件是否显示
			showMakeHidden: false, // 控制生成代码的隐藏组件是否显示
			showViewAlgorithm: false, // 控制可视化算法的隐藏组件是否显示
			elLinkStyle: {
				'color': 'white',
				'text-decoration': 'none'
			}
		}
	},
	mounted() {
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
				// 加上隐藏组件后link-container基础高度为40，每多一个子入口加30
				case 1:
					this.showDesignHidden=true&&status
					document.getElementById('design-struct').style.height=
						this.showDesignHidden ? (130+'px') : (30+'px')
					break
				case 2:
					this.showMakeHidden=true&&status
					document.getElementById('make-code').style.height=
						this.showMakeHidden ? (130+'px') : (30+'px')
					break
				case 3:
					this.showViewAlgorithm=true&&status
					document.getElementById('view-algorithm').style.height=
						this.showViewAlgorithm ? (120+'px') : (30+'px')
					break
			}
		}
	}
}
</script>

<style lang="scss">
::-webkit-scrollbar {
	width: 0 !important;height: 0;
}
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
	height: 80px;
	width: 101%;
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
	width: 80px;
	height: 100%;
	z-index: 2;
	background-color: #545c64;
}
.aside-body-show:hover {
	transition: 0.3s;
	width: 300px;
	.link-container {
		transition: 0.2s;
		left: 15%;
	}
}
.main-body-show {
	position: inherit;
	top: 10px;
	left:110px;
	width: 93%;
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
	height: 30px;
	padding-bottom: 20px;
}
.link-container i {
	transition: 0.3s;
	font-size: 30px;
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
.link-container:hover {
	cursor: pointer;
}
.hidden-components {
	width: 60%;
	padding-top:10px;
	position: inherit;
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
// 下面为transition的移动动画
// router-view的过渡动画
.main-view-show-enter-active { 
  transition:all 1s;
}
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
  transition:all 0.8s;
}
.head-word-transform-enter {
  opacity:0;
  transform:translateX(-20px);
}
.head-word-transform-leave-to { 
  opacity:0;
  // transform:translateX(-100px);
}
// 边栏的选项头下的隐藏组件的显示与隐藏的过渡动画
.hidden-list-transform-enter-active, .hidden-list-transform-leave-active { 
  transition:all 0.2s;
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
