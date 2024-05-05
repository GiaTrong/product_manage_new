const ProductCategory = require("../models/product-category.model");

module.exports.getSubCategory = async (parentId) => {
  // tìm những thằng CON của category bằng đệ quy
  const getSubCategory = async (parentId) => {
    // tìm con bằng id category
    const subs = await ProductCategory.find({
      parent_id: parentId,
      deleted: false,
      status: "active",
    });

    let allSub = [...subs];

    for (const sub of subs) {
      // tìm những con(cháu) của con của category(ông)
      const childs = await getSubCategory(sub.id);
      allSub = allSub.concat(childs);
    }

    return allSub;
  };

  const result = await getSubCategory(parentId);

  return result;
};
