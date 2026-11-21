export const GISCUS_REQUIRED_KEYS = [
  'PUBLIC_GISCUS_REPO',
  'PUBLIC_GISCUS_REPO_ID',
  'PUBLIC_GISCUS_CATEGORY',
  'PUBLIC_GISCUS_CATEGORY_ID',
];

// Giscus repository and category identifiers are public values embedded in the
// browser widget, not credentials. Keep working defaults in source so comments
// do not disappear when a static host is missing optional environment values.
export const GISCUS_DEFAULTS = {
  PUBLIC_GISCUS_REPO: 'arshad115/arshadmehmood.com',
  PUBLIC_GISCUS_REPO_ID: 'R_kgDOV2_BHg',
  PUBLIC_GISCUS_CATEGORY: 'Announcements',
  PUBLIC_GISCUS_CATEGORY_ID: 'DIC_kwDOV2_BHs4DLrRm',
};

function flag(value) {
  return /^(1|true|yes)$/i.test(String(value || '').trim());
}

function present(value) {
  return Boolean(String(value || '').trim());
}

export function commentsDisabled(env = process.env) {
  return flag(env.COMMENTS_DISABLED) || flag(env.PUBLIC_COMMENTS_DISABLED);
}

export function giscusConfigured(env = process.env) {
  return GISCUS_REQUIRED_KEYS.every((key) => present(env[key] || GISCUS_DEFAULTS[key]));
}

export function isGiscusEnabled(env = process.env) {
  return !commentsDisabled(env) && giscusConfigured(env);
}

/** Production deployment: checked-in public defaults, overrides, or an explicit comments-off flag. */
export function assertGiscusForProduction(env = process.env) {
  if (commentsDisabled(env)) return;
  const missing = GISCUS_REQUIRED_KEYS.filter((key) => !present(env[key] || GISCUS_DEFAULTS[key]));
  if (missing.length) {
    throw new Error(
      `Production comments need Giscus secrets or COMMENTS_DISABLED=true. Missing: ${missing.join(', ')}`,
    );
  }
}
