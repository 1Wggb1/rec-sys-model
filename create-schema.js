db = db.getSiblingDB("rec_system_db");

db.createCollection("user_profile");
db.createCollection("product");
db.createCollection("product_category");
db.createCollection("recommendation");
db.createCollection("interaction");

db.user_profile.insertMany([
 {
    name: "Will",
    email: "will@will.ru",
    preferences: ["horror", "top_10_books", "fiction movies", "cars", "most_selled"]
  },
  {
    name: "Naty",
    email: "naty@naty.ch"
  },
  {
    name: "Joana",
    email: "joana@joana.jp",
    bornDate: Date(),
    preferences: ["japonese things", "top_10_novels"]
  } 
]);


db.product_category.insertMany([
  {
      name: "Livros",
      tags: ["top_100"]
  },
  {
      name: "Eletrônicos",
      tags: ["most_selled"]
  },
  {
      name: "Beleza",
  },
  {
      name: "Roupas",
      tags: ["top_2", "most_selled"]
  }
]);

const bookCategoryId = db.product_category.findOne({name: "Livros"}, {_id: 1})["_id"]
const cloutingId = db.product_category.findOne({name: "Roupas"}, {_id: 1})["_id"]
const lookingId = db.product_category.findOne({name: "Beleza"}, {_id: 1})["_id"]
db.product.insertMany([
  {
      name: "Como fazer amigos e influenciar pessoas",
      tags: ["top_100"],
      productCategoryId: bookCategoryId
  },
  {
      name: "Camiseta Malloy Brickleberry",
      tags: ["never_selled"],
      productCategoryId: cloutingId
  },
  {
      name: "Gel anti-espinhas",
      tags: ["top_10_teenager", "most_selled", "teen"],
      productCategoryId: lookingId
  }
]);
