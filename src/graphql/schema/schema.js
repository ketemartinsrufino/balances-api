const graphql = require('graphql');
const axios = require('axios');
const transaction = require('../../controller/transaction')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNull,
    GraphQLNonNull,
    GraphQLEnumType
    // GraphQLFloat,
} = graphql;

const TransationTypeEnum = new GraphQLEnumType({
    name: 'TransationType',
    values: {
        "DEPOSIT": {
            value: 'DEPOSIT',
        },
        "WITHDRAW": {
            value: 'WITHDRAW'
        }
    }
});

const TransactionType = new GraphQLObjectType({
    name: 'Transaction',
    fields: () => ({
        id: {type: GraphQLString},
        type: {type: TransationTypeEnum},
        value: {type: GraphQLInt},
        updatedAt: {type: GraphQLString},
    })
});

const BalanceType = new GraphQLObjectType({
    name: 'Balance',
    fields: () => ({
        value: {type: GraphQLInt},
    })
});

const query = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        transactions: {
            type: GraphQLList(TransactionType),
            args: {type: {type: TransationTypeEnum}},
            resolve(parentValue, {type}) {
                const url = "http://localhost:3000/transactions" + (type ? `?type=${type}` : "");
                return axios.get(url).then(res => res.data);
            }
        },
        balance: {
            type: BalanceType,
            args: {type: {type: TransationTypeEnum}},
            resolve(parentValue, {type}) {
                const url = "http://localhost:3000/balance";
                return axios.get(url).then(res => res.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        deposit: {
            type: TransactionType,
            args: {
                value: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue, {value}) {
                return axios.post('http://localhost:3000/transactions', {type: 'DEPOSIT', value})
                        .then(res => res.data);
            }   
        },
        withdraw: {
            type: TransactionType,
            args: {
                value: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue, {value}) {
                return axios.post('http://localhost:3000/transactions', {type: 'WITHDRAW', value})
                        .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query,
    mutation,
})