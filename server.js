const express = require("express");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  user: "",
  password: "",
  host: "localhost",
  database: "cyf_ecommerce_api",
  port: 5432,
});

const listAllProducts =
  "select products.product_name , suppliers.supplier_name " +
  "from products join suppliers on products.supplier_id = suppliers.id";

const listProductsByName =
  "select products.product_name, suppliers.supplier_name " +
  " from products join suppliers on products.supplier_id = suppliers.id " +
  " where products.product_name like $1";


const customersById = "select * from customers where id = $1";

app.get("/customers", (req, res) => {
  pool.query("select * from customers", (error, result) => {
    res.json(result.rows);
  });
});

const findCustomersById = "select * from customers where id = $1";

app.get("/customers/:customersId", function (req, res) {
    let customersId = req.params.customersId;
    pool.query(findCustomersById, [customersId], (error, result) => {
        if (result.rows.length === 0) {
            res.send(`There are no customers with id ${customersId}`);
        } else {
            res.json(result.rows);
        }
    })
});

app.get("/products", function (req, res) {
  let productNameLike = req.query.productName;

  if (!productNameLike) {
    // Client is not sending any name
    pool.query(listAllProducts, (error, result) => {
      if (error) {
        console.error(e);
        res.send("Error al buscar productos");
      } else {
        res.json(result.rows);
      }
    });
  } else {
    pool
      .query(listProductsByName, ["%" + productNameLike + "%"])
      .then((result) => {
        res.json(result.rows);
      })
      .catch((e) => {
        console.error(e);
        res.send("Error al buscar productos pro nombre");
      });
  }
});

const findProductsById = "select * from customers where id = $1";

app.get("/customers/:customersId", function (req, res) {
  let customersId = req.params.customersId;
  pool.query(findCustomersById, [customersId], (error, result) => {
    if (result.rows.length === 0) {
      res.send(`There are no customers with id ${customersId}`);
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("select * from suppliers", (error, result) => {
    res.json(result.rows);
  });
});

const findSuppliersById = "select * from customers where id = $1";

app.get("/customers/:customersId", function (req, res) {
  let customersId = req.params.customersId;
  pool.query(findCustomersById, [customersId], (error, result) => {
    if (result.rows.length === 0) {
      res.send(`There are no customers with id ${customersId}`);
    } else {
      res.json(result.rows);
    }
  });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
