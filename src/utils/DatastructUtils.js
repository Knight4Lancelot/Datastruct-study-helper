// 栈模块
function Stack(){
	this.elementList=[]
	this.maxsize=2000
	this.size=0
	
	Stack.prototype.top = function() {
		return this.elementList[this.size-1]
	}
	Stack.prototype.isEmpty = function() {
		return this.size===0
	}
	Stack.prototype.pop = function() {
		if (this.size===0) {
			console.log("this size down overflow")
			return -1
		}
		var res=this.elementList[this.size-1]
		this.elementList.pop()
		this.size-=1
		return res
	}
	Stack.prototype.push = function(e) {
		if (this.maxsize>this.maxsize) {
			console.log("this size up overflow")
			return
		}
		this.elementList.push(e)
		this.size+=1
	}
	Stack.prototype.clear = function() {
		while (this.size>0) {
			this.pop()
		}
	}
	
	Stack.prototype.show = function() {
		console.log(this.elementList)
	}
}

// 队列模块
function Queue(){
	this.elementList=[]
	this.maxsize=2000
	this.size=0
	
	Queue.prototype.isEmpty = function() {
		return this.size===0
	}
	Queue.prototype.pop = function() {
		if (this.size===0) {
			console.log("the length of Queue is 0")
			return -1
		}
		var res=this.elementList.splice(0,1)[0]
		this.size-=1
		return res
	}
	Queue.prototype.push = function(e) {
		if (this.size>this.maxsize) {
			console.log("the length of queue is max size")
			return
		}
		this.elementList.push(e)
		this.size+=1
	}
	Queue.prototype.clear = function() {
		while (this.size>0) {
			this.pop()
		}
	}
	Queue.prototype.show = function() {
		console.log(this.elementList)
	}
}

// 二叉树模块
function BinaryTreeNode(v, l, r, i, mi) {
	this.val=v
	this.left=l
	this.right=r
	this.index=i // 在去除空节点记录后在数组中的位置
	this.mapIndex=mi
	this.parent=-1
	this.layer=1
}

