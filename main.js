// define UnionFind algorithm object
var UnionFind = function(type) {
  this.length = 10;
  this.count = this.length;
  this.parentIdStore = [];
  this.size = [];
  this.type = type;
  this.populateParentIdStore(this.parentIdStore, this.length);
  this.populateParentIdStore(this.size, this.length);
};

UnionFind.prototype.populateParentIdStore = function(array, n) {
  for (var i = 0; i < n; i++) {
    array.push(i);
  }
};

UnionFind.prototype.find = function(index) {
  if (this.type === 'quickFind') {
    return this.parentIdStore[index];
  } else if (this.type === 'quickUnion') {
    while (index !== this.parentIdStore[index]) {
      index = this.parentIdStore[index];
    }
    return index;
  } else if (this.type === 'weightedQuickUnion') {
    // weighted quick union implementation
    while (index !== this.parentIdStore[index]) {
      index = this.parentIdStore[index];
    }
    return index;
  } else {
    console.error('error');
  }
};

UnionFind.prototype.count = function(type) {
  // return number of components
  return this.count;
};

UnionFind.prototype.union = function(child, parent) {
  if (this.type === 'quickFind') {
    // change parentId of child to index of parent: make child (p) the child of parent (q)
    var child = this.find(child);
    var parent = this.find(parent);
    if (child === parent) return;
    for (var i = 0; i < this.parentIdStore.length; i++) {
      if (this.parentIdStore[i] === child) {
        this.parentIdStore[i] = parent;
      }
    }
    this.count--;
  } else if (this.type === 'quickUnion') {
    // quick union implementation
    var childRoot = this.find(child);
    var parentRoot = this.find(parent);
    if (childRoot === parentRoot) return;
    this.parentIdStore[childRoot] = parentRoot;
    this.count--;
  } else if (this.type === 'weightedQuickUnion') {
    // weighted quick union implementation
    var childRoot = this.find(child);
    var parentRoot = this.find(parent);
    if (childRoot === parentRoot) return;
    if (this.size[childRoot] < this.size[parentRoot]) {
      this.parentIdStore[childRoot] = parentRoot;
      this.size[parentRoot] = childRoot;
    } else {
      this.parentIdStore[parentRoot] = childRoot;
      this.size[childRoot] = parentRoot;
    }
  } else {
    console.error('error');
  }
  console.log(this.parentIdStore);
};

UnionFind.prototype.connected = function(type, indexA, indexB) {
  // return true if indexA and indexB are connected, else false
};

// define App object
var App = function() {
  this.selectionForm = document.getElementById('selectionForm');
  this.unionForm = document.getElementById('unionForm');
  this.screen = document.getElementById('screen');
  this.currentAlgorithm = null;

  var self = this;
  this.selectionForm.addEventListener('submit', function(event) {
    var userSelection = document.getElementById('selection').value;
    self.selectAlgorithm(userSelection);
    event.preventDefault();
  });

  this.unionForm.addEventListener('submit', function(event) {
    var child = document.getElementById('child');
    var parent = document.getElementById('parent');
    self.currentAlgorithm.union(child.value, parent.value);
    child.value = '';
    parent.value = '';
    event.preventDefault();
  });
};

App.prototype.selectAlgorithm = function(selection) {
  var unionForm = document.getElementById('secondForm');
  this.currentAlgorithm = new UnionFind(selection);
  this.drawScreen(this.currentAlgorithm);
  unionForm.classList.add('visible');
  unionForm.classList.remove('hidden');
};

App.prototype.drawScreen = function(algObj) {
  // use algObg properties to render table
};

// make a new App object
var app = new App();
