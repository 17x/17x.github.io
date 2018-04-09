### Selection 挑选排序
***

···
	// 将数组抽象上分为两块
	// 第一块为已经排序过 记为 X
	// 第一块未排序过 记为 Y
	// 遍历Y找出最小的入栈至X
	// 每次 Y 的开始下标为 X.length
	
    let arr = [7, 9, 6, 4, 5, 8, 1, 3, 2];    
    
	for (let i = 0; i < arr.length; i++) {
		let min = arr[i],
			index = i;

		for (let j = i; j < arr.length; j++) {
			if (arr[j] < min) {
				min = arr[j]
				index = j
			}
		}
 		
		if(isNaN(index)) continue;
		
		arr[index] = arr[i]
		arr[i] = min
		//console.log(arr);
	}
     
```
