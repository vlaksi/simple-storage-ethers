const ethers = require('ethers');
// const solc = require("solc")
const fs = require('fs-extra');

async function main() {
  // First, compile this!
  // And make sure to have your ganache network up!
  let provider = new ethers.providers.JsonRpcProvider(
    'http://127.0.0.1:7545  '
  );
  let wallet = new ethers.Wallet(
    '367493441a2d413b4476b050d5dcfe9c1bdde98e5c4d9ece505e862d835dfbf2',
    provider
  );
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = wallet.connect(provider);
  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
  const binary = fs.readFileSync(
    './SimpleStorage_sol_SimpleStorage.bin',
    'utf8'
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying, please wait...');
  const contract = await contractFactory.deploy();
  console.log('\n\nDeploying is DONE !!');
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
