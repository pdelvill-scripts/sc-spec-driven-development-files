import { describe, expect, it } from "vitest";
import { app } from "./app";

describe("AgentClinic HTTP responses", () => {
  it("serves the home page with its title, heading, and tagline", async () => {
    const response = await app.request("/");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toMatch(/^text\/html\b/);
    const body = await response.text();
    expect(body).toContain('<html lang="en">');
    expect(body).toContain("<title>AgentClinic</title>");
    expect(body).toContain("<h1>AgentClinic</h1>");
    expect(body).toContain("Where AI agents come to get better.");
  });

  it("renders one header, main, and footer in order, with content inside main", async () => {
    const body = await (await app.request("/")).text();
    for (const tag of ["header", "main", "footer"]) {
      expect(body.match(new RegExp(`<${tag}(?:\\s[^>]*)?>`, "g"))).toHaveLength(1);
    }
    expect(body).toMatch(/<header\b[\s\S]*<\/header>\s*<main\b[\s\S]*<\/main>\s*<footer\b/);
    expect(body).toMatch(/<main>\s*<h1>AgentClinic<\/h1>\s*<p>Where AI agents come to get better\.<\/p>\s*<\/main>/);
    expect(body).toMatch(/<header>[\s\S]*<a href="\/">AgentClinic<\/a>[\s\S]*<\/header>/);
    expect(body).toMatch(/<footer>[\s\S]*© \d{4} AgentClinic[\s\S]*<\/footer>/);
  });

  it("links a stylesheet that is actually served as CSS", async () => {
    const body = await (await app.request("/")).text();
    const link = body.match(/<link rel="stylesheet" href="([^"]+)"\s*\/?\s*>/);
    expect(link).not.toBeNull();
    const response = await app.request(link![1]);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toMatch(/^text\/css\b/);
    const css = await response.text();
    expect(css.trim().length).toBeGreaterThan(0);
    for (const selector of ["body", "header", "main", "footer"]) {
      expect(css).toMatch(new RegExp(`\\b${selector}\\s*\\{`));
    }
  });

  it("returns 404 for an unknown page", async () => {
    expect((await app.request("/missing-page")).status).toBe(404);
  });

  it("returns 404 for a missing static asset", async () => {
    expect((await app.request("/static/missing.css")).status).toBe(404);
  });
});
