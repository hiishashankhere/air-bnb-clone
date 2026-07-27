# Scalability Plan

## High-Level Architecture for a Production-Scale Vacation Rental Marketplace

This document captures the evolving backend and infrastructure design for a vacation-rental marketplace as traffic grows from a small MVP to a large-scale production system.

## Level 1: Beginner Stage (0 to 1,000 users)

At this stage, the system should stay simple and cost-effective.

```text
User
  -> Vite React App (hosted on Vercel)
  -> HTTPS
  -> Node.js + Express API
  -> Sequelize ORM
  -> Neon PostgreSQL
```

### Core Responsibilities

- JWT-based authentication
- Razorpay integration for payments
- Cloudinary for image storage
- ACID-compliant database operations for consistency and reliability

### Design Goal

Focus on fast iteration, clean data modeling, and a minimal number of moving parts.

## Level 2: Growth Stage (1,000 to 10,000 users)

As traffic increases, the system should add caching, better asset delivery, and background processing.

```text
Users
  -> Cloudflare CDN (for images)
  -> Vite React App (hosted on Vercel)
  -> API Gateway
  -> Node API Instance 1 / Node API Instance 2
  -> Load Balancer
  -> Redis Cache Layer
  -> Sequelize ORM
  -> PostgreSQL Primary Database
  -> Read Replica Database
```

### Additional Capabilities

- Use Redis to reduce database pressure and speed up repeated reads
- Run background jobs with BullMQ on top of Redis
- Use background workers for:
  - email notifications
  - image processing
  - payment webhooks and transaction handling
  - booking confirmations

### Design Goal

Improve response times and reliability without over-engineering the platform.

## Level 3: Large-Scale Stage (100,000 to 1 Million users)

At this stage, the architecture should move toward service separation, stronger observability, and higher availability.

```text
Users
  -> Global CDN (Cloudflare)
  -> Load Balancer
  -> Multiple API Servers
  -> API Gateway
  -> Service Layer
      -> Auth Service
      -> Booking Service
      -> Payment Service
  -> Redis Cache
  -> Booking Queue
  -> Razorpay
  -> BullMQ
  -> Kafka / RabbitMQ
  -> Background Workers
  -> PostgreSQL Cluster
      -> Primary Database
      -> Read Replicas
```

### Supporting Infrastructure

- Use CloudFront or a similar CDN for image delivery when global distribution becomes important
- Add Prometheus and Grafana for metrics and dashboards
- Use Sentry for error tracking and application monitoring
- Package and deploy services with Docker
- Use GitHub Actions for CI/CD automation

### Design Goal

Support high throughput, isolate critical business capabilities, and keep the system observable and maintainable.

## Key Principles

- Keep the first version simple and move to distributed components only when needed
- Use caching to reduce load on the primary database
- Separate synchronous API paths from asynchronous background work
- Prefer read replicas for read-heavy workloads
- Use queues for reliable, retryable, non-blocking tasks
- Preserve ACID guarantees for transactional operations such as bookings and payments

## Notes

- The exact tool choices can change, but the architectural direction should stay the same.
- If this is used in an interview or system-design discussion, present it as a phased evolution rather than a single final design.

