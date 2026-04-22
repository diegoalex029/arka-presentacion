---
id: comunicacion
sidebar_position: 3
title: Comunicación entre Servicios
---

# Comunicación entre servicios

ARKA implementa el patrón **Saga coreografiada** para coordinar operaciones que involucran múltiples microservicios. No existe un orquestador central — cada servicio reacciona a los eventos que le corresponden.

## Tópicos de Kafka

| Tópico | Publicado por | Consumido por | Propósito |
|---|---|---|---|
| `stock-reserve-requested` | ms-orders | ms-inventory | Solicitar reserva de stock |
| `stock-reserved` | ms-inventory | ms-orders, ms-notifications | Confirmar reserva exitosa |
| `stock-reserve-failed` | ms-inventory | ms-orders | Notificar stock insuficiente |
| `stock-release-requested` | ms-orders | ms-inventory | Solicitar liberación de stock |
| `stock-released` | ms-inventory | ms-orders | Confirmar liberación |
| `order-created` | ms-orders | ms-notifications | Orden creada |
| `order-confirmed` | ms-orders | ms-inventory, ms-notifications | Orden confirmada |
| `order-abandoned` | ms-orders | ms-notifications | Orden abandonada |
| `order-cancelled` | ms-orders | ms-inventory, ms-notifications | Orden cancelada |

## Flujo: agregar item a una orden

```mermaid
sequenceDiagram
    participant C as Cliente
    participant O as ms-orders
    participant K as Kafka
    participant I as ms-inventory
    participant N as ms-notifications

    C->>O: POST /api/orderitem
    O->>O: Crea/busca orden DRAFT
    O->>O: Guarda item (PENDING)
    O->>K: stock-reserve-requested
    O-->>C: 200 OK (item en PENDING)
    
    K->>I: stock-reserve-requested
    I->>I: Valida stock disponible
    
    alt Stock suficiente
        I->>I: Resta stock
        I->>I: StockMovement RESERVED
        I->>K: stock-reserved
        K->>O: stock-reserved
        O->>O: Item → RESERVED
    else Stock insuficiente
        I->>K: stock-reserve-failed
        K->>O: stock-reserve-failed
        O->>O: Item → FAILED
    end

    K->>N: order-created
    N->>N: Guarda notificación
    N->>N: Log correo ficticio
```

## Flujo: confirmar orden

```mermaid
sequenceDiagram
    participant C as Cliente
    participant O as ms-orders
    participant K as Kafka
    participant I as ms-inventory
    participant N as ms-notifications

    C->>O: POST /api/orders/{id}/confirm
    O->>O: Valida items en RESERVED
    O->>O: Orden → CONFIRMED
    O->>O: Items → CONFIRMED
    O->>K: order-confirmed
    O-->>C: 200 OK

    K->>I: order-confirmed
    I->>I: StockMovement DECREASE
    
    K->>N: order-confirmed
    N->>N: Guarda notificación
    N->>N: Log correo ficticio
```

## Flujo: eliminar item

```mermaid
sequenceDiagram
    participant C as Cliente
    participant O as ms-orders
    participant K as Kafka
    participant I as ms-inventory
    participant N as ms-notifications

    C->>O: DELETE /api/orders/{id}/items/{productId}
    O->>O: Elimina item de la orden
    
    alt Era el último item
        O->>O: Orden → ABANDONED
        O->>K: order-abandoned
        K->>N: order-abandoned
        N->>N: Log correo ficticio
    end
    
    O->>K: stock-release-requested
    O-->>C: 200 OK

    K->>I: stock-release-requested
    I->>I: Devuelve stock
    I->>I: StockMovement RELEASED
    I->>K: stock-released
    K->>O: stock-released
    O->>O: Item → RELEASED
```

## CloudEvents

Todos los mensajes en Kafka siguen el estándar **CloudEvents**, que agrega metadata al mensaje:

```json
{
  "specversion": "1.0",
  "id": "uuid",
  "source": "https://arka.co/orders",
  "type": "stock-reserve-requested",
  "time": "2026-04-16T00:00:00Z",
  "data": {
    "orderId": 1,
    "productId": 5,
    "quantity": 2
  }
}
```

Esto permite que cualquier consumidor identifique el tipo de evento sin depender del nombre del tópico ni del formato interno.