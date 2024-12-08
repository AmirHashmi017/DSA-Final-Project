class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.head = null;
    }

    Push(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    Pop() {
        if (this.isEmpty()) {
            return "No elements to pop";
        }
        const toDelete = this.head.data;
        this.head = this.head.next;
        return toDelete;
    }

    Peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.head.data;
    }

    IsEmpty() {
        return this.head === null;
    }
}

module.exports = Stack;

