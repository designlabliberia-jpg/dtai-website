import fs from "fs";

const content = `interface ReportRow {
  site: string;
  parameter: string;
  value: string;
  limit: string;
  status: "Compliant" | "Exceedance";
}

const FINDINGS: ReportRow[] = [
  { site: "Site A — Intake Point", parameter: "Turbidity (NTU)", value: "4.2", limit: "5.0", status: "Compliant" },
  { site: "Site B — Discharge Point", parameter: "pH Level", value: "8.9", limit: "8.5", status: "Exceedance" },
  { site: "Site C — Buffer Zone", parameter: "Dissolved Oxygen (mg/L)", value: "6.1", limit: "5.0", status: "Compliant" },
  { site: "Site B — Discharge Point", parameter: "Total Suspended Solids", value: "38", limit: "30", status: "Exceedance" },
];

export function ReportMockup() {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-300/60 bg-white shadow-sm">
      {/* Letterhead */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-6 py-4">
        <div>
          <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-500">
            DTAI Environmental Advisory
          </span>
          <h3 className="font-primary text-sm font-semibold text-neutral-900">
            Site Assessment &amp; Compliance Findings
          </h3>
        </div>
        <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-400">
          Representative Sample
        </span>
      </div>

      {/* Findings table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-[11px] uppercase tracking-wide text-neutral-500">
              <th className="px-6 py-3 font-technical font-medium">Site</th>
              <th className="px-4 py-3 font-technical font-medium">Parameter</th>
              <th className="px-4 py-3 font-technical font-medium">Value</th>
              <th className="px-4 py-3 font-technical font-medium">Limit</th>
              <th className="px-6 py-3 font-technical font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {FINDINGS.map((row, i) => (
              <tr key={i} className="border-b border-neutral-100 last:border-0">
                <td className="px-6 py-3 text-neutral-700">{row.site}</td>
                <td className="px-4 py-3 text-neutral-700">{row.parameter}</td>
                <td className="px-4 py-3 font-technical text-neutral-900">{row.value}</td>
                <td className="px-4 py-3 font-technical text-neutral-500">{row.limit}</td>
                <td className="px-6 py-3">
                  <span
                    className={\`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium \${
                      row.status === "Compliant"
                        ? "bg-tech-blue/10 text-tech-blue"
                        : "bg-[#E0B84B]/15 text-[#8a6a1f]"
                    }\`}
                  >
                    <span
                      className={\`h-1.5 w-1.5 rounded-full \${
                        row.status === "Compliant" ? "bg-tech-blue" : "bg-[#E0B84B]"
                      }\`}
                    />
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-6 py-3">
        <span className="font-technical text-[10px] text-neutral-500">
          Illustrative sample — actual reports are site- and standard-specific.
        </span>
        <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-400">
          Prepared by DTAI
        </span>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("components/enterprise/ReportMockup.tsx", content);
console.log("Created components/enterprise/ReportMockup.tsx");
