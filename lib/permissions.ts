export const PERMISSIONS = {
  // Content
  "products:read":     "View Products",
  "products:write":    "Create / Edit Products",
  "products:publish":  "Publish Products",
  "products:delete":   "Delete Products",

  "services:read":     "View Services",
  "services:write":    "Create / Edit Services",
  "services:publish":  "Publish Services",
  "services:delete":   "Delete Services",

  "solutions:read":    "View Solutions",
  "solutions:write":   "Create / Edit Solutions",
  "solutions:publish": "Publish Solutions",
  "solutions:delete":  "Delete Solutions",

  "news:read":         "View News / Articles",
  "news:write":        "Sync / Edit Articles",
  "news:publish":      "Publish Articles",

  // People
  "leadership:read":   "View Leadership",
  "leadership:write":  "Create / Edit Leadership",
  "leadership:delete": "Delete Leadership",

  "partners:read":     "View Partners",
  "partners:write":    "Create / Edit Partners",
  "partners:delete":   "Delete Partners",

  // Careers
  "jobs:read":              "View Job Listings",
  "jobs:write":             "Create / Edit Jobs",
  "jobs:delete":            "Delete Jobs",
  "applications:read":      "View Applications",
  "applications:write":     "Update Application Status",

  // CRM
  "pipeline:read":     "View Client Pipeline",
  "pipeline:write":    "Create / Edit Clients",
  "pipeline:delete":   "Delete Clients",

  // Inbox
  "contact:read":      "View Contact Submissions",
  "contact:write":     "Update Contact Status",

  // System
  "settings:read":     "View Settings",
  "settings:write":    "Edit Settings",
  "users:read":        "View Users",
  "users:write":       "Create / Edit Users",
  "users:delete":      "Deactivate Users",
  "roles:read":        "View Roles",
  "roles:write":       "Create / Edit Roles",
  "approvals:review":  "Approve / Reject Content",
} as const;

export type Permission = keyof typeof PERMISSIONS;

export const PERMISSION_GROUPS: { label: string; keys: Permission[] }[] = [
  {
    label: "Content",
    keys: [
      "products:read", "products:write", "products:publish", "products:delete",
      "services:read", "services:write", "services:publish", "services:delete",
      "solutions:read", "solutions:write", "solutions:publish", "solutions:delete",
      "news:read", "news:write", "news:publish",
    ],
  },
  {
    label: "People",
    keys: [
      "leadership:read", "leadership:write", "leadership:delete",
      "partners:read", "partners:write", "partners:delete",
    ],
  },
  {
    label: "Careers",
    keys: [
      "jobs:read", "jobs:write", "jobs:delete",
      "applications:read", "applications:write",
    ],
  },
  {
    label: "CRM",
    keys: ["pipeline:read", "pipeline:write", "pipeline:delete"],
  },
  {
    label: "Inbox",
    keys: ["contact:read", "contact:write"],
  },
  {
    label: "System",
    keys: [
      "settings:read", "settings:write",
      "users:read", "users:write", "users:delete",
      "roles:read", "roles:write",
      "approvals:review",
    ],
  },
];

// All permissions set to true — used for super_admin seed
export const ALL_PERMISSIONS: Record<string, boolean> = Object.fromEntries(
  Object.keys(PERMISSIONS).map((k) => [k, true])
);
