import React from "react";
import { Spinner } from "./Spinner";

export function errorComponent() {
  return <div>Sorry, there was a problem loading the page.</div>;
}

export function timedOutComponent() {
  return <div>Taking a long time...</div>;
}

export function pastDelayComponent() {
  return <Spinner />;
}

export function ComponentLoading({ error, pastDelay, timedOut }) {
  if (error) {
    // Handle the error state
    return errorComponent();
  } else if (timedOut) {
    // Handle the timed out state
    return timedOutComponent();
  } else if (pastDelay) {
    // Handle the loading state
    return pastDelayComponent();
  } else {
    return null;
  }
}
