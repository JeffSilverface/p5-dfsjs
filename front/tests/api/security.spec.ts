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

  test("GET /posts returns 401", async ({ request }) => {
    const res = await request.get(`${API}/posts`);
    expect(res.status()).toBe(401);
  });

  test("GET /posts/:id returns 401", async ({ request }) => {
    const res = await request.get(`${API}/posts/some-id`);
    expect(res.status()).toBe(401);
  });

  test("POST /posts returns 401", async ({ request }) => {
    const res = await request.post(`${API}/posts`, {
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

  test("GET /posts/:id/comments returns 401", async ({ request }) => {
    const res = await request.get(`${API}/posts/some-id/comments`);
    expect(res.status()).toBe(401);
  });

  test("POST /posts/:id/comments returns 401", async ({ request }) => {
    const res = await request.post(`${API}/posts/some-id/comments`, {
      data: { content: "test comment" },
    });
    expect(res.status()).toBe(401);
  });
});
