
## Test notification service by adding a new reciept

```bash
curl -i -X POST http://localhost:3000/receipts \
  -H "Content-Type: application/json" \
  -H "x-api-key: itc-123" \
  -d '{"issuedAt":"2026-04-02T21:35:00Z","name":"Fixed Module","price":10.99}'
```

## one for order

```bash
curl -i -X POST http://localhost:3000/orders  \
  -H "Content-Type: application/json" \
  -H "x-api-key: itc-123" \
  -d '{"name":"Fixed Module","price":10.99}'
```