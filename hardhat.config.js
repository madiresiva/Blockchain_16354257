/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x8ea73b5a7676ba564cf2c00b8a91cbb06e042e884c2440c3ecf21f081913156a", // Private key 2
        "0xcb5a365641a97061fe12d4d20f42f2d6cc3f34fb018ea2d559d5dfcc07be32e6"  // Private key 1
      ],
    },
  },
};