function BinaryTree(list) {
	this.binarytreelist=[] // 存的是上面BinaryTreeNode节点
	this.height=1
	this.count=0
	// 默认执行函数
	{
		var index = 0
		var mapping=list.concat()
		for (var i = 0; i < list.length; i++) {
			if (list[i]==='nil') { 
				mapping[i]={val:list[i], mapindex:-1}
				continue
			}
			mapping[i]={val:list[i], mapindex:index}
			this.binarytreelist.push(new BinaryTreeNode(list[i], -1, -1, index, i))
			if (i!==0) { // 根据原数组的index来确定子节点对一个关系
				if (i%2===0) {
					this.binarytreelist[mapping[(i-2)/2].mapindex].right=index
				} else {
					this.binarytreelist[mapping[(i-1)/2].mapindex].left=index
				}
			}
			index+=1
		}
		this.count=index
		for (i = 0; i < this.binarytreelist.length; i++) {
			var l = this.binarytreelist[i].left
			var r = this.binarytreelist[i].right
			if (l!==-1) {
				this.binarytreelist[l].layer=this.binarytreelist[i].layer+1
				this.binarytreelist[l].parent=i
				if (this.binarytreelist[l].layer>this.height) {
					this.height=this.binarytreelist[l].layer
				}
			}
			if (r!==-1) {
				this.binarytreelist[r].layer=this.binarytreelist[i].layer+1
				this.binarytreelist[r].parent=i
				if (this.binarytreelist[r].layer>this.height) {
					this.height=this.binarytreelist[r].layer
				}
			}
		}
	}
	
	BinaryTree.prototype.getPositionX = function(width) { // width为左右节点之间的间隔
		var X = Array(this.count).fill(0), layerWidth = Array(this.height+1).fill(0)
		layerWidth[0]=-1
		var node, x, h, descendant, deltaX, htemp
		var i, j
		var PostOrderIndex = this.PostOrderIndexList()
		for (i = 0; i < PostOrderIndex.length; i++) {
			node = this.binarytreelist[PostOrderIndex[i]]
			h = node.layer
			if (node.left===-1 && node.right===-1) {
				x = layerWidth[h]+width
				X[node.index] = x
			} else if (node.left!==-1 && node.right===-1) {
				if (layerWidth[h]+width > X[node.left]+width/2) {
					x = layerWidth[h]+width
					deltaX = x-width/2-X[node.left]
					descendant = this.descendantIndexs(node.left)
					for (j = 0; j < descendant.length; j++) {
						X[descendant[j]] += deltaX
						htemp = this.binarytreelist[descendant[j]].layer
						if (X[descendant[j]]>layerWidth[htemp]) { layerWidth[htemp]=X[descendant[j]] }
					}
				} else {
					x = X[node.left]+width/2
				}
				X[node.index] = x
			} else if (node.left===-1 && node.right!==-1) {
				if (layerWidth[h]+width >= X[node.right]-width/2) {
					x = layerWidth[h]+width
					deltaX = x+width/2-X[node.right]
					descendant = this.descendantIndexs(node.right)
					for (j = 0; j < descendant.length; j++) {
						X[descendant[j]] += deltaX
						htemp = this.binarytreelist[descendant[j]].layer
						if (X[descendant[j]]>layerWidth[htemp]) { layerWidth[htemp]=X[descendant[j]] }
					}
				} else {
					x = X[node.right]-width/2
				}
				X[node.index] = x
			} else {
				if (layerWidth[h]+width > (X[node.left] + X[node.right]) / 2) {
					X[node.index] = layerWidth[h]+width
					deltaX = layerWidth[h]+width - ((X[node.left] + X[node.right]) / 2)
					descendant = this.descendantIndexs(node.left).concat(this.descendantIndexs(node.right))
					for (j = 0; j < descendant.length; j++) {
						X[descendant[j]] += deltaX
						htemp = this.binarytreelist[descendant[j]].layer
						if (X[descendant[j]]>layerWidth[htemp]) { layerWidth[htemp]=X[descendant[j]] }
					}
				} else {
					X[node.index] = (X[node.left] + X[node.right]) / 2
				}
			}
			layerWidth[h] = x
		}
		return X
	}
	BinaryTree.prototype.getPositionY = function(height) { // height为上下层的间隔
		var Y = []
		for (var i = 0; i < this.binarytreelist.length; i++) {
			Y.push((this.binarytreelist[i].layer-1)*height+10)
		}
		return Y
	}
	BinaryTree.prototype.descendantIndexs = function(index) { // 获取某一节点的所有子孙代节点index
		var res = []
		var q = new Queue(), i, n
		q.push(index)
		while (!q.isEmpty()) {
			i = q.pop()
			res.push(i)
			n = this.binarytreelist[i]
			if (n.left!==-1) { q.push(n.left) }
			if (n.right!==-1) { q.push(n.right) }
		}
		return res
	}
	BinaryTree.prototype.show = function() { // 在控制台打印结果
		console.log(this.binarytreelist)
	}
	BinaryTree.prototype.treelist = function() { // 返回树的节点数组
		return this.binarytreelist
	}
	BinaryTree.prototype.PreOrderIndexList = function() { // 返回先序遍历的index列表
		var res = []
		var temp = []
		var s = new Stack()
		var n
		for (var i = 0; i < this.binarytreelist.length; i++) {
			temp.push({ node: this.binarytreelist[i], isRead: false, index: i })
		}
		s.push(temp[0])
		while (!s.isEmpty()) {
			n = s.pop()
			n.isRead = true
			res.push(n.index)
			if (n.node.right!==-1) { s.push(temp[n.node.right]) }
			if (n.node.left!==-1) { s.push(temp[n.node.left]) }
		}
		return res
	}
	BinaryTree.prototype.PreOrderList = function() { // 返回先序遍历的元素列表
		var res = [], index = this.PreOrderIndexList()
		for (var i = 0; i < index.length; i++) {
			res.push(this.binarytreelist[index[i]].val)
		}
		return res
	}
	BinaryTree.prototype.PostOrderIndexList = function() { // 返回后续遍历的index列表
		var res = []
		var temp = []
		var s = new Stack()
		var n
		for (var i = 0; i < this.binarytreelist.length; i++) {
			temp.push({ node: this.binarytreelist[i], isRead: false, index: i })
		}
		s.push(temp[0])
		while (!s.isEmpty()) {
			n = s.top()
			if (n.node.left!==-1 && !temp[n.node.left].isRead) { s.push(temp[n.node.left]) }
			else if (n.node.right!==-1 && !temp[n.node.right].isRead) { s.push(temp[n.node.right]) }
			else {
				n = s.pop()
				temp[n.index].isRead=true
				res.push(n.index)
			}
		}
		return res
	}
	BinaryTree.prototype.PostOrderList = function() { // 返回后续遍历的元素列表
		var res = [], index = this.PostOrderIndexList()
		for (var i = 0; i < index.length; i++) {
			res.push(this.binarytreelist[index[i]].val)
		}
		return res
	}
	BinaryTree.prototype.InOrderIndexList = function() { // 返回中序遍历的index列表
		var res = []
		var temp = []
		var s = new Stack()
		var n
		for (var i = 0; i < this.binarytreelist.length; i++) {
			temp.push({ node: this.binarytreelist[i], isRead: false, index: i })
		}
		s.push(temp[0])
		while (!s.isEmpty()) {
			n = s.top()
			if (n.node.left!==-1 && !temp[n.node.left].isRead) { s.push(temp[n.node.left]) }
			else {
				n = s.pop()
				temp[n.index].isRead=true
				res.push(n.index)
				if (n.node.right!==-1 && !temp[n.node.right].isRead) { s.push(temp[n.node.right]) }
			}
		}
		return res
	}
	BinaryTree.prototype.InOrderList = function() { // 返回中序遍历的元素列表
		var res = [], index = this.InOrderIndexList()
		for (var i = 0; i < index.length; i++) {
			res.push(this.binarytreelist[index[i]].val)
		}
		return res
	}
}

export {
	Stack, Queue, BinaryTree, BinaryTreeNode
}