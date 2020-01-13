const { Product } = require("../models");

const controller = {
  getAll: async (req, res) => {
    try {
      const products = await Product.findAll();

      res.status(200).send(products);
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error"
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findOne({ where: { id: id } });

      if (!product) {
        res.status(400).send({ message: "Product not exists" });
      } else {
        res.status(200).send(product);
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error"
      });
    }
  },
  addOne: async (req, res) => {
    try {
      const { name, category, quantity, price } = req.body;
      await Product.create({ name, category, quantity, price });

      res.status(201).send({ message: "Product added" });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error"
      });
    }
  },
  updateOne: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, quantity, price } = req.body;

      const product = await Product.findOne({ where: { id: id } });

      if (!product) {
        res.status(400).send({ message: "Product not exists" });
      } else {
        await product.update({ ...product, name, category, quantity, price });

        res.status(200).send({ message: "Product was updated" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error"
      });
    }
  },
  deleteOne: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findOne({ where: { id: id } });

      if (!product) {
        res.status(400).send({ message: "Product not exists" });
      } else {
        await product.destroy();
        res.status(200).send({ message: "Product deleted" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error"
      });
    }
  }
};

module.exports = controller;
