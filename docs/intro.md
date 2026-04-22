---
id: intro
sidebar_position: 1
title: Introducción
---

# ARKA — Plataforma de E-Commerce

## ¿Quién soy?

Soy **Diego Alexander Zambrano S.**, desarrollador de software con enfoque en arquitecturas modernas y soluciones escalables. Este proyecto representa mi implementación de una plataforma de e-commerce basada en microservicios, desarrollada como parte del programa de formación **Enjoi AceleraTi**.

## ¿Qué es ARKA?

ARKA es una plataforma de comercio electrónico enfocada en productos tecnológicos, construida sobre una arquitectura de microservicios que busca resolver de forma robusta los retos de escalabilidad, desacoplamiento y trazabilidad en un sistema de ventas en línea.

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| Java 21 + Spring Boot 4 | Base de los microservicios |
| Spring WebFlux + R2DBC | Programación reactiva |
| Apache Kafka | Mensajería asíncrona entre servicios |
| PostgreSQL | Base de datos por servicio |
| AWS LocalStack | Simulación de servicios AWS |
| Docker + Docker Compose | Contenedorización y orquestación |
| Arquitectura Hexagonal | Separación de responsabilidades |
| Reactive Commons | Abstracción sobre Kafka |

## Microservicios desarrollados

| Servicio | Puerto | Responsabilidad |
|---|---|---|
| ms-inventory | 8081 | Gestión de productos y stock |
| ms-orders | 8082 | Gestión de órdenes de compra |
| ms-notifications | 8083 | Envío de notificaciones |

## Servicios AWS (LocalStack)

- **Secrets Manager** — credenciales de bases de datos y Kafka
- **S3** — almacenamiento de reportes CSV
- **SQS** — colas de mensajes para reportes programados
- **EventBridge** — reglas de eventos periódicos
- **SES** — envío de correos (preparado, pendiente de dominio)