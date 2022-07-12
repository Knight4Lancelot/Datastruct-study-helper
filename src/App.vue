<template>
  <div id="app">
	<homehead class="main-head"
		:style="{'width':String(appWidth)+'px'}"></homehead>
	<div class="main-part"
		:style="{'height':String(appHeight-80)+'px',
				'width': String(appWidth-10)+'px'}">
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
						<div><router-link to="/design/link" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>设计链表</span>
						</router-link></div>
						<div><router-link to="/design/tree" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>设计树</span>
						</router-link></div>
						<div><router-link to="/design/graph" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>设计图</span>
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
						<div><router-link to="/algorithm/popsort" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>冒泡排序</span>
						</router-link></div>
						<div><router-link to="/algorithm/selectionsort" exact style="text-decoration: none;">
							<i class="el-icon-caret-right"/><span>选择排序</span>
						</router-link></div>
					</div>
				</transition>
			</div>
		</div>
		<div class="main-body-show"
			:style="mainBodyShowStyle">
			<transition name="main-view-show">
				<router-view ref='target-view'></router-view>				
			</transition>
		</div>
		<div class="cover-layer" v-if="isCover"
			:style="{'height':String(appHeight-80)+'px',
					'width': String(appWidth)+'px'}"></div>
	</div>
  </div>
</template>

<script>
import { Stack, Queue, BinaryTree } from "./utils/DatastructUtils.js"
import homehead from './components/homeHead/HomeHead.vue'

const initHeight=document.documentElement.clientHeight
const initWidth=document.documentElement.clientWidth

export default {
	name: 'App',
	components: {
		homehead
	},
	data() {
		return {
			appHeight: 0,
			appWidth: 0,
			isCover: false,
			mainOpacity: 1,
			showHeadWord: false,
			headWordSize: 0.1,
			mainBodyShowStyle: null,
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
		this.formSize()
		this.mainBodyShowStyle = {'opacity':this.mainOpacity,
					'overflow-y':'scroll',
					'width':String(this.appWidth-80)+'px',
					'height': String(this.appHeight-80)+'px',
					'max-height': String(this.appHeight-80)+'px'};
		window.onresize = () => {
			if(!this.timer) {
				this.timer = true
				let that = this
				setTimeout(function(){
					that.formSize()
					that.timer = false
				},400)
			}
			if (this.appWidth < 1000) { this.appWidth = 1000 }
			if (document.location.href !== document.location.origin+'/') {
				this.$refs['target-view'].formCanvasSize()
			}
		}	
	},
	methods: {
		isHideScrollY(status) {
			this.mainBodyShowStyle['overflow-y'] = status ? 'scroll':'hidden';
		},
		formSize() {
			this.appHeight = document.documentElement.clientHeight
			this.appWidth = document.documentElement.clientWidth
			// if (this.appHeight < 1000) { this.appHeight = 1000 }
			if (this.appWidth < initWidth) { this.appWidth = initWidth; }
		},
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
// ::-webkit-scrollbar {
// 	width: 0 !important;height: 0;
// }
::-webkit-scrollbar {
	width: 10px;
	height: 12px;
}
::-webkit-scrollbar-thumb {
	border-radius: 8px; 
	background: #ABADAF;
}
::-webkit-scrollbar-corner {
	opacity: 0;
}
#app {
	border-bottom: 2px solid black;
	overflow-y: hidden;
	padding: 0;
	margin: 0;
	border: 0;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	border: hidden;
}
.main-head {
	position: absolute;
	height: 80px;
}
.main-part {
	position: absolute;
	top: 80px;
}
.aside-body-show {
	transition: 0.3s;
	position: inherit;
	width: 80px;
	height: 100%;
	z-index: 2;
	background-color: #545c64;
	font-family: "Microsoft YaHei";
	overflow-y: scroll;
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
	// top: 10px;
	left:80px;
	// width: 100%;
	// height: 100%;
	z-index: 0;
}
.cover-layer {
	position: inherit;
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
  transform:translateY(-100px);
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
