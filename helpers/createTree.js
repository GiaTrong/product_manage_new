let count = 0; // biến toàn cục

const createTree = (arr, parentId = "") => {
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id == parentId) {
      count++;
      const newItem = item;
      newItem.index = count;
      const children = createTree(arr, item.id);

      if (children.length > 0) {
        newItem.children = children;
      }

      tree.push(newItem);
    }
  });

  return tree;
};

module.exports.createTree = (arr, parentId = "") => {
  count = 0; // nếu ở đây ko gán lại count = 0; => mỗi khi load lại trang, biến count toàn cục
             // sẽ không được khởi động lại => tăng mãi

  const tree = createTree(arr, (parentId = ""));

  return tree;
};
