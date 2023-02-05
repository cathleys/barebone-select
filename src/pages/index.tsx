import { useRouter } from "next/router";
import { useState, useEffect, useId } from "react";
import styled from "styled-components";

import Select from "react-select";
import { useIssues } from "hooks/use-issue";

const optionByStatus = [
  { value: "", label: "--" },
  { value: "open", label: "Unresolved" },
  { value: "resolved", label: "Resolved" },
];

const optionByLevel = [
  { value: "", label: "--" },
  { value: "error", label: "Error" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" },
];

const WrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FilterStyle = styled.form`
  display: flex;
  flex-direction: row;
`;

const Dropdown = styled(Select)`
  width: 10rem;
`;

const Home = () => {
  const router = useRouter();
  const { status, level } = router.query;
  // Since the `status` query param can technically be an array (as per useRouter()),
  // we can "normalize" this by plucking the first index (0) if it's an array.
  let statusQueryParam = Array.isArray(status) ? status[0] : status ?? "";
  let levelQueryParam = Array.isArray(level) ? level[0] : level ?? "";

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  // This useEffect ensures that our query parameters
  // are always captured and in sync with our state, since
  // it seems useRouter() detects query parameters on the client side
  // and will miss detection of them on initial render
  useEffect(() => {
    if (statusQueryParam) setSelectedStatus(statusQueryParam);
    if (levelQueryParam) setSelectedLevel(levelQueryParam);
  }, [statusQueryParam, levelQueryParam]);

  const handleStatusChange = (optionByStatus: any) => {
    setSelectedStatus(optionByStatus.value);

    router.push({
      query: {
        ...router.query,
        status: optionByStatus.value,
      },
    });
  };
  const handleLevelChange = (optionByLevel: any) => {
    setSelectedLevel(optionByLevel.value);
    router.push({
      query: {
        ...router.query,
        level: optionByLevel.value,
      },
    });
  };

  const issuesPage = useIssues(selectedStatus, selectedLevel);

  return (
    <>
      <WrapperStyle>
        <FilterStyle>
          <Dropdown
            // I was seeing a warning about mismatched client/server ids
            // and found this solution here: https://stackoverflow.com/a/73117797
            instanceId={useId()}
            options={optionByStatus}
            placeholder="Status"
            onChange={handleStatusChange}
            blurInputOnSelect={true}
            // Only set a value if the selectedStatus is truthy
            // Otherwise value gets set incorrectly
            // and we don't get a proper placeholder
            {...(selectedStatus && {
              value: optionByStatus.find((o) => o.value === selectedStatus),
            })}
          />

          <Dropdown
            instanceId={useId()}
            options={optionByLevel}
            placeholder="Level"
            onChange={handleLevelChange}
            blurInputOnSelect={true}
            {...(selectedLevel && {
              value: optionByLevel.find((o) => o.value === selectedLevel),
            })}
          />
        </FilterStyle>
      </WrapperStyle>
    </>
  );
};
export default Home;
