# Production Architecture & System Design Document: Vacation-Rental Marketplace (Airbnb-Scale)

This document presents a comprehensive production-grade system architecture for a high-concurrency, globally distributed vacation-rental marketplace (e.g. Airbnb).

---

## 1. High-Level Architecture Overview

```mermaid
flowchart TD
    Client[Web / Mobile Clients] --> Route53[DNS / Latency Routing]
    Route53 --> Cloudflare[Cloudflare CDN & WAF / Edge Workers]
    Cloudflare --> APIGateway[Kong / AWS API Gateway]
    
    subgraph Core Services Layer
        APIGateway --> AuthSvc[Auth Service (OAuth2 / JWT)]
        APIGateway --> SearchSvc[Search & Discovery Service]
        APIGateway --> ListingSvc[Listing Management Service]
        APIGateway --> BookingSvc[Booking & Reservation Engine]
        APIGateway --> ReviewSvc[Reviews & Ratings Service]
        APIGateway --> MediaSvc[Media Processing Service]
    end

    subgraph Caching & In-Memory Layer
        SearchSvc --> RedisCluster[(Redis Enterprise Cluster)]
        ListingSvc --> RedisCluster
        BookingSvc --> RedisLock[(Redis Distributed Lock / Redlock)]
    end

    subgraph Data Storage Layer
        ListingSvc --> ReadReplica[(PostgreSQL Read Replicas)]
        ListingSvc --> PrimaryDB[(PostgreSQL Primary DB)]
        SearchSvc --> ElasticSearch[(Elasticsearch / OpenSearch Cluster)]
        ReviewSvc --> Cassandra[(Apache Cassandra / DynamoDB)]
        MediaSvc --> S3[(AWS S3 / Cloudflare R2 Object Storage)]
    end

    subgraph Event-Driven Architecture
        BookingSvc --> Kafka[(Apache Kafka Cluster)]
        Kafka --> NotifSvc[Notification Service]
        Kafka --> Analytics[Data Warehouse / Snowflake]
    end
```

---

## 2. Component Deep Dive

### **Frontend & Client Layer**
- **Framework**: Next.js / React 19 SPA with Server-Side Rendering (SSR) and Edge Page Caching.
- **Routing**: URL Query State synchronization (`?modal=PHOTO_TOUR_SCROLLABLE`, `?modal=PHOTO_TOUR_LIGHTBOX&photoIndex=N`) for zero-drift deep-linking and seamless browser history navigation.
- **Styling & Motion**: Tailwind CSS v3 with dynamic HSL color tokens + Framer Motion micro-interactions.

### **Edge & CDN Layer**
- **Cloudflare Enterprise**: Global Anycast Edge Network providing:
  - **WAF & DDoS Mitigation**: Rate-limiting, IP reputation checks, bot protection.
  - **Edge Dynamic Caching**: Stale-while-revalidate strategy for public static assets and SSR HTML pages.

### **Image Optimization Service**
- **Cloudflare Images / Fastly IO**:
  - Auto-converts uploaded JPEG/PNG formats into modern **AVIF** and **WebP**.
  - Dynamic viewport resizing (`w_1200,q_80`) on the fly.
  - Lazy loading with blur-up placeholder hashes (BlurHash).

### **API Gateway**
- **Kong Gateway**:
  - Handles SSL termination, CORS, rate limiting per user/IP, dynamic API key validation, and JWT verification.
  - Routes traffic to downstream microservices over gRPC and REST APIs.

### **Authentication & Authorization**
- **OAuth 2.0 + OpenID Connect (OIDC)**:
  - Short-lived stateless JWT access tokens (15-min expiration) paired with HTTP-only, secure, SameSite refresh tokens stored in Redis.

### **Search Engine & Geo-spatial Queries**
- **Elasticsearch Cluster**:
  - Indexed by Geo-point (`lat`/`lng`), price range, amenities bitmask, and calendar availability.
  - Bounding box and radius queries for instant map exploration.

### **Caching Strategy (Redis)**
- **Multi-Level Caching**:
  1. **Edge Cache**: Static listing HTML & public photo assets (TTL: 1 hour).
  2. **L1 Application In-Memory Cache**: Node.js LRU cache for hot metadata.
  3. **L2 Distributed Cache**: Redis Enterprise Cluster for cached property listings and host profile details (TTL: 5 mins with cache invalidation on updates).
  4. **Distributed Locks**: Redis Redlock for preventing double-booking during concurrent reservation transactions.

### **Database & Data Storage Strategy**
- **Relational Storage (PostgreSQL)**: Primary database for user accounts, listings, and bookings (ACID compliance). Primary with multiple Multi-AZ Read Replicas.
- **NoSQL Document/Wide-Column Storage (DynamoDB / Cassandra)**: High-throughput write store for user reviews, host message history, and activity logs.
- **Object Storage (AWS S3 / Cloudflare R2)**: Immutable media storage for original and optimized listing photos.

### **Monitoring & Observability**
- **Datadog / Prometheus + Grafana**: Real-time metrics tracking Latency (p95, p99), Throughput (RPS), and Error Rates (5xx).
- **Sentry**: Frontend error boundary tracking and unhandled exception logging.

### **CI/CD Pipeline & Infrastructure as Code (IaC)**
- **Terraform / AWS CDK**: Infrastructure declared declaratively.
- **GitHub Actions**: Automated testing (`tsc`, `eslint`, `vitest`), Docker container builds, security container scanning (`Trivy`), and zero-downtime rolling deployment to Kubernetes (EKS).

### **Scaling & Resilience Strategy**
- **Horizontal Pod Autoscaling (HPA)**: Kubernetes pod scaling based on CPU/Memory and custom Prometheus metrics (Queue depth, incoming RPS).
- **Circuit Breakers (Resilience4j / Envoy)**: Prevents cascading failures across microservices when external dependencies or database replicas experience high latency.
