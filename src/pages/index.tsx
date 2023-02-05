import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import Select from "react-select";
import { useIssues } from "hooks/use-issue";

const optionByStatus = [
  { value: "", label: "--" },
  { value: "open", label: "Unresolved" },
  { value: "resolved", label: "Resolved" }
];

const optionByLevel = [
  { value: "", label: "--" },
  { value: "error", label: "Error" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" }
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
  const queryParam = router.query;
  const optionInitialValue: any = queryParam.status || "";

  const [optionStatus, setOptionStatus] = useState(optionInitialValue);
  const [optionLevel, setOptionLevel] = useState("");

  const handleStatusChange = (optionByStatus: any) => {
    setOptionStatus(optionByStatus.value);

    router.push({
      query: {
        ...router.query,
        status: optionByStatus.value
      }
    });
  };
  const handleLevelChange = (optionByLevel: any) => {
    setOptionLevel(optionByLevel.value);
    router.push({
      query: {
        ...router.query,
        level: optionByLevel.value
      }
    });
  };

  const issuesPage = useIssues(optionStatus, optionLevel);

  return (
    <>
      <WrapperStyle>
        <FilterStyle>
          <Dropdown
            options={optionByStatus}
            placeholder="Status"
            onChange={handleStatusChange}
            blurInputOnSelect={true}
          />

          <Dropdown
            options={optionByLevel}
            placeholder="Level"
            onChange={handleLevelChange}
            blurInputOnSelect={true}
          />
        </FilterStyle>
      </WrapperStyle>
    </>
  );
};
export default Home;
