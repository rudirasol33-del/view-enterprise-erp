const DATABASE_NAME = "ve-one-offline";
const DATABASE_VERSION = 1;
const SYNC_QUEUE_STORE = "sync_queue";

export type SyncOperation = "create" | "update" | "delete";

export type SyncQueueItem<TPayload = unknown> = {
  id: string;
  tenantId: string;
  companyId: string;
  branchId?: string;
  entity: string;
  entityId: string;
  operation: SyncOperation;
  payload: TPayload;
  clientUpdatedAt: string;
  attempts: number;
  status: "pending" | "syncing" | "failed";
};

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(SYNC_QUEUE_STORE)) {
        const store = database.createObjectStore(SYNC_QUEUE_STORE, {
          keyPath: "id",
        });
        store.createIndex("tenantId", "tenantId");
        store.createIndex("status", "status");
        store.createIndex("clientUpdatedAt", "clientUpdatedAt");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function queueOfflineChange<TPayload>(
  item: Omit<SyncQueueItem<TPayload>, "attempts" | "status">,
) {
  const database = await openDatabase();

  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(SYNC_QUEUE_STORE, "readwrite");
    transaction.objectStore(SYNC_QUEUE_STORE).put({
      ...item,
      attempts: 0,
      status: "pending",
    });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getPendingChanges(): Promise<SyncQueueItem[]> {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(SYNC_QUEUE_STORE, "readonly");
    const request = transaction
      .objectStore(SYNC_QUEUE_STORE)
      .index("status")
      .getAll("pending");

    request.onsuccess = () => resolve(request.result as SyncQueueItem[]);
    request.onerror = () => reject(request.error);
  });
}
