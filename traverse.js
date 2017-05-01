/*---------查找算法：二分查找---------*/
		function Bsearch(array,low,high,target){//high应该是N-1
		    while(low <= high){//<=查找可以使用相等条件
		        var mid = Math.floor((low + high)/2);
		        if (array[mid] > target){
		            high = mid - 1;
		        }else if (array[mid] < target){
		            low = mid + 1;
		        }else{
		            return mid;
		        }
		    }
		    return -1;
		}
		function Bsearch(array,low,high,target)
		{
		    if (low > high) return -1;
		    var mid = Math.floor((low + high)/2);
		    if (array[mid]> target){
		        return  bsearch(array, low, mid -1, target);
		    } else if (array[mid]< target){
		        return  bsearch(array, mid+1, high, target);
		    }else{return mid;}
		        
		}
		//二分查找查找边界值:if...else不能变
		function searchUp(arr,low,high,target){
			if(low>high||target>=arr[high]){
				return -1;
			}
			while(low<high){
				//查上边界取下
				var mid = Math.floor((low+high)/2)
				if(arr[mid]>target){
					high = mid;
				}else{
					low = mid+1;
				}
			}
			//console.log(low==high);//true
			return low;
		}
		function searchDown(arr,low,high,target){
			if(low>high||target<=arr[low]){
				return -1;
			}
			while(low<high){
				//查下边界取上
				var mid = Math.floor((low+high+1)/2);
				if(arr[mid]<target){
					low = mid;		
				}else{
					high = mid-1;
				}
			}
			//console.log(low==high);//true
			return low;
		}
		/*---------树的遍历---------*/
		//1.children
		function dfsTraverse(treeNodes){
			var result = [];
			if(!treeNodes || !treeNodes.length){
				return;
			}
			var stack = [];
			for(var i=0,len=treeNodes.length;i<len;i++){
				stack.push(treeNodes[i]);
			}
			var item;
			while(stack.length){
				item = stack.shift();
				result.push(item.id);
				if(item.children&&item.children.length>0){
					stack = item.children.concat(stack);
				}
			}
			return result;

		}
		function bfsTraverse(treeNodes){
			var result = [];
			if(!treeNodes || !treeNodes.length){
				return;
			}
			var stack = [];
			//先将第一层放入栈
			for(var i=0,len=treeNodes.length;i<len;i++){
				stack.push(treeNodes[i]);
			}
			var item;
			while(stack.length){
				item = stack.shift();
				result.push(item.id);
				if(item.children&&item.children.length>0){
					stack = stack.concat(item.children);
				}
			}
			return result;
		}
		//2.left right
		function bfsTraverse(node){//广度：从上到下一层一层
			var result = [];
			if(!node){
				return;
			}
			var stack = [];
			stack.push(node);
			while(stack.length){
				node= stack.shift();
				result.push(node.value);
				if(node.left) stack.push(node.left);
				if(node.right) stack.push(node.right);
			}
			return result;

		}
		function dfsTraverse(node){//先序
			var result = [];
			if(!node){
				return;
			}
			var stack = [];
			stack.push(node);
			while(stack.length){//装两个取一个
				node= stack.pop();
				result.push(node.value);
				if(node.right) stack.push(node.right);
				if(node.left) stack.push(node.left);
				
			}
			return result;

		}
		/*-------------遍历的数学模型-----------*/
var treeNodes = [
       {
            id: 1,
            name: '1',
            children: [
                 {
                      id: 11,
                      name: '11',
                      children: [
                           {
                                id: 111,
                                name: '111',
                                children:[]
                           },
                           {
                                id: 112,
                                name: '112'
                           }
                      ]
                 },
                 {
                      id: 12,
                      name: '12',
                      children: []
                 }
            ],
            users: []
       },
       {
            id: 2,
            name: '2',
            children: [
                {
                    id: 22,
                    name: '22',
                    children: []
                }
            ]
       }
    ];
    var tree = {
				  value: 1,
				  left: {
				    value: 2,
				    left: {
				      value: 4
				    }
				  },
				  right: {
				    value: 3,
				    left: {
				      value: 5,
				      left: {
				        value: 7
				      },
				      right: {
				        value: 8
				      }
				    },
				    right: {
				      value: 6
				    }
				  }
				};