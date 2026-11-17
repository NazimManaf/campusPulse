# CampusPulse – Intelligent Campus Issue & Resource Management

## 1. Abstract
CampusPulse is a full-stack web application that improves campus operations by connecting students, facilities staff and administrators through a shared issue and resource platform. Students submit structured reports with location, category and estimated impact. Staff update issue lifecycles, while administrators monitor aggregate trends. MongoDB provides flexible document storage; Express and Node.js expose REST services; Socket.IO distributes live updates; React provides the student portal and Angular provides the operations console.

## 2. Problem Statement
Campus problems are often reported through fragmented channels such as verbal requests, messaging groups or paper registers. This makes ownership, prioritisation and progress visibility difficult. CampusPulse centralises reports, makes status visible and uses impact-aware prioritisation to help staff identify issues affecting larger groups.

## 3. Objectives
- Apply NoSQL document modelling with MongoDB collections and indexes.
- Build secure user registration/login and role-based access control.
- Implement Express routes and request/response handling.
- Build component-based interfaces using React and Angular with TypeScript.
- Demonstrate real-time client-server communication using Socket.IO.
- Track resources and produce operational summaries.

## 4. Technology Stack
| Layer | Technology | Purpose |
|---|---|---|
| Database | MongoDB 7, Mongoose | Flexible documents, collections, indexes |
| Runtime/API | Node.js, Express | REST API and middleware |
| Authentication | bcryptjs, JWT | Password hashing and stateless identity |
| Real-time | Socket.IO | Live issue events |
| Student UI | React 18, Vite | Reporting and tracking |
| Operations UI | Angular 18, TypeScript | Staff/admin dashboard |
| Environment | Docker Compose | Reproducible MongoDB setup |

## 5. System Architecture
The React client and Angular console communicate with an Express API over HTTP. JWT middleware authenticates requests and role middleware restricts privileged operations. Express uses Mongoose models to read/write MongoDB. When an issue is created or updated, the API emits a Socket.IO event to connected clients. The design separates presentation, business/API logic and persistence.

## 6. MongoDB Data Design
**users** stores name, email, password hash, role and department. **issues** stores title, description, category, nested location, priority, status, affected count, reporter, assignee and update history. **resources** stores campus rooms, labs, equipment and availability. The issue schema uses nested location and embedded update documents to demonstrate flexible document structures. Indexes on status/priority/creation time and building/category support common operational queries. Email is unique in the user collection.

## 7. Functional Modules
1. **Identity and access:** student registration, login, bcrypt password hashing, JWT validation, student/staff/admin roles.
2. **Issue reporting:** validated title, description, category, building, room and affected-person count.
3. **Impact prioritisation:** a transparent rule assigns critical for 100+ affected, high for 25+, medium for 5+, otherwise low. This is a demo heuristic, not an AI prediction.
4. **Issue lifecycle:** open → acknowledged → in progress → resolved/rejected. Staff/admin can update status and append an activity note.
5. **Resource directory:** list facilities and availability; staff/admin can add or update records.
6. **Analytics:** total, active and resolved counts plus category/status aggregates.
7. **Live updates:** Socket.IO broadcasts issue creation and status changes.

## 8. API Design
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Create student account |
| POST | /api/auth/login | Public | Authenticate and issue JWT |
| GET | /api/auth/me | Authenticated | Current user profile |
| GET | /api/issues | Authenticated | List visible reports |
| POST | /api/issues | Authenticated | Submit report |
| PATCH | /api/issues/:id/status | Staff/Admin | Change issue status |
| GET | /api/resources | Authenticated | List resources |
| POST | /api/resources | Staff/Admin | Add resource |
| PATCH | /api/resources/:id | Staff/Admin | Update resource |
| GET | /api/analytics/summary | Staff/Admin | Operational metrics |

## 9. Security and Access Control
Passwords are never stored in plaintext; bcrypt hashes are stored in MongoDB. JWTs are signed with a configurable secret and expire after eight hours. Authentication middleware resolves the account for each protected request. Role middleware restricts issue status changes, resource management and analytics to staff/admin. Express request validation checks core issue fields and limits text lengths. Production deployment should additionally use HTTPS, rate limiting, refresh-token rotation, audit logging, stronger schema validation, secure secret storage and monitoring.

## 10. Setup and Execution
1. Install Node.js 20+ and Docker.
2. Copy `server/.env.example` to `server/.env`; set a unique JWT secret.
3. Run `docker compose up -d` from the root.
4. In `server`, run `npm install`, `npm run seed`, then `npm run dev`.
5. In `client-react`, run `npm install` and `npm run dev`.
6. For the Angular console, in `admin-angular` run `npm install` then `npm start`. Open its local URL and sign in using the staff or admin demo account; the Angular console has its own login flow and stores its JWT on that origin.

Demo accounts (all use `CampusPulse@123`): student@campuspulse.demo, staff@campuspulse.demo, admin@campuspulse.demo. These are local-only credentials and must be changed before deployment.

## 11. Testing Plan
- Verify `/api/health` returns status `ok`.
- Register a student and confirm duplicate email is rejected.
- Log in and verify an access token is returned.
- Submit an issue with valid and invalid fields; verify validation behaviour.
- Confirm student sees their own reports and staff/admin can see the queue.
- Confirm student cannot change issue status (403) and staff can.
- Change a status and verify the React issue list updates through Socket.IO.
- Add a resource as staff and verify it appears in the student portal.
- Verify analytics are denied to students and available to staff/admin.

## 12. Syllabus Mapping
**Module 3 – MongoDB:** NoSQL document model, MongoDB environment through Docker, collections represented by User/Issue/Resource models, account records, role-based access control, Mongoose connection from Node.js, flexible nested/embedded schemas and indexes.

**Module 4 – Express and Angular:** Express middleware, modular routes, request body/query/params, JSON responses and status codes; Angular standalone components, TypeScript services, dependency injection, HTTP data binding and component templates.

**Module 5 – React:** MERN-style architecture (MongoDB, Express, React, Node), React functional components, hooks/state, REST API integration, modularized source, Vite build tooling and Git-ready project structure. Angular is included as a separate operations client to satisfy the Module 4 outcomes.

## 13. Limitations and Future Enhancements
The current priority rule is heuristic; QR values are stored but a QR scanning workflow is not yet wired into the UI; demo accounts are seeded for local evaluation; Socket.IO broadcasts events globally rather than to authenticated campus/role rooms. Future versions can add QR scanning, image attachments, map visualisation, assignment workflows, email/push alerts, per-building access policies, audit trails, SLA timers, advanced analytics and deployment to a managed cloud database.

## 14. Conclusion
CampusPulse demonstrates a coherent full-stack application rather than isolated technology examples. It integrates MongoDB, Node.js, Express, Angular and React into a practical campus operations workflow with authentication, access control, REST APIs, document modelling, analytics and real-time events.
