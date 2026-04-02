# Test the API with curl

## Create receipt
```bash
curl -i -X POST http://localhost:3000/receipts \
  -H "Content-Type: application/json" \
  -d '{"issuedAt":"2026-03-19T22:30:00.000Z","name":"Coffee","price":3.5}'
```

## List all receipts
```bash
curl -i http://localhost:3000/receipts
```

## Get one receipt (example id=1)
```bash
curl -i http://localhost:3000/receipts/1
```

## Update one receipt (example id=1)
```bash
curl -i -X PATCH http://localhost:3000/receipts/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Latte","price":4.25}'
```

## Delete one receipt (example id=1)
```bash
curl -i -X DELETE http://localhost:3000/receipts/1
```

# Test the API key authentication

## without API key
```bash
curl -i http://localhost:3000/receipts
```

## with API key
```bash
curl -i http://localhost:3000/receipts -H "x-api-key: itc-123"
```