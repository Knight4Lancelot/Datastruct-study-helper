function init_binarytree_code() {	
	this.cpp_init_binarytree_part_1 =
		'/*\n\tKnight4Lancelot C++二叉树程序\n\t此程序仅供参考，并非最佳设计\n*/\n'+
		'#include<iostream>\n'+
		'#include<vector>\n'+
		'#include<windows.h> // VScode要看到输出需要加上以调用system("pause")\n'+
		'using namespace std;\n\n'+
		'template<class ElementType>\n'+
		'struct node {\n'+
		'\tElementType val;\n'+
		'\tint leftChild = -1;\n'+
		'\tint rightChild = -1;\n'+
		'};\n\n'+
		'template<class ElementType>\n'+
		'class BinaryTree {\n'+
		'\tvector<node<ElementType>> treeNodes;\n'+
		'\tint nodeCount = 0;\n'+
		'public:\n'+
		'\tBinaryTree() { }\n'+
		'\tBinaryTree(vector<ElementType> list) {\n'+
		'\t\tnode<ElementType> t;\n'+
		'\t\tvector<int> indexMap(list.size(), -1);\n'+
		'\t\tint index = 0;\n'+
		'\t\tfor (int i = 0; i < list.size(); i++) {\n'+
		'\t\t\tif (list[i].compare("null")) {\n'+
		'\t\t\t\tindexMap[i] = index++;\n'+
		'\t\t\t}\n'+
		'\t\t}\n'+
		'\t\tfor (int i = 0; i < list.size(); i++) {\n'+
		'\t\t\tif (list[i].compare("null")) {\n'+
		'\t\t\t\tt.val = list[i];\n'+
		'\t\t\t\tif (2*i+1<list.size() && list[2*i+1].compare("null")) t.leftChild=indexMap[2*i+1];\n'+
		'\t\t\t\telse t.leftChild=-1;\n'+
		'\t\t\t\tif (2*i+2<list.size() && list[2*i+2].compare("null")) t.rightChild=indexMap[2*i+2];\n'+
		'\t\t\t\telse t.rightChild=-1;\n'+
		'\t\t\t\tthis->treeNodes.push_back(t);\n'+
		'\t\t\t}\n'+
		'\t\t}\n'+
		'\t\tthis->nodeCount = this->treeNodes.size();\n'+
		'\t\tthis->show();\n'+
		'\t}\n'+
		'\t/* 遍历展示二叉树的节点内容 */\n'+
		'\tvoid show() {\n'+
		'\t\tfor (int i = 0; i < this->nodeCount; i++) {\n'+
		'\t\t\tcout << "节点元素: " << this->treeNodes[i].val\n'+
		'\t\t\t\t<< ",\\t左节点元素: " << this->treeNodes[i].leftChild\n'+
		'\t\t\t\t<< ",\\t右节点元素: " << this->treeNodes[i].rightChild\n'+
		'\t\t\t\t<< endl;\n'+
		'\t\t}\n'+
		'\t}\n'+
		'};\n'+
		'\n'+
		'int main() {\n'+
		'\tstring TreeNodeList[] = { '
		// '"0","2","-4","null","22","1","10","null","null","null","null","null","9","6"'+
	this.cpp_init_binarytree_part_2 = 
		' }; // 根据结构设计得到的数组\n'+
		'\tvector<string> v(TreeNodeList, TreeNodeList+sizeof(TreeNodeList)/sizeof(TreeNodeList[0]));\n'+
		'\tBinaryTree bt = BinaryTree(v);\n'+
		'\tsystem("pause"); // 暂停以观察输出\n'+
		'\treturn 0;\n'+
		'}'
	
	this.java_init_binarytree_part_1 =
		'/*\n* Knight4Lancelot Java二叉树程序\n* 此程序仅供参考，并非最佳设计\n* */\n'+
		'import java.util.ArrayList;\n'+
		'import java.util.Arrays;\n'+
		'\n'+
		'class TreeNode {\n'+
		'\tpublic String val;\n'+
		'\tpublic int leftChild = -1;\n'+
		'\tpublic int rightChild = -1;\n\n'+
		'\tpublic TreeNode() {}\n'+
		'\tpublic TreeNode(String v, int l, int r) {\n'+
		'\t\tthis.val = v;\n'+
		'\t\tthis.leftChild = l;\n'+
		'\t\tthis.rightChild = r;\n\t}\n}\n\n'+
		'class BinaryTree {\n'+
		'\tpublic ArrayList<TreeNode> nodes = new ArrayList<>();\n\n'+
		'\tpublic BinaryTree() {}\n'+
		'\tpublic BinaryTree(ArrayList<String> n) {\n'+
		'\t\tTreeNode t;\n'+
		'\t\tArrayList<String> nodeList = (ArrayList<String>)n.clone();\n'+
		'\t\tint indexMap[] = new int[nodeList.size()], index = 0;\n'+
		'\t\tfor (int i = 0; i < indexMap.length; i++) indexMap[i] = -1;\n'+
		'\t\tfor (int i = 0; i < nodeList.size(); i++) {\n'+
		'\t\t\tif (!nodeList.get(i).equals("null")) {\n'+
		'\t\t\t\tindexMap[i] = index++;\n\t\t\t}\n\t\t}\n'+
		'\t\tfor (int i = 0; i < nodeList.size(); i++) {\n'+
		'\t\t\tif (!nodeList.get(i).equals("null")) {\n'+
		'\t\t\t\tt = new TreeNode(nodeList.get(i), 2*i+1, 2*i+2);\n'+
		'\t\t\t\tif (2*i+1 >= nodeList.size() || nodeList.get(2*i+1).equals("null")) t.leftChild=-1;\n'+
		'\t\t\t\tif (2*i+2 >= nodeList.size() || nodeList.get(2*i+2).equals("null")) t.rightChild=-1;\n'+
		'\t\t\t\tthis.nodes.add(t);\n\t\t\t}\n\t\t}\n'+
		'\t\tshow();\n\t}\n\tpublic void show() {\n'+
		'\t\tfor (int i = 0; i < this.nodes.size(); i++) {\n'+
		'\t\t\tSystem.out.println("节点元素：" + this.nodes.get(i).val +\n'+
		'\t\t\t\t\t"\\t左子节点index："+ this.nodes.get(i).leftChild +\n'+
		'\t\t\t\t\t"\\t右子节点index："+ this.nodes.get(i).rightChild);\n\t\t}\n\t}\n}\n\n'+
		'public class BinaryTreeDemo {\n'+
		'\tpublic static void main(String[] args) {\n'+
		'\t\tString[] BinaryTreeNodes = { '
		// '"0","2","-4","null","22","1","10","null","null","null","null","null","9","6"'
	this.java_init_binarytree_part_2 =
		' }; // 根据结构设计得到的数组\n\t\tArrayList<String> list = new ArrayList<>(Arrays.asList(BinaryTreeNodes));\n'+
		'\t\tBinaryTree bt = new BinaryTree(list);\n'+
		'\t}\n}'
	this.python_init_binarytree_part_1 = '# Knight4Lancelot Python二叉树程序\n'+
		'# 此程序仅供参考，并非最佳设计\n\n'
	this.python_init_binarytree_part_2 = ''
}
	
export {
	init_binarytree_code
}