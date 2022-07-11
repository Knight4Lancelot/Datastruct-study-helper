<template>
	<div >
		<node class="nodes-comps"
			v-for="(n, k) in rankNodeList"
			ref="nodeComps"
			:key="k"
			:pillarHeight="pillarHeights[k]"
			:nodeStatus="0"
			:initStatus="0"
			:valElement="String(n)"
			:style="{'left':String(pillarLeftX[k])+'px'}"/>
		<node class="nodes-comps"
			:initStatus="3"
			:valElement="'指针i'"
			:style="{'left':String(10)+'px'}"/>
		<node class="nodes-comps"
			:initStatus="3"
			:valElement="'指针j'"
			:style="{'left':String(70)+'px'}"/>
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

const exchangeDuration = 0.5;

export default {
	name: 'PopSortCanvas',
	components: {
		node,
		pointer
	},
	data() {
		return {
			initNodeList: [],
			rankNodeList: [],
			pillarHeights: [],
			pillarLeftX: [],
			list2Comp_Map: []
		}
	},
	props: {
		nodelist: Array
	},
	mounted() {
		var min = this.nodelist[0], max = this.nodelist[0];
		var digit_difference = 0;
		for (var i = 0; i < this.nodelist.length; i++) {
			this.list2Comp_Map.push(i);
			this.initNodeList.push(this.nodelist[i]);
			this.rankNodeList.push(this.nodelist[i]);
			this.pillarHeights.push(this.nodelist[i]);
			this.pillarLeftX.push(200+i*60);
			if (min>this.nodelist[i]) { min=this.nodelist[i]; }
			if (max<this.nodelist[i]) { max=this.nodelist[i]; }
		}
		// 条形图高度缩放法则：所有数据最大值和最小值数量级差一位以内用线性，差两位开根号，差三位开三次方
		if (min<0) {
			max -= (2*min);
			for (i = 0; i < this.pillarHeights.length; i++) {
				this.pillarHeights[i] -= (2*min);
			}
			min =- min;
		}
		console.log(this.pillarHeights)
		digit_difference = String(max-min).length;
		switch(true) {
			case digit_difference<2:
				for (i = 0; i < this.pillarHeights.length; i++) {
					this.pillarHeights[i] = 500*this.pillarHeights[i]/max;
				}
				break;
			case digit_difference>=2:
				for (i = 0; i < this.pillarHeights.length; i++) {
					this.pillarHeights[i] = 500*Math.sqrt(this.pillarHeights[i]/max, digit_difference);
				}
				break;
			default: break;
		}
		this.movePointer('i', 10);
		this.movePointer('j', 70);
	},
	methods: {
		exchange(index_1, index_2) {
			var nodes = this.$refs['nodeComps'];
			var temp = this.list2Comp_Map[index_1];
			this.list2Comp_Map[index_1] = this.list2Comp_Map[index_2];
			this.list2Comp_Map[index_2] = temp;
			nodes[this.list2Comp_Map[index_1]].$el.style.left = String(this.pillarLeftX[index_1])+'px';
			nodes[this.list2Comp_Map[index_2]].$el.style.left = String(this.pillarLeftX[index_2])+'px';
		},
		movePointer(name, aimLocation) {
			if (name==='i') {
				this.$refs['pointer-i'].$el.style.left = String(aimLocation+5)+'px';
			} else {
				this.$refs['pointer-j'].$el.style.left = String(aimLocation+5)+'px';
			}
		},
		changeNodeStatus(index, status) {
			this.$refs['nodeComps'][this.list2Comp_Map[index]].currentStatus=status;
		},
		popSortAll() {
			var functions = [], i = 0, j = 0;
			for (i = 0; i < this.rankNodeList.length-1; i++) {
				functions.push({ functionName: 'movePointer', attrs: [ 'i', this.pillarLeftX[i] ], duration: 500 });
				functions.push({ functionName: 'changeNodeStatus', attrs: [ i, 1 ], duration: 100 });
				for (j = i+1; j < this.rankNodeList.length; j++) {
					functions.push({ functionName: 'movePointer', attrs: [ 'j', this.pillarLeftX[j]], duration: 500 });
					functions.push({ functionName: 'changeNodeStatus', attrs: [ j, 1 ], duration: 100 });
					if (this.rankNodeList[i]>this.rankNodeList[j]) {
						var temp = this.rankNodeList[i];
						this.rankNodeList[i] = this.rankNodeList[j];
						this.rankNodeList[j] = temp;
						functions.push({ functionName: 'exchange', attrs: [ i, j ], duration: 300 });
					} else {
						functions.push({ functionName: 'sleep', attrs: [], duration: 300 });
					}
					functions.push({ functionName: 'changeNodeStatus', attrs: [ j, 0 ], duration: 100 });
				}
				functions.push({ functionName: 'changeNodeStatus', attrs: [ i, 2 ], duration: 100 });
			}
			functions.push({ functionName: 'movePointer', attrs: [ 'i', 10 ], duration: 500 });
			functions.push({ functionName: 'movePointer', attrs: [ 'j', 70 ], duration: 0 });
			functions.push({ functionName: 'changeNodeStatus', attrs: [ i, 2 ], duration: 100 });
			var flag = 0, workTime = 0;
			for (i = 0; i < functions.length; i++) {
				setTimeout(()=>{
					this.callUnit(functions[flag++]);
				}, workTime);
				workTime+=functions[i].duration;
			}
		},
		callUnit(action) {
			/*
				设定函数执行事件：
				exchange函数交换时间：200ms
				movePointer函数移动指针时间间隔：500ms
				changeNodeStatus函数修改节点状态时间：100ms
				sleep延时函数：200ms
			*/
			switch(true) {
				case action.functionName==="movePointer":
					this.movePointer(action.attrs[0], action.attrs[1]);
					break;
				case action.functionName==="exchange":
					this.exchange(action.attrs[0], action.attrs[1]);
					break;
				case action.functionName==="changeNodeStatus":
					this.changeNodeStatus(action.attrs[0], action.attrs[1]);
					break;
				case action.functionName==="sleep":
				default: break;
			}
		}
	}
}
</script>

<style>
.nodes-comps {
	transition: 0.5s;
	position: absolute;
	top: 50px;
	height: 560px;
	width: 60px;
}
.nodes-pointer {
	transition: 0.5s;
	position: absolute;
	width: 60px;
	top: 620px;
}
</style>