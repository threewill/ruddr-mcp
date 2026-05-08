import { describe, expect, it } from "vitest";
import { callTool, parseToolJson } from "../helpers/mcp.js";

const hasKey = Boolean(process.env.RUDDR_API_KEY);
const runWrites = process.env.RUDDR_RUN_WRITE_TESTS === "1";

describe.skipIf(!hasKey || !runWrites)("integration time entry writes", () => {
  it("can create → update → delete a small project_time entry", async () => {
    // Safety: require an explicit opt-in flag to run at all.
    expect(runWrites).toBe(true);

    // Enable the write gate for this test run.
    process.env.RUDDR_ALLOW_WRITES = "time_entries";

    const projects = parseToolJson(
      await callTool("ruddr_list_projects", { limit: 10 })
    ).results as Array<any>;
    expect(Array.isArray(projects)).toBe(true);
    const project = projects?.[0];
    expect(project?.id).toBeTypeOf("string");

    const members = parseToolJson(
      await callTool("ruddr_list_workspace_members", { limit: 10 })
    ).results as Array<any>;
    expect(Array.isArray(members)).toBe(true);
    const member = members?.[0];
    expect(member?.id).toBeTypeOf("string");

    let roleId: string | undefined;
    try {
      const projectMembers = parseToolJson(
        await callTool("ruddr_list_project_members", { projectId: project.id, limit: 50 })
      ).results as Array<any>;
      const match = projectMembers?.find((pm) => pm?.memberId === member.id) ?? projectMembers?.[0];
      if (match?.roleId) roleId = match.roleId;
    } catch {
      // If the workspace lacks permission for project members, proceed without roleId.
    }

    const to = new Date();
    const date = `${to.getFullYear()}-${String(to.getMonth() + 1).padStart(2, "0")}-${String(
      to.getDate()
    ).padStart(2, "0")}`;

    const created = parseToolJson(
      await callTool("ruddr_create_time_entry", {
        typeId: "project_time",
        date,
        memberId: member.id,
        projectId: project.id,
        roleId,
        minutes: 1,
        notes: "ruddr-mcp integration test (create)",
      })
    );
    expect(created?.id).toBeTypeOf("string");

    const updated = parseToolJson(
      await callTool("ruddr_update_time_entry", {
        id: created.id,
        notes: "ruddr-mcp integration test (update)",
      })
    );
    expect(updated?.id).toBe(created.id);

    const deleted = parseToolJson(
      await callTool("ruddr_delete_time_entry", { id: created.id })
    );
    expect(deleted).toEqual({ deleted: true, id: created.id });
  });
});

