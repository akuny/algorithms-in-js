'use strict';

// define UnionFind algorithm object
var UnionFind = function(type) {
  this.length = 10;
  this.componentCount = this.length;
  this.parentIdStore = [];
  this.size = [];
  this.type = type;
  this.populateParentIdStore(this.parentIdStore, this.length);
  this.populateParentIdStore(this.size, this.length);
  this.count();
};

UnionFind.prototype.populateParentIdStore = function(array, n) {
  for (var i = 0; i < n; i++) {
    array.push(i);
  }
};

UnionFind.prototype.find = function(index) {
  if (this.type === 'quickFind') {
    return this.parentIdStore[index];
  } else if (this.type === 'quickUnion' || this.type === 'weightedQuickUnion') {
    while (index !== this.parentIdStore[index]) {
      index = this.parentIdStore[index];
    }
    return index;
  } else {
    console.error('error');
  }
};

UnionFind.prototype.count = function() {
  // return number of components
  return 'There are ' + this.componentCount + ' discrete components.';
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
    this.componentCount--;
  } else if (this.type === 'quickUnion') {
    // quick union implementation
    var childRoot = this.find(child);
    var parentRoot = this.find(parent);
    if (childRoot === parentRoot) return;
    this.parentIdStore[childRoot] = parentRoot;
    this.componentCount--;
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
  this.count();
};

UnionFind.prototype.connected = function(type, indexA, indexB) {
  // return true if indexA and indexB are connected, else false
};

// define App object
var App = function(screen) {
  this.selectionForm = document.getElementById('selectionForm');
  this.unionForm = document.getElementById('unionForm');
  this.screen = screen;
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
    var validC = self.validate(parseInt(child.value, 10));
    var validP = self.validate(parseInt(parent.value, 10));
    if (!validC || !validP) {
      self.screen.showError('Numbers from 0 to 9 only, please');
      self.screen.refresh(self.currentAlgorithm);
      child.value = '';
      parent.value = '';
      event.preventDefault();
    }
    self.currentAlgorithm.union(child.value, parent.value);
    self.screen.refresh(self.currentAlgorithm);
    child.value = '';
    parent.value = '';
    event.preventDefault();
  });
};

App.prototype.selectAlgorithm = function(selection) {
  var unionForm = document.getElementById('secondForm');
  this.currentAlgorithm = new UnionFind(selection);
  this.screen.refresh(this.currentAlgorithm);
  unionForm.classList.add('visible');
  unionForm.classList.remove('hidden');
};

App.prototype.turnOn = function() {
  this.Screen.refresh();
};

App.prototype.validate = function(input) {
  if (typeof input !== 'number') return false;
  if (isNaN(input)) return false;
  if (input > 9) return false;
  return true;
};

// define screen object
var Screen = function() {
  this.nodeScreen = document.getElementById('node');
  this.parentIdScreen = document.getElementById('parentId');
  this.countScreen = document.getElementById('count');
  this.errorScreen = document.getElementById('error');
};

Screen.prototype.refresh = function(algObj) {
  /*
   * TODO conditionally display error message
   */

  var indexes = function(array) {
    var arrayOfIndexes = [];
    for (var i = 0; i < array.length; i++) {
      arrayOfIndexes.push(i);
    }
    return arrayOfIndexes;
  };
  this.countScreen.innerHTML = algObj.count();
  this.nodeScreen.innerHTML = 'node: ' + indexes(algObj.parentIdStore);
  this.parentIdScreen.innerHTML = 'parent id: ' + algObj.parentIdStore;
};

Screen.prototype.showError = function() {
  this.errorScreen.innerHTML = 'Numbers from 0 to 9 only, please';
};

// make a new App object
(function() {
  var screen = new Screen();
  var app = new App(screen);
})();
