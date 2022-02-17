const dotenv = require("dotenv");
require("@nomiclabs/hardhat-waffle");

dotenv.config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.BLOCKCHAIN_URL,
      accounts: [process.env.METAMASK_PRIVATE],
    },
  },
};
