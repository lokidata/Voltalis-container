import { of } from "rxjs";
import { afterEach, describe, expect, it, vi } from "vitest";

const schedule = vi.hoisted(() => vi.fn());
vi.mock("node-cron", () => ({ schedule }));

import { poller } from "./poller";

describe("poller", () => {
  afterEach(() => vi.clearAllMocks());

  it("fetches immediately then on every cron tick, and stops the task on unsubscribe", () => {
    let tick: () => void = () => {};
    const stop = vi.fn();
    schedule.mockImplementation((_expr: string, cb: () => void) => {
      tick = cb;
      return { start: vi.fn(), stop };
    });
    const fetchFn = vi.fn(() => of("x"));
    const values: string[] = [];

    const sub = poller("* * * * *", fetchFn).subscribe((v) => values.push(v));
    expect(values).toEqual(["x"]);
    tick();
    expect(values).toEqual(["x", "x"]);
    expect(schedule).toHaveBeenCalledWith("* * * * *", expect.any(Function));

    sub.unsubscribe();
    expect(stop).toHaveBeenCalled();
  });
});
