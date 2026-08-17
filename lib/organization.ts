export type Branch = {
  id: string;
  name: string;
  code: string;
  city: string;
  countryCode: string;
  isHeadOffice: boolean;
  status: "active" | "planned";
  warehouses: number;
};

export type Company = {
  id: string;
  name: string;
  legalName: string;
  code: string;
  countryCode: string;
  currency: string;
  timezone: string;
  status: "active" | "planned";
  branches: Branch[];
};

export const organizationCompanies: Company[] = [
  {
    id: "ve-iq",
    name: "View Enterprise KRG Iraq",
    legalName: "View Enterprise Company",
    code: "VE-IQ",
    countryCode: "IQ",
    currency: "IQD / USD",
    timezone: "Asia/Baghdad",
    status: "active",
    branches: [
      { id: "erbil", name: "Erbil HQ", code: "EBL", city: "Erbil", countryCode: "IQ", isHeadOffice: true, status: "active", warehouses: 1 },
      { id: "baghdad", name: "Baghdad", code: "BGW", city: "Baghdad", countryCode: "IQ", isHeadOffice: false, status: "active", warehouses: 0 },
      { id: "basra", name: "Basra", code: "BSR", city: "Basra", countryCode: "IQ", isHeadOffice: false, status: "planned", warehouses: 0 },
      { id: "sulaymaniyah", name: "Sulaymaniyah", code: "ISU", city: "Sulaymaniyah", countryCode: "IQ", isHeadOffice: false, status: "planned", warehouses: 0 },
      { id: "zakho", name: "Zakho", code: "ZAX", city: "Zakho", countryCode: "IQ", isHeadOffice: false, status: "planned", warehouses: 0 },
      { id: "kirkuk", name: "Kirkuk", code: "KIK", city: "Kirkuk", countryCode: "IQ", isHeadOffice: false, status: "planned", warehouses: 0 },
    ],
  },
];

export const roles = [
  { name: "Owner", scope: "All companies", level: "Full access", color: "cyan" },
  { name: "Company Admin", scope: "Assigned company", level: "Administrative", color: "blue" },
  { name: "Branch Manager", scope: "Assigned branches", level: "Operational", color: "violet" },
  { name: "Finance Manager", scope: "Finance & approvals", level: "Restricted", color: "emerald" },
  { name: "Sales", scope: "CRM & quotations", level: "Functional", color: "amber" },
  { name: "Warehouse", scope: "Inventory locations", level: "Functional", color: "slate" },
];
