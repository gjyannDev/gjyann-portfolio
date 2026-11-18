import { cacheLife } from "next/cache";

export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
  weekday: number;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
  months: { name: string; totalWeeks: number }[];
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount contributionLevel weekday }
          }
          months { name totalWeeks }
        }
      }
    }
  }
`;

/**
 * Last year of contributions from GitHub's GraphQL API. Private contributions
 * are included as anonymous counts when "Private contributions" is enabled on
 * the GitHub profile. Returns null when the token is missing or the call fails.
 */
export async function getContributions(
  login: string,
): Promise<ContributionCalendar | null> {
  "use cache";
  cacheLife("hours");

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("[github] GITHUB_TOKEN is not set; skipping contributions.");
    return null;
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
    });
    if (!res.ok) {
      console.error(`[github] contributions request failed: ${res.status}`);
      return null;
    }
    const json = await res.json();
    if (json.errors) {
      console.error("[github] GraphQL errors:", json.errors);
      return null;
    }
    return (
      json.data?.user?.contributionsCollection?.contributionCalendar ?? null
    );
  } catch (error) {
    console.error("[github] contributions request threw:", error);
    return null;
  }
}
