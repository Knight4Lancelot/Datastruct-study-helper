function init_linknode_code() {	
	this.cpp_init_linknode_part_1 =
		'/*\n\tKnight4Lancelot C++二叉树程序\n\t此程序仅供参考，并非最佳设计\n*/\n'+
		'#include<iostream>\n'+
		'#include<vector>\n'+
		'#include<windows.h> // VScode要看到输出需要加上以调用system("pause")\n'+
		'using namespace std;\n\n'+
		
		'int main() {\n'+
		'\tstring TreeNodeList[] = { '
	this.cpp_init_linknode_part_2 = 
		' }; // 根据结构设计得到的数组\n'+
		'\treturn 0;\n'+
		'}'
	this.java_init_linknode_part_1 =
		'/*\n* Knight4Lancelot Java二叉树程序\n* 此程序仅供参考，并非最佳设计\n* */\n'+
		'import java.util.ArrayList;\n'+
		'import java.util.Arrays;\n'+
		'\n'
	this.java_init_linknode_part_2 =
		' }; // 根据结构设计得到的数组\n\t\tArrayList<String> list = new ArrayList<>(Arrays.asList(BinaryTreeNodes));\n'+
		'\t\tBinaryTree bt = new BinaryTree(list);\n'+
		'\t}\n}'
	this.python_init_linknode_part_1 = '# Knight4Lancelot Python二叉树程序\n'+
		'# 此程序仅供参考，并非最佳设计\n\n'
	this.python_init_linknode_part_2 = ''
}

export {
	init_linknode_code
}