<template>
	<div >
		<node class="nodes-comps"
			v-for="(n, k) in rankNodeList"
			ref="nodeComps"
			:key="k"
			:pillarHeight="pillarHeights[k]"
			:index="0"
			:valElement="String(n)"
			:style="{'left':String(pillarLeftX[k])+'px'}"
		/>
		<pointer class="nodes-pointer"
			ref="pointer-i"
			:pointerText="'i'" />
		<pointer class="nodes-pointer"
			ref="pointer-j"
			:pointerText="'j'" />
		<button @click="popSortAll()">开始冒泡排序</button>
	</div>
</template>

<script>
import node from './LinearNode.vue';
import pointer from './LinearPointer.vue';

const exchangeDuration = 1;

export default {
	name: 'PopSortCanvas',
	components: {
		node,
		pointer
	},
	data() {
		return {
			initNodeList: [],
			initPillarLeftX: [],
			rankNodeList: [],
			pillarHeights: [],
			pillarLeftX: []
		}
	},
	props: {
		nodelist: Array
	},
	mounted() {
		var min = this.nodelist[0], max = this.nodelist[0];
		var di_min = 0, di_max = 0;
		for (var i = 0; i < this.nodelist.length; i++) {
			this.initNodeList.push(this.nodelist[i]);
			this.rankNodeList.push(this.nodelist[i]);
			this.pillarHeights.push(this.nodelist[i]);
			this.pillarLeftX.push(120+i*60);
			if (min>this.nodelist[i]) { min=this.nodelist[i]; }
			if (max<this.nodelist[i]) { max=this.nodelist[i]; }
		}
		this.initPillarLeftX = this.pillarLeftX.concat();
		// 条形图高度缩放法则：所有数据最大值和最小值数量级差一位以内用线性，差两位开根号，差三位开三次方
		if (min<0) {
			min = -min;
			max += (2*min);
			for (i = 0; i < this.pillarHeights.length; i++) {
				this.pillarHeights[i] += (2*min);
			}
		}
		di_min = String(min).length;
		di_max = String(max).length;
		switch(true) {
			case di_max-di_min<2:
				for (i = 0; i < this.pillarHeights.length; i++) {
					this.pillarHeights[i] = 400*this.pillarHeights[i]/max;
				}
				break;
			case di_max-di_min<3:
				for (i = 0; i < this.pillarHeights.length; i++) {
					this.pillarHeights[i] = 400*Math.sqrt(this.pillarHeights[i]/max);
				}
				break;
			default:
				for (i = 0; i < this.pillarHeights.length; i++) {
					this.pillarHeights[i] = 400*Math.sqrt(this.pillarHeights[i]/max, 3);
				}
				break;
		}
		this.movePointer('i', 0);
		this.movePointer('j', 50);
	},
	methods: {
		exchange(index_1, index_2) {
			console.log(index_1, index_2);
			var nodes = this.$refs['nodeComps'];
			console.log('Before exchange: ', this.pillarLeftX);
			var temp = this.pillarLeftX[index_1];
			this.pillarLeftX[index_1] = this.pillarLeftX[index_2];
			this.pillarLeftX[index_2] = temp;
			console.log('After exchange: ', this.pillarLeftX, '\n');
			nodes[index_1].$el.style.left = String(this.pillarLeftX[index_1])+'px';
			nodes[index_2].$el.style.left = String(this.pillarLeftX[index_2])+'px';
		},
		movePointer(name, aimLocation) {
			if (name==='i') {
				this.$refs['pointer-i'].$el.style.left = String(aimLocation+5)+'px';
			} else {
				this.$refs['pointer-j'].$el.style.left = String(aimLocation+5)+'px';
			}
		},
		popSortAll() {
			var functions = [], i = 0, j = 0;
			for (i = 0; i < this.rankNodeList.length-1; i++) {
				functions.push({ functionName: 'movePointer', attrs: [ 'i', this.pillarLeftX[i] ] });
				for (j = i+1; j < this.rankNodeList.length; j++) {
					functions.push({ functionName: 'movePointer', attrs: [ 'j', this.pillarLeftX[j] ] });
					if (this.rankNodeList[i]>this.rankNodeList[j]) {
						var temp = this.rankNodeList[i];
						this.rankNodeList[i] = this.rankNodeList[j];
						this.rankNodeList[j] = temp;
						functions.push({ functionName: 'exchange', attrs: [ i, j ] });
					}
				}
			}
			functions.push({ functionName: 'movePointer', attrs: [ 'i', 0 ] });
			functions.push({ functionName: 'movePointer', attrs: [ 'j', 50 ] });
			var flag = 0;
			for (i = 0; i < functions.length; i++) {
				setTimeout(()=>{
					this.callUnit(functions[flag++]);
				}, i*exchangeDuration*1000);
			}
		},
		callUnit(action) {
			switch(true) {
				case action.functionName==="movePointer":
					this.movePointer(action.attrs[0], action.attrs[1]);
					break;
				case action.functionName==="exchange":
					this.exchange(action.attrs[0], action.attrs[1]);
					break;
			}
		}
	}
}
</script>

<style>
.nodes-comps {
	transition: 0.5s;
	position: absolute;
	left: 700px;
	top: 40px;
	height: 460px;
	width: 60px;
}
.nodes-pointer {
	transition: 0.5s;
	position: absolute;
	width: 60px;
	top: 510px;
}
</style>