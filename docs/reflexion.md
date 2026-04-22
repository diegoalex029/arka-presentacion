---
id: reflexion
sidebar_position: 3
title: Reflexión y Cierre
---

# Reflexión y cierre

## ¿Qué aprendí?

Este proyecto fue un reto que me permitió aplicar de forma práctica conceptos que conocía de manera teórica. Los aprendizajes más significativos fueron:

**Arquitectura hexagonal en la práctica** — entender que el dominio no debe depender de nada externo no es solo una regla, es lo que permite que el sistema sea mantenible y testeable a largo plazo.

**Programación reactiva** — el cambio de mentalidad de imperativo a reactivo fue retador. Entender cuándo usar `flatMap` vs `map`, cómo encadenar operaciones asíncronas y manejar errores en cadenas reactivas fue uno de los aprendizajes más valiosos.

**Sagas coreografiadas con Kafka** — diseñar flujos distribuidos donde los servicios no se conocen entre sí sino que reaccionan a eventos fue fascinante. Ver cómo un item pasa de `PENDING` a `RESERVED` a `CONFIRMED` a través de múltiples servicios sin una llamada directa entre ellos es algo que no olvidaré.

**R2DBC vs JPA** — trabajar sin las comodidades de JPA (cascade, lazy loading, relaciones automáticas) me obligó a ser explícito en cada operación de persistencia. Eso me dio un entendimiento más profundo de lo que ocurre realmente en la base de datos.

**Infraestructura como código** — definir toda la infraestructura AWS en CloudFormation y verla desplegarse automáticamente con LocalStack fue revelador sobre cómo funciona el mundo cloud en la realidad.

## ¿Qué haría diferente?

**Un frontend para visualización** — tener un frontend habría permitido demostrar el flujo completo de forma más intuitiva. Ver en tiempo real cómo el estado de un item cambia de `PENDING` a `RESERVED` en una interfaz gráfica sería mucho más impactante que mostrar logs o consultas a la base de datos.

**Despliegue directamente en AWS** — usar LocalStack fue excelente para el desarrollo local, pero me habría gustado llevar el proyecto a AWS real para entender los matices de un despliegue en producción — permisos IAM, VPCs, grupos de seguridad, y los costos reales de cada servicio.

**Pruebas unitarias más completas** — con la presión del tiempo prioricé la funcionalidad sobre la cobertura de pruebas. En un proyecto real el enfoque sería al revés — primero las pruebas, luego la implementación.

## ¿Qué quiero seguir fortaleciendo?

El universo de la tecnología es enorme y este proyecto me mostró cuánto hay por explorar. Quiero seguir aprendiendo y plasmar ese conocimiento en proyectos reales:

- **Pruebas** — TDD, pruebas de integración con Testcontainers, pruebas de contratos con Pact
- **Observabilidad** — distributed tracing con Jaeger, métricas con Prometheus y Grafana
- **Kubernetes** — orquestar los microservicios en un cluster real
- **AWS en producción** — llevar proyectos reales a la nube y entender los costos y trade-offs
- **Frontend moderno** — React o Vue para complementar el backend y mostrar el valor completo de una solución

---

> *"El conocimiento se consolida cuando se aplica. Este proyecto es solo el comienzo."*
>
> — Diego Alexander Zambrano S.