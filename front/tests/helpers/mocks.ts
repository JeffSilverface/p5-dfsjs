import type { BrowserContext, Page, Route } from "@playwright/test";

const API = "http://localhost:3001";
export const MOCK_TOPIC_REACT_ID = "11111111-1111-4111-8111-111111111111";
export const MOCK_TOPIC_NEST_ID = "22222222-2222-4222-8222-222222222222";

export type MockTopic = {
  id: string;
  name: string;
  description: string;
  isSubscribed: boolean;
  _count: { subscribers: number };
};

export type MockPost = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  topicId: string;
  createdAt: string;
  updatedAt: string;
  author: { id: string; username: string };
  topic: { id: string; name: string };
  _count: { comments: number };
};

type MockApiState = {
  sessionUser: {
    id: string;
    email: string;
    username: string;
  };
  topics: MockTopic[];
  posts: MockPost[];
};

const defaultState: MockApiState = {
  sessionUser: {
    id: "user-mock-1",
    email: "mock@test.com",
    username: "mockuser",
  },
  topics: [
    {
      id: MOCK_TOPIC_REACT_ID,
      name: "React",
      description: "Actualités, patterns et retours d'expérience React.",
      isSubscribed: false,
      _count: { subscribers: 3 },
    },
    {
      id: MOCK_TOPIC_NEST_ID,
      name: "NestJS",
      description: "Architecture backend et API avec NestJS.",
      isSubscribed: true,
      _count: { subscribers: 8 },
    },
  ],
  posts: [
    {
      id: "post-newest",
      title: "Article mocké récent",
      content: "Contenu mocké suffisamment long pour être affiché dans la liste.",
      authorId: "user-mock-1",
      topicId: MOCK_TOPIC_REACT_ID,
      createdAt: "2026-05-23T10:00:00.000Z",
      updatedAt: "2026-05-23T10:00:00.000Z",
      author: { id: "user-mock-1", username: "mockuser" },
      topic: { id: MOCK_TOPIC_REACT_ID, name: "React" },
      _count: { comments: 2 },
    },
    {
      id: "post-oldest",
      title: "Article mocké ancien",
      content: "Un deuxième contenu mocké pour vérifier l'ordre d'affichage.",
      authorId: "user-mock-1",
      topicId: MOCK_TOPIC_NEST_ID,
      createdAt: "2026-05-20T10:00:00.000Z",
      updatedAt: "2026-05-20T10:00:00.000Z",
      author: { id: "user-mock-1", username: "mockuser" },
      topic: { id: MOCK_TOPIC_NEST_ID, name: "NestJS" },
      _count: { comments: 0 },
    },
  ],
};

function cloneState(overrides: Partial<MockApiState> = {}): MockApiState {
  return {
    sessionUser: { ...defaultState.sessionUser, ...overrides.sessionUser },
    topics: structuredClone(overrides.topics ?? defaultState.topics),
    posts: structuredClone(overrides.posts ?? defaultState.posts),
  };
}

async function fulfillJson(route: Route, status: number, body?: unknown) {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: body === undefined ? "" : JSON.stringify(body),
  });
}

export async function mockAuthenticatedApi(
  page: Page,
  context: BrowserContext,
  overrides: Partial<MockApiState> = {},
) {
  const state = cloneState(overrides);

  await context.addCookies([
    {
      name: "connect.sid",
      value: "mock-session",
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);

  await page.route(`${API}/**`, async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();

    if (method === "GET" && url.pathname === "/auth/me") {
      await fulfillJson(route, 200, state.sessionUser);
      return;
    }

    if (method === "PATCH" && url.pathname === "/auth/profile") {
      const payload = request.postDataJSON() as Partial<
        typeof state.sessionUser
      >;
      state.sessionUser = { ...state.sessionUser, ...payload };
      await fulfillJson(route, 200, state.sessionUser);
      return;
    }

    if (method === "GET" && url.pathname === "/topics") {
      await fulfillJson(route, 200, state.topics);
      return;
    }

    const subscribeMatch = url.pathname.match(/^\/topics\/([^/]+)\/subscribe$/);
    if (subscribeMatch) {
      const topic = state.topics.find((item) => item.id === subscribeMatch[1]);

      if (!topic) {
        await fulfillJson(route, 404, { message: "Topic not found" });
        return;
      }

      if (method === "POST") {
        if (!topic.isSubscribed) {
          topic.isSubscribed = true;
          topic._count.subscribers += 1;
        }
        await fulfillJson(route, 200, topic);
        return;
      }

      if (method === "DELETE") {
        if (topic.isSubscribed) {
          topic.isSubscribed = false;
          topic._count.subscribers -= 1;
        }
        await fulfillJson(route, 200);
        return;
      }
    }

    if (method === "GET" && url.pathname === "/posts") {
      await fulfillJson(route, 200, state.posts);
      return;
    }

    if (method === "POST" && url.pathname === "/posts") {
      const payload = request.postDataJSON() as {
        title: string;
        content: string;
        topicId: string;
      };
      const topic = state.topics.find((item) => item.id === payload.topicId);
      const now = new Date().toISOString();
      const post: MockPost = {
        id: `post-${state.posts.length + 1}`,
        title: payload.title,
        content: payload.content,
        authorId: state.sessionUser.id,
        topicId: payload.topicId,
        createdAt: now,
        updatedAt: now,
        author: {
          id: state.sessionUser.id,
          username: state.sessionUser.username,
        },
        topic: {
          id: payload.topicId,
          name: topic?.name ?? "Thème mocké",
        },
        _count: { comments: 0 },
      };

      state.posts = [post, ...state.posts];
      await fulfillJson(route, 201, post);
      return;
    }

    const postMatch = url.pathname.match(/^\/posts\/([^/]+)$/);
    if (method === "GET" && postMatch) {
      const post = state.posts.find((item) => item.id === postMatch[1]);
      await fulfillJson(
        route,
        post ? 200 : 404,
        post ?? { message: "Post not found" },
      );
      return;
    }

    await fulfillJson(route, 404, { message: `No mock for ${method} ${url.pathname}` });
  });

  return state;
}
