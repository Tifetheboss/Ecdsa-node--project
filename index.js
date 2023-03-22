const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04b38b1a9d387e569200897c53af839b0bbdc974a54afdb744489ce647031e3a1fe5945e1e7faf82abf997716a0a76d5891f0bf963f563a3bafada6d993462c52f": 100,//bolu
  " 043d7151e9abe5bfea53accbd9f8a5a0556b2b9c9510b7e1b15075100d0ead7a51716497a4f234190038c064eac1b53e48f59985e8d24eefafd8a16b82479ff73c": 50,//tife
  "0498ce13322927e89223a49c99c63084111655d77a04d395124d0cec9a60e556e590a58dc0b894638918e348fa7aed6bb9c2a252ee0f028e72c7c27b8a8b8c73a2": 75,//theboss
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
