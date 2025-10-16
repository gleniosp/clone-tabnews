function getOrigin() {
  if (["test", "development"].includes(process.env.NODE_ENV)) {
    return "http://localhost:3000";
  }

  // Vercel injects this env var when the code is deployed to one of its environments.
  // "preview" is the staging environment for Vercel.
  if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "https://clonetabnewsxyz.com";
}

const webserver = {
  origin: getOrigin(),
};

export default webserver;
