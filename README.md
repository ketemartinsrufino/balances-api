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
    "type": "WITHDRAW",
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

### Creates a transaction

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