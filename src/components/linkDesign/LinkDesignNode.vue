<template>
	<div style="position: inherit;">
		<button
			v-text="nodeText"
			class="link-node"
			@click="changeStatus()">
		</button>
		<transition name="fade-transform">
			<div class="node-operate-show" v-if="isShowInfo">
				<el-button size="mini" type="success" @click="grandparentAdd(0)" plain round>插入左子节点</el-button>
				<el-button size="mini" type="success" @click="grandparentAdd(1)" plain round>插入右子节点</el-button>
				<el-button size="mini" type="danger" @click="grandparentDel()" plain round>删除节点</el-button>
				<el-input
					v-model="nodeTextBuffer"
					size="mini"
					maxlength="3"
					style="width: 218px; margin: 10px; margin-left: 0; margin-bottom: 0;"
					show-word-limit/>
				<el-button size="mini" type="primary" @click="changeText()" plain round>确定修改</el-button>
			</div>
		</transition>
	</div>
</template>

<script>
const durationTime=5

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
}
</script>

<style>
</style>