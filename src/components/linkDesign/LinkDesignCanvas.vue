<template>
	<div class='link-canvas-component'>
		<div class="canvas-link-node">
			<linknode
				ref="linknodeElement"
				v-for="(stn, k) in nodeArray"
				:key="k"
				:index="stn.mapIndex"
				class="link-node-list"
				:valElement="stn.val">
			</linknode>
		</div>
		<canvas id="canvas-link-edge"/>
		<canvas id="canvas-x-y-axios"/>
	</div>
</template>

<script>
import linknode from './LinkDesignNode.vue'

export default {
  name: 'LinkCanvas',
  components: {
	linknode
  },
  mounted() {
	this.formCanvasSize()
  },
  data() {
	return {
		canvasEdge: null,
		canvasAxios: null,
		canvasHeight: 0,
		canvasWidth: 0,
		nodecount: 0,
		nodeArray: [ '1' ]
	}
  },  
  methods: {
	formCanvasSize() {
		if (this.canvasWidth<1000) this.canvasWidth=1000;
		if (this.canvasHeight<500) this.canvasHeight=500;
	},
	drawAxios() {
		this.canvasAxios = document.getElementById("canvas-x-y-axios");
		var ctx = this.canvasAxios.getContext("2d");
		
		this.canvasAxios.height = this.canvasHeight;
		this.canvasAxios.width = this.canvasWidth;
		
		ctx.lineWidth=1;
		ctx.setLineDash([4]); // 设置虚线
		ctx.strokeStyle = "#ccc";
		var girdSize = 50; // 网格宽度
		var xLineTotals = Math.ceil(this.canvasAxios.height / girdSize);
		for (var i = 0; i < xLineTotals; i++) {
			// ctx.beginPath();
			ctx.moveTo(0, girdSize * i - 0.5);
			ctx.lineTo(this.canvasAxios.width, girdSize * i - 0.5);
			ctx.stroke();
		}
		var yLineTotals = Math.ceil(this.canvasAxios.width / girdSize);
		for (var j = 0; j < yLineTotals; j++) {
			// ctx.beginPath();
			ctx.moveTo(girdSize * j, 0);
			ctx.lineTo(girdSize * j, this.canvasAxios.height);
			ctx.stroke();
		}
	},
  }
}
</script>

<style>
.link-canvas-component {
	margin: 5%;
	width: 90%;
	height: 100%;
	overflow: hidden;
}
.canvas-link-node {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 3;
}
#canvas-link-edge, #canvas-x-y-axios {
	position: absolute;
	left: 10px;
	top: 10px;
	z-index: 2;
}
</style>