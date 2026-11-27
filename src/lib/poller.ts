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

// Liveness for the container HEALTHCHECK: the file named by HEARTBEAT_FILE (set in the Dockerfile,
// in a private directory made by entrypoint.sh) is rewritten on every successful fetch. Unset: no-op.
const beat = () => {
  const file = process.env.HEARTBEAT_FILE;
  if (!file) return;
  try {
    writeFileSync(file, String(Date.now()));
  } catch {
    // unwritable path: the healthcheck will report it, the bridge keeps running
  }
};

export const poller = <T extends Observable<any>>(expr: string, fetchFn: () => T) => {
  return cron(expr).pipe(
    switchMap(() => fetchFn()),
    tap(beat),
  );
};
