<template>
	<div>
		<HoverTips class="hover-tips"
			:style="{'left':String(canvasWidth-650)+'px'}" />
		<AlgorithmCanvas id="pop-sort-canvas"
			ref="hoverTips"
			:nodelist="list"
			:style="{'overflow-y':'scroll',
				'overflow-x':'scroll',
				'max-height':String(canvasHeight)+'px',
				'max-width':String(canvasWidth)+'px'}" />
	</div>
</template>

<script>
import AlgorithmCanvas from '../../components/algorithmViewComps/PopSortCanvas.vue'
import HoverTips from '../../components/algorithmViewComps/HoverTips.vue'

export default {
	name: 'PopSortHomeView',
	components: {
		AlgorithmCanvas,
		HoverTips
	},
	data() {
		return {
			canvasHeight: 0,
			canvasWidth: 0,
			list: [11,2,33,5,14,23]
		}
	},
	mounted() {
		this.formCanvasSize();
	},
	methods: {
		formCanvasSize() {
			var canvas = this.$refs['hoverTips'];
			this.canvasHeight=document.documentElement.clientHeight-250;
			this.canvasWidth=document.documentElement.clientWidth-350;
			if (this.canvasHeight<630) { this.canvasHeight=630; }
			if (this.canvasHeight>1000) { this.canvasHeight=1000; }
			if (this.canvasWidth<1000) { this.canvasWidth=1000; }
			canvas.$el.style.height = String(this.canvasHeight)+'px';
			canvas.$el.style.width = String(this.canvasWidth)+'px';
		}
	}
}
</script>

<style>
#pop-sort-canvas {
	position: absolute;
	border: 2px solid #DCDFE6;
	border-radius: 20px;
	left: 150px;
	top: 100px;
}
#pop-sort-canvas:hover {
	border-color: #909399;
}
.hover-tips {
	position: absolute;
	/* border: 1px solid; */
	top: 30px;
	left: 750px;
	height: 40px;
	width: 800px;
	padding-top: 20px;
}
</style>