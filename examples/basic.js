const init = require('../index').init
const defaultConfig = require('config.dev')

config = {
    account: '0x22D481f977abfB7471d1b1b65465754074A7db5c',
    addresses: require('./misc/constants/addresses'),
    abiPath: __dirname + '/misc/constants/abi/'
}

init({...defaultConfig, ...config}).then(async web3 => {
  try {
    console.log('successfully connected to web3')
    console.log(`web3 version: ${web3.version}`)
    console.log(`provider host: ${web3.currentProvider.host}`)
    console.log(`account: ${web3.eth.personal.defaultAccount}`)

    const networkType = await web3.eth.net.getNetworkType()
    console.log(`network: ${networkType}`)

    const status = await web3.eth.isSyncing()
    console.log(`is syncing: ${JSON.stringify(status)}`)

    const balance = await web3.eth.getBalance(web3.eth.personal.defaultAccount)
    console.log(`balance: ${balance}`)

    if (networkType === 'ropsten') {
      const receipt = await web3.eth.sendTransaction({
        value: 10 ** 17,
        to: '0x0d4DF041Dbef6fFC0E444a4a213774AdB0c118C2',
        gasPrice: 10
      }).on('transactionHash', (transactionHash) => {
        console.log(`transactionHash: ${transactionHash}`)
        console.log('The network might be busy, so this call might hang up.')
      })
      console.log('receipt:')
      console.log(receipt)
    }
  } catch (e) {
    console.error(e)
  }
})