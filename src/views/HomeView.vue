<template>
  <div>
    <treecanvas class="tree-canvas-show" :elementList="['1', '2', '3', 'nil', '4', '5', '6', '7']"></treecanvas>
  </div>
</template>

<script>
import treecanvas from '../components/TreeCanvas.vue'

export default {
  name: 'HomeView',
  components: {
	treecanvas
  }
}
</script>

<style>
.tree-canvas-show {
	width: 800px;
	height: 600px;
}
</style>