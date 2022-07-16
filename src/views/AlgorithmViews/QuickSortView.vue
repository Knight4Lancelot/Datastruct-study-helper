<template>
	<div>
		<transition name="input-index-fade">
			<ListInput v-if="showInputIndex"
				:sortType = "'快速排序'"
				ref="inputSource" />
		</transition>
		<div class="show-helper-cover-layer"
			:style="{'width':String(appWidth)+'px'}"
			v-if="showHelper"/>
		<transition name="player-index-fade">
			<HoverMenu class="linear-algorithm-hover-menu"
				v-if="!showInputIndex"/>
		</transition>
		<transition name="player-index-fade">
			<HoverTips class="top-tips"
				v-if="!showInputIndex"
				:style="{'width':String(canvasWidth)+'px'}" />
		</transition>
		<transition name="player-index-fade">
			<AlgorithmCanvas id="pop-sort-canvas"
				ref="showPlayer"
				v-if="!showInputIndex"
				:nodelist="list"
				:style="{'width':String(canvasWidth)+'px'}" />
		</transition>
		<transition name="introduction-fade">
			<FunctionHelper class="function-introduction"
				v-if="showHelper"
				:style="{'left':String(((appWidth-1000)/2-40)<200 ? 200 : ((appWidth-1000)/2-40))+'px',
					'top':String((appHeight-500)/2-50)+'px'}"/>
		</transition>
	</div>
</template>

<script>
import AlgorithmCanvas from '../../components/algorithmViewComps/QuickSortCanvas.vue';
import HoverTips from '../../components/algorithmViewComps/HoverTips.vue';
import ListInput from '../../components/algorithmViewComps/LinearAlgorithmInput.vue';
import HoverMenu from '../../components/LinearAlgorithmHoverMenu.vue';
import FunctionHelper from '../../components/FunctionHelper.vue';

export default {
	name: 'QuickSortHomeView',
	components: {
		AlgorithmCanvas,
		HoverTips,
		ListInput,
		HoverMenu,
		FunctionHelper
	},
	data() {
		return {
			appHeight: 0,
			appWidth: 0,
			showInputIndex: true,
			showHelper: false,
			canvasWidth: 1400,
			list: [],
			playerMutex: false,
			RegPattern: new RegExp('^\\+?-?\\d+$')
		}
	},
	mounted() {
		this.formCanvasSize();
	},
	methods: {
		formCanvasSize() {
			this.appWidth=document.documentElement.clientWidth;
			this.appHeight=document.documentElement.clientHeight;
			this.canvasWidth = this.appWidth-450;
			if (this.canvasWidth<1250) { this.canvasWidth=1250; }
		},
		openSortPlayer() {
			var isDataLegal = true;
			var i = 0;
			var list = this.$refs['inputSource'].rankList;
			for (i = 0; i < list.length; i++) {
				if (list[i].length===0 ||
					list[i].length>5 ||
					list[i].match(this.RegPattern)===null) {
						isDataLegal = false;
						break;
					}
			}
			if (!isDataLegal) {
				this.$message({
					showClose: true,
					message: '当前输入存在不合法数据，具体可以打开预览进行查看',
					type: 'error'});
				return;
			}
			while(this.list.length>0) { this.list.pop(); }
			this.list = this.$refs['inputSource'].rankList.concat();
			for (i = 0; i < this.list.length; i++) {
				this.list[i] = parseInt(this.list[i]);
			}
			this.$message({
				showClose: true,
				message: '开始快速排序！',
				type: 'success'
			});
			this.showInputIndex = false;
		},
		changeHelperStatus(status) {
			this.showHelper = status;
			this.$parent.isHideScroll(!status);
		},
		backToInputIndex() {
			this.playerMutex = false;
			this.showInputIndex=true;
		},
		refreshPlayer() {
			// this.playerMutex = false;
			// this.showInputIndex=true;
			// this.$nextTick(()=>{
			// 	this.showInputIndex=false;
			// });
			this.$refs['showPlayer'].refreshAll()
		},
		playSortAll() {
			this.$refs['showPlayer'].popSortAll();
		},
		playSortOneTime() {
			this.$refs['showPlayer'].popSortOneTime();
		},
		ShowFinalList() {
			this.$refs['showPlayer'].showFinalList();
		}
	}
}
</script>

<style>
#pop-sort-canvas {
	position: absolute;
	border: 1px solid #C0C4CC;
	border-radius: 10px;
	top: 100px;
	left: 200px;
	height: 750px;
}
.show-helper-cover-layer {
	position: absolute;
	z-index: 3;
	height: 110%;
	background-color: #909399;
	opacity: 0.35;
}
.function-introduction {
	position: absolute;
	z-index: 5;
}
.linear-algorithm-hover-menu {
	position: fixed;
	z-index: 2;
	margin-top: 100px;
	margin-left: 50px;
	height: 300px;
	width: 50px;
}
.top-tips {
	position: absolute;
	/* border: 1px solid; */
	left: 200px;
	top: 30px;
	height: 40px;
	width: 800px;
	padding-top: 20px;
}
.introduction-fade-enter-active, .introduction-fade-leave-active { 
  transition:all 1s;
}
.introduction-fade-enter {
  opacity:0;
  transform:translateY(-700px);
}
.introduction-fade-leave-to { 
  opacity:0;
  transform:translateY(-700px);
}
.input-index-fade-enter-active, .input-index-fade-leave-active { 
  transition:all 1s;
}
.input-index-fade-enter {
  opacity:0;
  transform:translateX(-100px);
}
.input-index-fade-leave-to { 
  opacity:0;
  transform:translateX(-100px);
}
.player-index-fade-enter-active, .player-index-fade-leave-active { 
  transition:all 1s;
}
.player-index-fade-enter {
  opacity:0;
  transform:translateX(1000px);
}
.player-index-fade-leave-to { 
  opacity:0;
  transform:translateX(1000px);
}
</style>