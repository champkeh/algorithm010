class Stack {
    constructor() {
        this.data = [];
    }

    empty() {
        return this.data.length === 0;
    }

    peek() {
        return this.data[this.data.length - 1];
    }

    pop() {
        return this.data.pop();
    }

    push(item) {
        return this.data.push(item);
    }

    search(item) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] === item) {
                // 1-based position
                return i + 1;
            }
        }
        return -1;
    }
}

const s = new Stack();
s.peek()
