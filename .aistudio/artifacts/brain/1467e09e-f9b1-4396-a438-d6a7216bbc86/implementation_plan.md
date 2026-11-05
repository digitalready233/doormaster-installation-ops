# Implementation Plan: SMS & In-App Notifications, Workflow Approvals & OpenStreetMap Live Tracking

Architect and implement an end-to-end SMS & notification messaging pipeline, user phone profile setup, gateway configuration (Arkesel, Hubtel, Twilio), dual driver/installer acceptance/rejection flow with re-assignment, live geolocation capture, and OpenStreetMap motion tracking.

## User Review Required

> [!IMPORTANT]
> - **SMS Gateways**: Settings modal will support configuring **Arkesel**, **Hubtel**, and **Twilio** API credentials alongside a built-in interactive Ghana Telco SMS Simulator with live handset previews and chime alerts.
> - **Rejection Protocol**: When a driver or installer rejects a request, all 3 behaviors will execute: (1) returns job to Operations queue with reject badge, (2) triggers immediate re-assignment modal for the Operations Manager, and (3) logs the proposed alternate time slot / reason.
> - **OpenStreetMap Scope**: Continuous motion tracking along Accra road corridors scoped appropriately for Operations Manager (all fleet), Client (their dedicated delivery), and Shop Manager (requests originating from their branch).

---

## Detailed Step-by-Step Architecture

### 1. Data Models & SMS Configuration (`src/app/models/installation.model.ts`)
- **User Profile Phone & Settings**:
  - Extend role profiles (`UserProfile`, `InstallerProfile`, `DispatcherProfile`, `ShopManagerProfile`, `ClientProfile`) with verified phone numbers (`e.g. +233 24 555 0192`).
  - Add `SmsGatewayConfig` interface:
    - `provider`: `'arkesel' | 'hubtel' | 'twilio' | 'simulator'`
    - `apiKey`: string
    - `senderId`: string (default `'DoorMaster'`)
    - `apiSecret` / `clientId`: string
    - `enabled`: boolean
- **SMS Message Entity**:
  - `SmsLogEntry`: `id`, `recipientPhone`, `recipientRole`, `recipientName`, `senderId`, `messageText`, `triggerEvent`, `status` (`'delivered' | 'sent' | 'failed'`), `timestamp`, `providerRef`.
- **Assignment Acceptance/Rejection Statuses**:
  - `driverAssignmentStatus`: `'pending' | 'accepted' | 'rejected'`
  - `driverRejectReason`?: string
  - `driverProposedSlot`?: string
  - `installerAssignmentStatus`: `'pending' | 'accepted' | 'rejected'`
  - `installerRejectReason`?: string
  - `installerProposedSlot`?: string
  - `operationsApproved`: boolean
  - `installerWorkLocation`?: `{ startLat?: number; startLng?: number; startTimestamp?: string; completeLat?: number; completeLng?: number; completeTimestamp?: string }`

### 2. State & Messaging Service (`src/app/services/installation.store.ts`)
- **SMS Dispatch Engine**:
  - Centralized `sendSmsAndNotification(event, payload)` method formatting tailored message layouts:
    - **Booking Created**: Sent to Shop Attendant & Client (order ref, door model, smart lock handle, counter deposit, address).
    - **Dispatch Driver Assigned**: Sent to Driver phone with cargo manifest, pickup warehouse, client site.
    - **Driver Accepted/Rejected**: Sent to Operations Manager (with reason & alternate proposal).
    - **Installer Assigned**: Sent to Installer phone with lock model, dimensions, scheduled slot.
    - **Installer Accepted/Rejected**: Sent to Operations Manager.
    - **Operations Manager Approval**: Triggered once both accept; sends SMS to Shop Attendant as Approved.
    - **Live Trip Started**: Sent to Shop Attendant & Client with live ETA link.
    - **Delivered on Site**: Sent to Operations Manager, Shop Attendant, and Client.
    - **Installer Started Work**: Captures GPS geolocation coordinates and sends notification to Operations Manager.
    - **Installer Completed Work**: Captures GPS geolocation, completion certificate, and notifies Operations Manager.
