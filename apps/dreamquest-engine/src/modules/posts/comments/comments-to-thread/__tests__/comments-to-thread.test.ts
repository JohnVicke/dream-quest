import { describe, expect, it } from "vitest";

import { commentsToThread } from "../comments-to-thread";
import { response } from "./comment-response";
import { transformedResponse } from "./transformed-response";

describe("commentsToThread", () => {
  it("should work", () => {
    expect(commentsToThread).toBeDefined();
  });
  it("should transform response into a thread", () => {
    expect(commentsToThread(response)).toEqual(transformedResponse);
  });
});
