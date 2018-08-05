# Balances API

## REST API - Available Endpoints

### Fetches user current balance

- Method: `GET`
- Endpoint: `/balance`
- Response:
 
```
{
  "value": 300.50
}
```

### Fetches user transactions

- Method: `GET`
- Endpoint: `/transactions`
- Response:

```
[
  {
    "type": "WITHDRAWAL",
    "value": -10,
    "updatedAt": 1533270651427,
    "id": 1
  },
  {
    "type": "DEPOSIT",
    "value": 50,
    "updatedAt": 1533270663879,
    "id": 2
  }
]
```

### Creates a deposit

- Method: `POST`
- Endpoint: `/transactions`
- Payload:

```
{
  "type": "DEPOSIT",
  "value": 30
}
```

- Response:

```
{
  "type": "DEPOSIT",
  "value": 30,
  "updatedAt": 1533270663879,
  "id": 3
}
```

### Creates a WITHDRAWAL

- Method: `POST`
- Endpoint: `/transactions`
- Payload:

```
{
  "type": "WITHDRAWAL",
  "value": -30
}
```

- Response:

```
{
  "type": "WITHDRAWAL",
  "value": -30,
  "updatedAt": 1533270663879,
  "id": 3
}
```

## GraphQL API - Queries

### Fetches user transactions

```
query {
  transactions {
    type
    id
    value
    updatedAt
  }
}
```

### Fetches user balance

```
query {
  balance {
      value
  }
}
```

## GraphQL API - Mutations

### Creates a deposit
```
mutation {
  deposit (value: 10) {
    id
    type
    value
    updatedAt
  }
}
```

### Creates a WITHDRAWAL

```
mutation {
  WITHDRAWAL (value: 10) {
    id
    type
    value
    updatedAt
  }
}
```

You can see schema definition at <https://github.com/ketemartinsrufino/balances-api/blob/master/src/graphql/schema/schema.js#L17>