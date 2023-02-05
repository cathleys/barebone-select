import { useQuery } from "react-query";
import axios from "axios";

async function getIssues(status: string, level: string) {
  const { data } = await axios.get(
    `https://prolog-api.profy.dev/issue?&status=${status}&level=${level}`
  );

  return data;
}

export function useIssues(optionStatus: string, optionLevel: string) {
  const query = useQuery(["issues", optionStatus, optionLevel], () =>
    getIssues(optionStatus, optionLevel)
  );

  return query;
}
