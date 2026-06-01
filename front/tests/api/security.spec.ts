import { test, expect } from "@playwright/test";

const API = "http://localhost:3001";

test.describe("API security — unauthenticated requests", () => {
  test("GET /auth/me returns 401", async ({ request }) => {
    const res = await request.get(`${API}/auth/me`);
    expect(res.status()).toBe(401);
  });

  test("PATCH /auth/profile returns 401", async ({ request }) => {
    const res = await request.patch(`${API}/auth/profile`, {
      data: { username: "hacker" },
    });
    expect(res.status()).toBe(401);
  });

  test("GET /articles returns 401", async ({ request }) => {
    const res = await request.get(`${API}/articles`);
    expect(res.status()).toBe(401);
  });

  test("GET /articles/:id returns 401", async ({ request }) => {
    const res = await request.get(`${API}/articles/some-id`);
    expect(res.status()).toBe(401);
  });

  test("POST /articles returns 401", async ({ request }) => {
    const res = await request.post(`${API}/articles`, {
      data: { title: "test", content: "test content here", topicId: "uuid" },
    });
    expect(res.status()).toBe(401);
  });

  test("GET /topics returns 401", async ({ request }) => {
    const res = await request.get(`${API}/topics`);
    expect(res.status()).toBe(401);
  });

  test("POST /topics/:id/subscribe returns 401", async ({ request }) => {
    const res = await request.post(`${API}/topics/some-id/subscribe`);
    expect(res.status()).toBe(401);
  });

  test("DELETE /topics/:id/subscribe returns 401", async ({ request }) => {
    const res = await request.delete(`${API}/topics/some-id/subscribe`);
    expect(res.status()).toBe(401);
  });

  test("GET /articles/:id/comments returns 401", async ({ request }) => {
    const res = await request.get(`${API}/articles/some-id/comments`);
    expect(res.status()).toBe(401);
  });

  test("POST /articles/:id/comments returns 401", async ({ request }) => {
    const res = await request.post(`${API}/articles/some-id/comments`, {
      data: { content: "test comment" },
    });
    expect(res.status()).toBe(401);
  });
});
