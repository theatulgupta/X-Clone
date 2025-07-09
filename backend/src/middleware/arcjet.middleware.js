import aj from "../config/arcjet.js";

const ERROR_RESPONSES = {
  isRateLimit: {
    status: 429,
    error: "Too Many Requests",
    message: "Rate limit exceeded. Please try again later.",
  },
  isBot: {
    status: 403,
    error: "Bot access denied",
    message: "Automated requests are not allowed.",
  },
  default: {
    status: 403,
    error: "Forbidden",
    message: "Access denied by security policy.",
  },
  spoofedBot: {
    status: 403,
    error: "Spoofed bot access denied",
    message: "Detected spoofed automated activity.",
  },
};

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      const reason = decision.reason;
      console.log("Arcjet decision.reason:", reason);

      if (typeof reason?.isRateLimit === "function" && reason.isRateLimit()) {
        return res
          .status(ERROR_RESPONSES.isRateLimit.status)
          .json(ERROR_RESPONSES.isRateLimit);
      }
      if (typeof reason?.isBot === "function" && reason.isBot()) {
        return res
          .status(ERROR_RESPONSES.isBot.status)
          .json(ERROR_RESPONSES.isBot);
      }
      return res
        .status(ERROR_RESPONSES.default.status)
        .json(ERROR_RESPONSES.default);
    }

    const spoofedBotDetected = decision.results?.some(
      (r) =>
        typeof r.reason.isBot === "function" &&
        r.reason.isBot() &&
        typeof r.reason.isSpoofed === "function" &&
        r.reason.isSpoofed()
    );

    if (spoofedBotDetected) {
      return res
        .status(ERROR_RESPONSES.spoofedBot.status)
        .json(ERROR_RESPONSES.spoofedBot);
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    next();
  }
};

export default arcjetMiddleware;
