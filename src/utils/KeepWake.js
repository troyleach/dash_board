export function keepMeAwake() {
  // FIXME: this is not the right way of doing this. maybe I should use new-relic
  window.location.reload(true);
};
