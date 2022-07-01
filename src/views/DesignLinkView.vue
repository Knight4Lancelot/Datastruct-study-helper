<template>
	<div class="designlink">
		<router-link to="/" exact><i id="back-to-home" class="el-icon-arrow-left"/></router-link>
		<span id="design-link-headword"
			:style="{'top':'55px',
					'left':'120px'}">
			<span style="color:#67C23A;font-size:35px;font-weight: 800;">
				链表&nbsp;
			</span>结构设计
		</span>
		<linkcanvas class="link-canvas-show"
			id="link-canvas-show"
			:elementList="LinkList"
			v-if="isshowCanvas"
			ref="canvasElement"
			:style="{'overflow-y':'scroll', 'overflow-x':'scroll',
			'max-width': String(canvasWidth)+'px',
			'max-height': String(canvasHeight)+'px',
			'width': String(canvasWidth)+'px',
			'height': String(canvasHeight)+'px'}"/>
		<span id="tree-result-word"
			:style="{'width': String(canvasWidth)+'px',
				'top':String(canvasHeight+240)+'px',
				'left':'120px'}">
				<span style="color:#67C23A;font-size:35px;font-weight: 800;">
					链表&nbsp;
				</span>的数组形式表示结果
		</span>
		<el-card id="link-result-card"
			:style="{'width': String(canvasWidth)+'px',
					'padding':'0', 'margin':'0',
					'top':String(canvasHeight+310)+'px',
					'left':'120px'}">
			<div id="card-message" v-text="holdResString" @click="sendDataCopy()"/>
		</el-card>
		<span id="link-result-code"
			:style="{'width': String(canvasWidth)+'px',
				'top':String(canvasHeight+480)+'px',
				'left':'120px'}">
				<span style="color:#67C23A;font-size:35px;font-weight: 800;">
					链表&nbsp;
				</span>代码展示
		</span>
		<div id="code-view"
			:style="{'top':String(canvasHeight+550)+'px',
				'width':String(canvasWidth-30)+'px',
				'max-width':String(canvasWidth-30)+'px'
				}">
			<button :class="codeClass[0]" @click="changeLanguage(1)">C++</button>
			<button :class="codeClass[1]" @click="changeLanguage(2)">Java</button>
			<button :class="codeClass[2]" @click="changeLanguage(3)">Python</button>
			<prism-editor
				class="my-editor height-200"
				v-model="code"
				:highlight="highlighter"
				line-numbers
				readonly></prism-editor>
		</div>
		<div id="page-bottom"
			:style="{'width': String(canvasWidth-30)+'px',
				'top':String(canvasHeight+1390)+'px'}">
			已经到页面底部了
		</div>
	</div>
</template>

<script>
import linkcanvas from '../components/linkDesign/LinkDesignCanvas.vue'

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
const durationTime=5

export default {
  name: 'LinkDesignHomeView',
  components: {
	linkcanvas,
	PrismEditor
  },
  data() {
	return {
		code: '',
		holdResString: '',
		canvasHeight: 0,
		canvasWidth: 0,
		appHeight: 0,
		appWidth: 0,
		isshowCanvas: true,
		LinkList: [ '1', '2', '3' ],
		codeClass: [ "code-language-active", "code-language", "code-language" ]
	}
  },
  mounted() {
	this.formCanvasSize()
  },
  methods: {
	highlighter(code) {
		return highlight(this.code, languages.js, "js");
	},
	formCanvasSize() {
		this.appHeight=document.documentElement.clientHeight
		this.appWidth=document.documentElement.clientWidth
		this.canvasHeight = this.appHeight-160
		this.canvasWidth = this.appWidth-300
		if (this.canvasHeight < 500) { this.canvasHeight = 500 }
		if (this.canvasWidth < 1000) { this.canvasWidth = 1000 }
		// this.$refs['canvasElement'].draw()
	}
  }
}
</script>

<style>
.designlink {
	width: 100%;
}
#design-link-headword, #link-result-word, #link-result-code {
	position: absolute;
	font-size: 25px;
	color: #6A6A6A;
	font-family: 'Microsoft YaHei';
	user-select: none;
}
.link-canvas-show {
	position: absolute;
	top: 150px;
	left: 120px;
	margin: 0;
	border: 2px solid #C0C4CC;
	border-radius: 15px;
}
</style>