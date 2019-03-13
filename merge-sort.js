'use strict';

var MergeSort = function() {
  this.aux = [];
};

MergeSort.prototype.sort = function(array) {
  this._sort(array, 0, array.length - 1);
};

MergeSort.prototype._sort = function(array, lo, hi) {
  if (hi <= lo) {
    return;
  }
  var mid = lo + Math.floor((hi - lo) / 2);
  this._sort(array, lo, mid);
  this._sort(array, mid + 1, hi);
  this.merge(array, lo, mid, hi);
};

MergeSort.prototype.merge = function(array, lo, mid, hi) {
  var i = lo;
  var j = mid + 1;
  for (var k = lo; k <= hi; k++) {
    this.aux[k] = array[k];
  }
  for (var k = lo; k <= hi; k++) {
    if (i > mid) {
      array[k] = this.aux[j++];
    } else if (j > hi) {
      array[k] = this.aux[i++];
    } else if (this.aux[j] < this.aux[i]) {
      array[k] = this.aux[j++];
    } else {
      array[k] = this.aux[i++];
    }
  }
};

var test = new MergeSort();

var testArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

test.sort(testArray);

console.log(testArray);
