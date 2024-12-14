class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

function height(node) {
    if (node === null) return 0;
    return node.height;
}

function balanceFactor(node) {
    return height(node.left) - height(node.right);
}

function rotateLeft(x) {
    let y = x.right;
    let T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = 1 + Math.max(height(x.left), height(x.right));
    y.height = 1 + Math.max(height(y.left), height(y.right));

    return y;
}

function rotateRight(y) {
    let x = y.left;
    let T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = 1 + Math.max(height(y.left), height(y.right));
    x.height = 1 + Math.max(height(x.left), height(x.right));

    return x;
}

function findMinNode(node) {
    let current = node;
    while (current.left !== null) {
        current = current.left;
    }
    return current;
}

function insert(root, key) {
    if (root === null) {
        return new Node(key);
    }
    if (key < root.key) {
        root.left = insert(root.left, key);
    } else if (key > root.key) {
        root.right = insert(root.right, key);
    } else {
        return root;
    }

    root.height = 1 + Math.max(height(root.left), height(root.right));

    let balance = balanceFactor(root);

    if (balance > 1 && key < root.left.key) {
        return rotateRight(root);
    }

    if (balance < -1 && key > root.right.key) {
        return rotateLeft(root);
    }

    if (balance > 1 && key > root.left.key) {
        root.left = rotateLeft(root.left);
        return rotateRight(root);
    }

    if (balance < -1 && key < root.right.key) {
        root.right = rotateRight(root.right);
        return rotateLeft(root);
    }

    return root;
}

function deleteNode(root, key) {
    if (root === null) {
        return root;
    }

    if (key < root.key) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.key) {
        root.right = deleteNode(root.right, key);
    } else {
        if (root.left === null || root.right === null) {
            let temp = root.left ? root.left : root.right;
            root = temp || null;
        } else {
            let temp = findMinNode(root.right);
            root.key = temp.key;
            root.right = deleteNode(root.right, temp.key);
        }
    }

    if (root === null) return root;

    root.height = 1 + Math.max(height(root.left), height(root.right));

    let balance = balanceFactor(root);

    if (balance > 1 && balanceFactor(root.left) >= 0) {
        return rotateRight(root);
    }

    if (balance < -1 && balanceFactor(root.right) <= 0) {
        return rotateLeft(root);
    }

    if (balance > 1 && balanceFactor(root.left) < 0) {
        root.left = rotateLeft(root.left);
        return rotateRight(root);
    }

    if (balance < -1 && balanceFactor(root.right) > 0) {
        root.right = rotateRight(root.right);
        return rotateLeft(root);
    }

    return root;
}

function search(root, key) {
    if (root === null) return null;
    if (key === root.key) return root.key;
    if (key < root.key) return search(root.left, key);
    if (key > root.key) return search(root.right, key);
    return null;
}

function preOrder(node) {
    if (node !== null) {

        preOrder(node.left);
        preOrder(node.right);
    }
}

function inOrder(node) {
    if (node !== null) {
        inOrder(node.left);
        inOrder(node.right);
    }
}

function postOrder(node) {
    if (node !== null) {
        postOrder(node.left);
        postOrder(node.right);
    }
}

module.exports = {
    Node,
    height,
    balanceFactor,
    rotateLeft,
    rotateRight,
    findMinNode,
    insert,
    deleteNode,
    search,
    preOrder,
    inOrder,
    postOrder
};


