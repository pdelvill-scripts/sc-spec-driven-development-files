import { afterEach, describe, expect, it, vi } from "vitest";
import { Layout } from "./Layout";
import { Footer } from "./Footer";

describe("shared layout rendering", () => {
  it("keeps multiple page children inside the main region and outside the chrome", async () => {
    const markup = await (
      <Layout>
        <h1>Agent check-in</h1>
        <p>Your next break starts here.</p>
      </Layout>
    ).toString();

    const main = markup.match(/<main>([\s\S]*?)<\/main>/)?.[1];
    expect(main).toContain("<h1>Agent check-in</h1>");
    expect(main).toContain("<p>Your next break starts here.</p>");
    expect(main).not.toMatch(/<(?:header|footer)\b/);
    expect(markup.match(/Agent check-in/g)).toHaveLength(1);
    expect(markup.match(/Your next break starts here\./g)).toHaveLength(1);
  });

  it("escapes text children instead of treating them as executable HTML", async () => {
    const untrustedText = '<script>alert("prompt fatigue")</script> & rest';
    const markup = await (<Layout>{untrustedText}</Layout>).toString();

    expect(markup).not.toContain("<script>");
    expect(markup).toContain("&lt;script&gt;");
    expect(markup).toContain("&lt;/script&gt; &amp; rest");
  });

  it("can render an empty page without inserting undefined text", async () => {
    const markup = await (<Layout />).toString();
    expect(markup).toContain("<main></main>");
    expect(markup).not.toContain("undefined");
    expect(markup).not.toContain("[object Object]");
  });

  it("provides language, encoding, and viewport metadata for every page", async () => {
    const markup = await (<Layout><p>Metadata check</p></Layout>).toString();
    expect(markup).toContain('<html lang="en">');
    const head = markup.match(/<head>([\s\S]*?)<\/head>/)?.[1];
    expect(head).toContain('<meta charset="UTF-8"');
    expect(head).toContain('name="viewport" content="width=device-width, initial-scale=1.0"');
    expect(head).not.toMatch(/user-scalable\s*=\s*(?:no|0)|maximum-scale\s*=/i);
  });
});

describe("footer date handling", () => {
  afterEach(() => vi.useRealTimers());

  it.each([2030, 2031])("uses the current year %i instead of a fixed copyright year", async (year) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(year, 6, 1, 12));
    const markup = await (<Footer />).toString();
    expect(markup).toContain(`© ${year} AgentClinic`);
  });
});
