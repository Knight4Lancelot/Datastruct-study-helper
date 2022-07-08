<template>
	<div class='link-canvas-component'>
		<div class="canvas-link-node">
			<linknode
				ref="linknodeElement"
				v-for="(n, k) in nodeArray"
				:key="k"
				:index="k"
				class="link-node-list"
				:valElement="n"
				:style="{'left':String(nodePosition.X[k])+'px',
						'top':String(nodePosition.Y[k])+'px'}">
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
  data() {
	return {
		canvasEdge: null,
		canvasAxios: null,
		axiosHeight: 0,
		axiosWidth: 0,
		canvasHeight: 0,
		canvasWidth: 0,
		nodecount: 0,
		nodeArray: [ 'head' ],
		nodePosition: {
			X: [ 100 ],
			Y: [ 350 ]
		}
	}
  },  
  components: {
	linknode
  },
  mounted() {
	this.$parent.LinkList=this.nodeArray;
	this.formCanvasSize();
	this.setAxiosSize(1235, 700);
	setTimeout(()=>{ this.drawAxios(); }, 100);
  },
  methods: {
	drawEdge() {
		this.drawAxios()
		this.canvasEdge = document.getElementById("canvas-link-edge");
		var ctx = this.canvasEdge.getContext("2d");
		
		this.canvasEdge.height = this.canvasHeight;
		this.canvasEdge.width = this.canvasWidth;
		
		ctx.setLineDash([]);
		ctx.beginPath();
		ctx.strokeStyle="#56585C";
		ctx.lineWidth=3;
		for (var i = 0; i < this.nodeArray.length-1; i++) {
			ctx.moveTo(this.nodePosition.X[i]+20, this.nodePosition.Y[i]+20);
			ctx.lineTo(this.nodePosition.X[i+1]+20, this.nodePosition.Y[i+1]+20);
			ctx.stroke();
		}
	},
	formCanvasSize() {
		if (this.canvasWidth<1235) this.canvasWidth=1235;
		if (this.canvasHeight<700) this.canvasHeight=700;
	},
	setAxiosSize(width, height) {
		if (height<this.canvasHeight) { this.axiosHeight=this.canvasHeight; }
		else { this.axiosHeight=height; }
		if (width<this.canvasWidth) { this.axiosWidth=this.canvasWidth; }
		else { this.axiosWidth=width; }
	},
	hideAllNodeInfo() {
		var l = this.$refs['linknodeElement']
		for (var i = 0; i < l.length; i++) {
			l[i].isShowInfo=false;
		}
	},
	drawAxios() {
		this.canvasAxios = document.getElementById("canvas-x-y-axios");
		var ctx = this.canvasAxios.getContext("2d");
		
		this.canvasAxios.height = this.axiosHeight;
		this.canvasAxios.width = this.axiosWidth;
		
		ctx.lineWidth=1;
		ctx.setLineDash([4]); // 设置虚线
		ctx.strokeStyle = "#ccc";
		var girdSize = 50; // 网格宽度
		var xLineTotals = Math.ceil(this.canvasAxios.height / girdSize)+1;
		for (var i = 0; i < xLineTotals; i++) {
			// ctx.beginPath();
			ctx.moveTo(0, girdSize * i - 0.5);
			ctx.lineTo(this.canvasAxios.width, girdSize * i - 0.5);
			ctx.stroke();
		}
		var yLineTotals = Math.ceil(this.canvasAxios.width / girdSize)+1;
		for (var j = 0; j < yLineTotals; j++) {
			// ctx.beginPath();
			ctx.moveTo(girdSize * j, 0);
			ctx.lineTo(girdSize * j, this.canvasAxios.height);
			ctx.stroke();
		}
	},
	fresh() {
		while (this.nodeArray.length>0) this.nodeArray.pop();
	},
	addNode(index, direction) {
		if (this.nodePosition.X.length-this.nodeArray.length<=1) {
			this.pushPosition(); 
		}
		this.nodeArray.splice(index+direction, 0, '0');
		this.drawEdge();
		this.rectifyData();
		this.$parent.changeList();
	},
	delNode(index) {
		this.nodeArray.splice(index, 1);
		this.drawEdge();
		this.rectifyData();
		this.$parent.changeList();
	},
	modifyNode(index, val) {
		this.nodeArray[index] = val;
		this.$parent.changeList();
	},
	rectifyData() {
		var l = this.$refs['linknodeElement']
		for (var i = 0; i < l.length; i++) {
			if (this.nodeArray[i]!==l[i].nodeText) {
				l[i].nodeText=this.nodeArray[i];
			}
		}
	},
	pushPosition() {
		var i = this.nodePosition.X.length;
		this.nodePosition.X.push(100+i*50);
		this.nodePosition.Y.push(350-(i%2)*100);
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