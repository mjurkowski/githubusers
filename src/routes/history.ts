import { createBrowserHistory, Action } from 'history';

export const history = createBrowserHistory({
  basename: process.env.NODE_ENV === 'production' ? '/githubusers' : '/'
});

let pastLocations: Location[] = [];
function updatePastLocations(location: Location, action: Action) {
  switch (action) {
    case 'PUSH':
      // first location when app loads and when pushing onto history
      pastLocations.push(location);
      break;
    case 'REPLACE':
      // only when using history.replace
      pastLocations[pastLocations.length - 1] = location;
      break;
    case 'POP': {
      // happens when using the back button, or forward button
      pastLocations.pop();
      // location according to pastLocations
      const appLocation = pastLocations[pastLocations.length - 1];
      if (!(appLocation && appLocation.pathname === location.pathname)) {
        // If the current location doesn't match what the app thinks is the current location,
        // blow up the app history.
        pastLocations = [location];
      }
      break;
    }
    default:
  }
}
history.listen(updatePastLocations as any);

function isPreviousLocationWithinApp(): boolean {
  return pastLocations.length > 1;
}

export function goBackOrReplace(location: string): void {
  if (isPreviousLocationWithinApp()) {
    history.goBack();
  } else {
    history.replace(location);
  }
}
