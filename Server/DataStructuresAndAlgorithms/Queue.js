class Node 
{
    constructor(value) 
    {
        this.value = value;
        this.next = null;
    }
}

class Queue 
{
    constructor() 
    {
        this.head = null;
        this.tail = null;
    }

    Enqueue(value) 
    {
        const newNode = new Node(value);
        if (this.head === null) 
        {
            this.head = newNode;
            this.tail = newNode;
        } 
        else 
        {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    Dequeue() 
    {
        if (this.IsEmpty()) 
        {
            return "No elements to dequeue";
        }
        const dequeuedValue = this.head.value;
        this.head = this.head.next;
        if (this.head === null) 
        {
            this.tail = null;
        }
        return dequeuedValue;
    }

    Peek() 
    {
        if (this.IsEmpty()) 
        {
            return "Queue is empty";
        }
        return this.head.value;
    }

    IsEmpty() 
    {
        if(this.head === null)
        {
            return true
        }
        return false;
    }
}