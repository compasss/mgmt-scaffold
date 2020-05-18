export default {
  listToTree(list) {
    var map = {}, node, tree= [], i;
    for (i = 0; i < list.length; i ++) {
      map[list[i].id] = list[i];
      list[i].child = [];
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.pid !== '-1') {
        map[node.pid].child.push(node);
      } else {
        tree.push(node);
      }
    }
    return tree;
  }
}
