// define UnionFind algorithm object
var UnionFind = function(type) {
  this.length = 10;
  this.parentIdStore = [];
  this.type = type;
  this.populateParentIdStore(this.parentIdStore, this.length);
};

UnionFind.prototype.populateParentIdStore = function(array, n) {
  for (var i = 0; i < n; i++) {
    array.push(i);
  }
};

UnionFind.prototype.find = function(index) {
  return this.parentIdStore[index];
};

UnionFind.prototype.count = function(type) {
  // return number of components
};

UnionFind.prototype.union = function(type, child, parent) {
  // change parentId of child to index of parent: make child (p) the child of parent (q)
  var child = this.find(child);
  var parent = this.find(parent);
  if (child === parent) return;
  for (var i = 0; i < this.parentIdStore.length; i++) {
    if (this.parentIdStore[i] === child) {
      this.parentIdStore[i] = parent;
    }
  }
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
    var child = document.getElementById('child').value;
    var parent = document.getElementById('parent').value;
    self.currentAlgorithm.union(null, child, parent);
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
