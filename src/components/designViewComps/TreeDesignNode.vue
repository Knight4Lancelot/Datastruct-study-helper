<template>
	<div style="position: inherit;">
		<button
			v-text="nodeText"
			class="tree-node"
			@click="changeStatus()">
		</button>
		<transition name="fade-transform">
			<div class="node-operate-show" v-if="isShowInfo">
				<el-button size="mini" type="success" @click="addTreeNode(0)" plain round>插入左子节点</el-button>
				<el-button size="mini" type="success" @click="addTreeNode(1)" plain round>插入右子节点</el-button>
				<el-button size="mini" type="danger" @click="delTreeNode()" plain round>删除节点</el-button>
				<el-input
					v-model="nodeTextBuffer"
					size="mini"
					maxlength="4"
					style="width: 218px; margin: 10px; margin-left: 0; margin-bottom: 0;"
					show-word-limit/>
				<el-button size="mini" type="primary" @click="changeText()" plain round>确定修改</el-button>
			</div>
		</transition>
	</div>
</template>

<script>
const durationTime=5;

export default {
  name: 'TreeEdge',
  components: {},
  props: {
	valElement: String,
	index: Number
  },
  data() {
	return {
		nodeText: '0',
		nodeTextBuffer: '0',
		isShowInfo: false
	}
  },
  mounted() {
	this.init_data();
  },
  methods: {
	addTreeNode(status) {
		this.$parent.addNode(this.index, status);
		this.isShowInfo=false;
	},
	delTreeNode() {
		if (this.index===0) {
			this.$message({
				duration: durationTime*1000,
				showClose: true,
				message: '这可是根节点，快请别继续删除了',
				type: 'error'});
			this.isShowInfo=false;
			return;
		}
		this.$parent.delNode(this.index);
		this.isShowInfo=false;
	},
	init_data() {
		this.nodeText = this.valElement;
		this.nodeTextBuffer = this.valElement;
	},
	changeStatus() {
		if (!this.isShowInfo) {
			this.$parent.hideAllNodeInfo();
			this.nodeTextBuffer=this.nodeText;
		}
		this.isShowInfo = !this.isShowInfo;
	},
	changeText() {
		if (this.nodeTextBuffer.length===0) {
			this.$message({
				duration: durationTime*1000,
				showClose: true,
				message: '注意，节点的文本长度不能小于1！',
				type: 'error'});
			return;
		}
		if (this.nodeTextBuffer==='nil') {
			this.$message({
				duration: durationTime*1000,
				showClose: true,
				message: '若要修改为nil，建议直接删除该节点',
				type: 'warning'});
			return;
		}
		this.nodeText = this.nodeTextBuffer;
		this.$parent.modifyNode(this.index, this.nodeTextBuffer);
		this.isShowInfo=false;
	}
  }
}
</script>

<style>
.tree-node {
	float: left;
	border-radius: 50%;
	height: 60px;
	width: 60px;
	border: 3px solid #5C5E63;
	background-color: white;
	font-size: 18px;
	user-select: none;
	font-family: "Microsoft YaHei";
}
.tree-node:hover {
	color: #66B1FF;
	border: 3px solid #66B1FF;
	cursor: pointer;
}
.node-operate-show {
	position: inherit;
	margin-left: 70px;
	padding: 15px;
	border-radius: 12px;
	width: 310px;
	border: 1px solid #C0C4CC;
	background-color: white;
	z-index: 4;
	font-family: "Microsoft YaHei";
}
.fade-transform-leave-active, .fade-transform-enter-active { 
  transition:all 0.4s;
}
.fade-transform-enter {
  opacity:0;
  transform:translateX(-20px);
}
.fade-transform-leave-to { 
  opacity:0;
  transform:translateX(-20px);
}
</style>