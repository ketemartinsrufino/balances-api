const data = require('./../../data.json')
const transactions = data.transactions;

const getBalance = () => {
    return {
        value: transactions.reduce((acc, t) => {
                    acc += t.value;
                    return acc;
                },0)
    }
}

const mountTransaction = ({type, value}) => {
    const transaction = {
        type,
        value,
        updatedAt: Date.now()
    };
    if(type === 'WITHDRAW') {
        transaction.value = -transaction.value;
    }
    return transaction;
}

module.exports = {
    mountTransaction,
    getBalance
}