export function cron(ms, callback) {
  (() => {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          if (callback) callback();
          resolve(null);
        },
        ms ? ms : 1
      );
    });
  })().then(() => {
    cron(ms, callback);
  });
}

export function Do(itr, callback) {
  for (let i = 0; i < itr; i++) {
    callback();
  }
}

export function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
