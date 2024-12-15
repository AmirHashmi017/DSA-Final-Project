class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }

  prepend(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = this.tail = newNode;
      return;
    }
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }

  remove(data) {
    if (!this.head) return null;

    let current = this.head;
    while (current) {
      if (current.data === data) {
        if (current === this.head) {
          this.head = current.next;
          if (this.head) this.head.prev = null;
        } else if (current === this.tail) {
          this.tail = current.prev;
          if (this.tail) this.tail.next = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
        return current;
      }
      current = current.next;
    }
    return null;
  }

  toArray() {
    const nodes = [];
    let current = this.head;
    while (current) {
      nodes.push(current.data);
      current = current.next;
    }
    return nodes;
  }
}

module.exports = DoublyLinkedList;
