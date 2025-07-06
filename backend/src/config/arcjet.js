import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import ENV from "./env.js";

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // Shield protects your app from common attacks e.g. SQL Injection, XSS, CSRF attacks
    shield({ mode: "LIVE" }),

    // Bot Detection - Block all bots except search engine
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    // Rate Limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // tokens added per interval
      interval: 10, // interval in seconds (10 seconds)
      capacity: 15, // max tokens in bucket
    }),
  ],
});

export default aj;
