const TIMEOUT_DELAY = 500;

function debounce (callback) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);
  };
}

export {debounce};
