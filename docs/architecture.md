# QuickNotes System Architecture

## 1. System Requirements

### Functional Requirements
* Users can create, read, update, and delete (CRUD) text notes.
* Users can assign multiple tags to notes and filter notes by tags.
* Users can search note titles and bodies using keywords.
* The system supports pagination or lazy loading for users with many notes.

### Non-Functional Requirements
* **High Availability:** The system should target 99.9% uptime.
* **Low Latency:** API responses for reading notes must occur in under 200ms.
* **Security:** All traffic must be encrypted via HTTPS; APIs must be protected by JWT-based authentication.
* **Scalability:** The architecture must support a growing user base without requiring complete rewrites.

## 2. Capacity Estimates
Assuming a target of 10,000 Daily Active Users (DAU):
* **Traffic:** 10,000 DAU × 20 requests/day = 200,000 requests per day (~2.3 requests per second).
* **Storage:** 10,000 DAU × 5 new notes/day × 1KB per note = 50MB of new text data per day (approx. 18GB per year).
* **Bandwidth:** 200,000 requests × 2KB average response = 400MB per day egress.

## 3. Architecture Diagram

```mermaid
graph TD
    Client[Web Browser / Frontend] -->|HTTPS / JSON| CDN[CDN / Load Balancer]
    CDN --> API1[API Server 1]
    CDN --> API2[API Server 2]
    
    API1 --> DB[(Primary SQL Database)]
    API2 --> DB
    
    DB -.->|Replication| DBReplica[(Read Replica)]
    API1 -.->|Read Queries| DBReplica
    API2 -.->|Read Queries| DBReplica