# VE One Core Architecture

## Isolation hierarchy

`Tenant -> Company -> Branch -> Department -> Warehouse -> User`

- `tenant_id` is the non-negotiable SaaS isolation key.
- `company_id` separates legal entities and their accounting books.
- `branch_id` scopes operations, phone systems, employees and warehouses.
- Warehouses and all future business records inherit the same three keys.

## Offline-first contract

1. The UI writes an optimistic local copy.
2. Mutations are added to IndexedDB `sync_queue` with tenant/company/branch scope.
3. Online clients submit pending mutations through authenticated server endpoints.
4. The server validates membership, permissions and record version.
5. Accepted mutations receive the server version and audit metadata.
6. Conflicts never silently overwrite financial or inventory data; they require a resolution flow.

Offline support will be enabled by risk class:

- Safe offline: CRM notes, draft tasks, draft meeting notes and field data capture.
- Controlled offline: draft quotations, stock counts and proof-of-delivery capture.
- Online approval required: posting invoices, payments, stock transfers, ownership changes and deletions.

## Module order

1. Core SaaS identity, branches, roles, permissions and audit.
2. CRM and Client 360, including Grandstream UCM6300 integration contract.
3. Inventory, multi-warehouse transfers, serial tracking and stock aging.
4. Warranty, service, RMA, demo/prototype/vendor-owned assets.
5. Purchasing, landed costs and supplier settlement.
6. Finance and accounting.
7. Tenders, projects, logistics and delivery.
8. HR, expenses, travel, tasks and approvals.
9. Document AI, meeting intelligence and executive reporting.

## Rules that must not be lost

- Warranty Check supports serial number, IMEI, barcode and QR.
- Warehouse transfers use request, approval, dispatch, in-transit and receipt states.
- Demo, prototype, consignment, loan and vendor-owned stock never mix with normal sellable stock.
- Stock aging and receivable aging feed the cash-conversion dashboard.
- Grandstream PBX connections are configured per tenant/branch; credentials remain server-side.
- Every material action is auditable and tenant-scoped.
