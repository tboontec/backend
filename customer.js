// This file will contain the queries to the customer table
const database = require("./database");
const express = require("express");

// Allows us to define a mapping from the URI to a function
router = express.Router();

// API: [Create] a new customer record received in the request
router.post("/customer/add", (request, response) => {
  database.connection.all(
    `insert into customer (name, email) values ('${request.body.nameA}','${request.body.emailA}')`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record saved successfully!");
      }
    }
  );
});

// API: [Read] list all customers
router.get("/customer/all", (request, response) => {
  database.connection.all("select * from customer", (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  });
});

// API: [Read] takes email in the request and return the customer in response
router.get("/customer/search", (request, response) => {
  sqlst = `select * from customer where email  = '${request.query.emailS}'`,
    database.connection.all(
      sqlst,
      (errors, results) => {
        if (errors) {
          response.status(500).send("Some error occurred" + sqlst);
        } else {
          response.status(200).send(results);
        }
      }
    );
});

// API: [Read] takes email & pwd in the request and return the orders of the customer
router.post("/customer/login", (request, response) => {
  sqlst = `select c.name as custName, i.name, o.quantity, o.shipping_date from customer c, item i, shop_order o where c.email = '${request.body.emailL}' and c.pwd = '${request.body.pwdL}'`,
    database.connection.all(
      sqlst,
      (errors, results) => {
        if (errors) {
          response.status(500).send("Some error occurred" + sqlst);
        } else {
          response.status(200).send(results);
        }
      }
    );
});

// API: [Update] password for given customer email
router.put("/customer/update", (request, response) => {
  sqlstmt = `UPDATE customer SET pwd  = '${request.body.pwdU}'
    WHERE email = "${request.body.emailU}"`;

  database.connection.all(
    sqlstmt,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred" + sqlstmt);
      } else {
        response.status(200).send("Record updated successfully!" + sqlstmt);
      }
    }
  );
});

// API: [Delete] customer based on email
router.delete("/customer/delete", (request, response) => {
  database.connection.all(
    `delete from customer where email  = '${request.query.emailD}'`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record deleted successfully!");
      }
    }
  );
});

module.exports = {
  router,
};