- **SMS Gateway Settings Store**:
  - Persistent state in localStorage for gateway selection (Hubtel, Arkesel, Twilio) and credentials.
- **SMS Simulation Drawer & Message History**:
  - Signal holding live sent SMS messages with virtual phone preview overlay.

### 3. OpenStreetMap Component (`src/app/components/osm-live-map/osm-live-map.ts`)
- Leaflet integration with dynamic Light/Dark OSM tiles (CartoDB Positron & Dark Matter).
- Live continuous coordinate interpolation along Accra road network (Spintex Atelier, Cantonments, Airport Residential, East Legon).
- Filtered rendering by mode:
  - `mode: 'all-fleet'`: Operations Manager view.
  - `mode: 'client-single'`: Client live view.
  - `mode: 'shop-scoped'`: Filtered to jobs originating from active shop branch.

### 4. User Profile & Gateway Settings Modal (`src/app/components/profile-sms-settings-modal/`)
- User profile setup to update phone numbers for all personas.
- SMS Gateway Configuration tab for selecting **Arkesel**, **Hubtel**, or **Twilio** with API test ping.

### 5. UI Portal Updates
- **Shop Portal (`src/app/views/shop-portal/shop-portal.ts`)**:
  - Booking form triggers SMS to Shop Attendant and Client.
  - Scoped OSM map tracking orders from their shop.
  - Real-time approval badge once Operations Manager approves dual acceptance.
- **Operations Overview (`src/app/views/overview/overview.ts`)**:
  - Shows "Pending Driver/Installer Acceptance" queue.
  - Rejection handler with immediate re-assignment modal and display of reason/alternate slot.
  - "Approve Request" button enabled once both driver and installer accept.
  - OSM full city radar map.
- **Dispatcher Portal (`src/app/views/dispatcher-portal/dispatcher-portal.ts`)**:
  - Accept or Reject modal with structured reasons and alternate time proposal.
  - "Start Live Trip" button broadcasting motion and SMS alerts.
  - "Mark Delivered on Site" button triggering multi-party notifications.
- **Installer Portal (`src/app/views/installer-portal/installer-portal.ts`)**:
  - Accept or Reject modal with reasons and alternative slot.
  - "Start Work" button capturing device geolocation (`navigator.geolocation`) and notifying Operations Manager.
  - "Complete Installation" button capturing finished geolocation and photos.
- **Client Portal (`src/app/views/client-portal/client-portal.ts`)**:
  - Live OSM tracking with truck and installer positions.
  - SMS notification logs received by the client.

---

## Verification Plan

### Automated Verification
- Run `compile_applet` to verify strict TypeScript compilation.
- Run `lint_applet` to ensure zero ESLint errors and full a11y compliance.

### End-to-End Workflow Verification
1. **Profile Setup**: Change user phone numbers in profile settings; verify they persist.
2. **Booking & Initial SMS**: Book an installation from Shop Manager Desk -> verify SMS generated for Shop Attendant and Client with formatted message layout.
3. **Dispatch Driver Flow**: Switch to Dispatcher -> inspect assigned run -> test **Reject with Reason** (confirm alert to Operations Manager, job returned to queue, re-assignment prompt) -> re-assign and **Accept**.
4. **Installer Flow**: Switch to Installer -> test **Accept** assignment.
5. **Operations Approval Gate**: Once both accepted, confirm Operations Manager can click **Approve Request**, sending SMS to Shop Attendant.
6. **Live Movement & OSM Map**: Click "Start Live Trip" -> verify OSM map vehicle starts continuous motion and SMS sent to Client and Shop Attendant.
7. **Delivery**: Driver marks "Delivered" -> verify SMS sent to Operations Manager, Shop Attendant, and Client.
8. **Geolocation Capture on Site**: Installer clicks "Start Work" -> verify GPS coordinates captured and notification sent to Operations Manager -> click "Complete Work" -> verify completed geolocation archived.
