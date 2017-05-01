/*---------排序算法---------*/
		function swap(arr,i,j){
			var temp;
			temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		

		//1.冒泡排序
		/*
			i [0,n-1)
			j [0,n-1-i)
			swap(j,j+1)
		 */
		function bubbleSort(arr){//从后往前逐渐有序
			var len = arr.length;
			for(var i=0;i<len;i++){//n-1趟
				for(var j=0;j<len-1-i;j++){//len-1-i防止j+1溢出
					if(arr[j]>arr[j+1]){
						swap(arr,j,j+1);
					}
				}

			}
			return arr;
		}
		//改进后的冒泡排序
		function bubbleSort2(array){
			var N=array.length;
			i=N-1;//j,j+1防止堆栈溢出
			while(i>0){//j<i j最小为0
				var pos = 0;//声明POS并赋值为0
				for(var j=0;j<i;j++){
					if(array[j]>array[j+1]){
						swap(array,j,j+1);	
						pos=j;
					}
					
				}
				i=pos;
			}
			return array;
		}		
		//2.选择排序
		/*
			i [0,N-1）
			j [i+1,N)
			swap(arr,i,minIndex);
		 */
		function selectSort(arr){//从前往后逐渐有序
			var len = arr.length;
			for(var i=0;i<len-1;i++){
				var minIndex = i;
				for(var j=i+1;j<len;j++){
					if(arr[j]<arr[minIndex]){
						minIndex = j;
					}
				}
				swap(arr,i,minIndex);
			}
			return arr;
		}
		//3.插入排序
		/*
			i [1,len-1)
			j>0&&arr[j]<temp
			arr[j+1] = arr[j]
			arr[j+1] = temp
		 */
		function insertSort(arr){
			var len = arr.length;
			for(var i=1;i<len;i++){
				var j=i-1;
				var temp = arr[i];
				while(j>=0&&arr[j]>temp){//j>=0要取到0
					arr[j+1] = arr[j];
					j--;
				}
				arr[j+1] = temp;
			}
			return arr;
		}
		//改进型插入排序：利用二分查找
		function insertSort2(arr){
			var N = arr.length;
			for(var i=1;i<N;i++){
				var left=0,right=i-1;
				var temp = arr[i];
				while(left<=right){
					var middle = Math.floor((left+right)/2);//要在循环里面，保证每次都能更新
					if(arr[middle]>temp){
						right = middle-1;
					}else{
						left = middle+1;
					}
				}	
				for(var j=i-1;j>=left;j--){
					arr[j+1] = arr[j];
				}
				arr[left] = temp;
			}
			return arr;	
		}
		//4.快速排序
		//4-1.占用额外内存的
		function quickSort1(arr){
			if(arr.length<2){//千万不能遗漏并且放在开始处；使用middle的都要有
				return arr;
			}
			var middle = Math.floor(arr.length/2)
			var point = arr.splice(middle,1)[0];
			var left =[];
			var right = [];
			
			for(var i=0;i<arr.length;i++){
				if(arr[i]<point){
					left.push(arr[i]);
				}else{
					right.push(arr[i]);
				}
			}
			return quickSort1(left).concat([point],quickSort1(right));
		}
		//4-2.优化后的快速排序
		function quickSort2(arr,left,right){
			var point = 0;
			if(left<right){
				ponit = partSort(arr,left,right);
				quickSort2(arr,left,ponit-1);
				quickSort2(arr,ponit+1,right);
			}
			return arr;
		}
		function partSort(arr,left,right){
			var temp = arr[left];
			while(left<right){
				while(left<right&&arr[right]>=temp) --right;
					arr[left] = arr[right];
				while(left<right&&arr[left]<=temp) ++left;
					arr[right] = arr[left];		

			}
			arr[left] = temp;
			return left;
		}
		//5.归并排序
		function mergeSort(arr){
			if(arr.length<2)return arr;
			var len = arr.length;
			var middle = Math.floor(len/2);//保证middle>0
			var left = arr.slice(0,middle);
			var right = arr.slice(middle);
			return merge(mergeSort(left),mergeSort(right));
		}
		function merge(left,right){
			var result = [];
			while(left.length>0&&right.length>0){
				if(left[0]<right[0]){
					result.push(left.shift());
				}else{
					result.push(right.shift());
				}
			}
			while(left.length>0){
				result.push(left.shift());
			}
			while(right.length>0){
				result.push(right.shift());
			}
			return result;
		}
		//6.堆排序-大顶堆
		function heapSort(arr){
			var len = arr.length;
			buildHeap(arr,len);
			for(var j=arr.length-1;j>=1;j--){//0与0不需要对换
				swap(arr,j,0)
				heapifyDown(arr,0,--len);
				//建完大顶堆并且交换位置后arr[len]是最大值了
				//需要将堆的大小减一
			}
			return arr;
		}
		//建堆-大顶堆
		function buildHeap(arr,len){
			var start = Math.floor(len/2)-1;//最后一个非叶子结点的序号(从0开始)
			for(var i=start;i>=0;i--){//调整每一个父节点和它的子节点
				heapifyDown(arr,i,len);
			}
		}
		//调整堆-向下调整
		function heapifyDown(arr,i,len){
			//i 节点序号
			var l=2*i+1,//左子节点
				r=2*i+2,//右子节点
				largest=i;//将当前元素标记最大值
			if(l<len&&arr[l]>arr[largest]){
				largest = l;
			}
			if(r<len&&arr[r]>arr[largest]){
				largest = r;
			}
			if(largest!=i){//与子节点比较的最大值不是父节点，需要交换位置
				swap(arr,largest,i);
				heapifyDown(arr,largest,len);
			}
		}
		//插入一个数值
		function heapifyUp(arr,i,len){
			if(i==0){
				return;
			}
			while(i!=0){
				if(arr[i]>h[i/2]){
					swap(arr,i,i/2);
				}else{
					i = i/2;
				}
			}
		}
		//7.希尔排序
		function shellSort(arr){
     	  var N=arr.length;
      	  var h=1;
     	  while(h<N/3){
         	h=3*h+1;//设置间隔3
      	  }
		  while(h>=1){//划分序列
		       for(var i=h; i<N; i++){//游标
		            for(j=i; j>=h && arr[j]<arr[j-h]; j-=h){
		                 swap(arr, j, j-h);
		             }
		         }
		        h=(h-1)/3;
		     }
		   return arr;
		 }