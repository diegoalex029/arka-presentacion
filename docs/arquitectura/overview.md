---
id: overview
sidebar_position: 1
title: Vista General
---

# Vista general del sistema

ARKA está construido sobre una arquitectura de microservicios donde cada servicio es independiente, tiene su propia base de datos y se comunica de forma asíncrona a través de Apache Kafka.

## Diagrama general

```mermaid
graph TB
    Cliente(["👤 Cliente"])
    
    subgraph "Microservicios"
        MSI["ms-inventory<br/>:8081"]
        MSO["ms-orders<br/>:8082"]
        MSN["ms-notifications<br/>:8083"]
    end
    
    subgraph "Mensajería"
        Kafka["Apache Kafka"]
    end
    
    subgraph "Bases de datos"
        DBI[("db-inventory")]
        DBO[("db-orders")]
        DBN[("db-notifications")]
    end

    subgraph "AWS LocalStack"
        SM["Secrets Manager"]
        S3["S3"]
        SQS["SQS"]
        EB["EventBridge"]
        SES["SES"]
    end

    Cliente --> MSI
    Cliente --> MSO
    MSI <--> Kafka
    MSO <--> Kafka
    MSN <--> Kafka
    MSI --- DBI
    MSO --- DBO
    MSN --- DBN
    MSI --> S3
    EB --> SQS --> MSI
```

## Principios de diseño

**Database per Service** — cada microservicio tiene su propia base de datos PostgreSQL. Ningún servicio accede directamente a la base de datos de otro.

**Event-driven architecture** — los servicios no se llaman directamente entre sí. Se comunican publicando y consumiendo eventos en Kafka.

**Reactive programming** — todos los servicios usan Spring WebFlux con R2DBC para operaciones no bloqueantes.

**Infrastructure as Code** — toda la infraestructura AWS está definida en CloudFormation y se despliega automáticamente con LocalStack.

## Puertos y servicios

| Servicio | Puerto | Base de datos |
|---|---|---|
| ms-inventory | 8081 | db-inventory:5431 |
| ms-orders | 8082 | db-orders:5433 |
| ms-notifications | 8083 | db-notifications:5434 |
| Kafka | 9092 | — |
| Kafka UI | 8080 | — |
| LocalStack | 4566 | — |