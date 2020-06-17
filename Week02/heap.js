/*
  实现大顶堆的插入和删除
 */
class Heap {
    constructor(capacity = 10) {
        if (capacity < 0) {
            throw new Error('cap can not less 0');
        }
        this.container = new Array(capacity);
        this.capacity = capacity;
        this.count = 0;
    }

    insert(data) {
        if (this.count >= this.capacity) return false; // 堆满了

        // 先插入到数组最后
        this.container[this.count++] = data;

        // 然后进行从下往上的 "堆化" 操作
        let i = this.count - 1;
        while (Math.floor((i-1)/2) >= 0 && this.container[i] > this.container[Math.floor((i-1)/2)]) {
            let temp = this.container[i];
            this.container[i] = this.container[Math.floor((i-1)/2)];
            this.container[Math.floor((i-1)/2)] = temp;
            i = Math.floor((i-1)/2);
        }
        return true;
    }

    removeMax() {
        if (this.count <= 0) return -1; // 堆中没有数据

        // 把最后一个元素放在堆顶
        this.container[0] = this.container[--this.count];
        this.container[this.count] = undefined;

        // 然后进行从上往下的 "堆化" 操作
        this.heapify(this.container, this.count-1, 0);
    }

    // 将传入的数组原地堆化
    buildHeap(arr) {
        if (arr.length <= 0) return [];

        // 数组的最后一个元素的下标
        let n = arr.length - 1;

        for (let i = Math.floor((n-1)/2); i >= 0; i--) {
            this.heapify(arr, n, i);
        }
    }

    // 利用堆排序
    sort(arr) {
        // 构建一个大顶堆
        this.buildHeap(arr);

        let k = arr.length - 1;
        while (k > 0) {
            // 把堆顶放在数组最后
            let temp = arr[k];
            arr[k] = arr[0];
            arr[0] = temp;

            k--;

            this.heapify(arr, k, 0);
        }
    }

    /**
     * 将数组自顶向下进行堆化处理
     * @param arr 数组
     * @param n 数组的堆化结束边界
     * @param i 数组的堆化开始边界(起始堆顶下标)
     */
    heapify(arr, n, i) {
        while (true) {
            let maxPos = i;

            // 当前堆顶与左子节点比较
            if (2 * i + 1 <= n && arr[2 * i + 1] > arr[i]) {
                maxPos = 2 * i + 1;
            }
            // 比较结果再与右子节点比较
            if (2 * i + 2 <= n && arr[2 * i + 2] > arr[maxPos]) {
                maxPos = 2 * i + 2;
            }
            if (maxPos === i) {
                break;
            }
            // swap
            let temp = arr[maxPos];
            arr[maxPos] = arr[i];
            arr[i] = temp;

            i = maxPos;
        }
    }
}

const heap = new Heap(15);
heap.insert(1);
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(6);
heap.insert(7);
heap.removeMax();
// console.log(heap);
heap.removeMax();
// console.log(heap);

let arr = [7, 5, 19, 8, 4, 1, 20, 13, 16];
// heap.buildHeap(arr);
heap.sort(arr);
console.log(arr);
