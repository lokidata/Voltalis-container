import { writeFileSync } from "node:fs";
import { Observable, switchMap, tap } from "rxjs";
import { schedule } from "node-cron";
export { Axios as axios } from "axios-observable";

function cron(expr: string) {
  let counter = 0;

  return new Observable((subscriber) => {
    subscriber.next(counter++);

    const task = schedule(expr, () => {
      subscriber.next(counter++);
    });

    task.start();

    return () => task.stop();
  });
}

// Liveness for the container HEALTHCHECK: rewritten on every successful fetch.
const HEARTBEAT_FILE = "/tmp/heartbeat";
const beat = () => {
  try {
    writeFileSync(HEARTBEAT_FILE, String(Date.now()));
  } catch {
    // read-only or missing /tmp (local dev): the healthcheck only matters in the container
  }
};

export const poller = <T extends Observable<any>>(expr: string, fetchFn: () => T) => {
  return cron(expr).pipe(
    switchMap(() => fetchFn()),
    tap(beat),
  );
};
