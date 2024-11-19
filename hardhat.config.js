/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x5c98d038b6aea10535d92c9e414ce0c41c86d0356db49a08cfff8568ada453a9", // Private key 2
        "0xe0040c2f4d278d865c7b6112ba0934421ee73297cca794052bca1091203426f0"  // Private key 1
      ],
    },
  },
};
