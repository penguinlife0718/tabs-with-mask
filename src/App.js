import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./styles.css";
import { ReactComponent as CalenderSvg } from "./assets/img/icon-general-calendar.svg";

const maskColor = "#81d8d0";

const mainColor = "rgba(0, 0, 0, 0.4)";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const PositoinWrap = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
`;

const TabsContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, max-content));
  grid-gap: 20px;
  max-width: 300px;
  height: 38px;
  padding: 8px 16px;
  border-radius: 30px;
  box-sizing: border-box;
`;

const MainContainer = styled(TabsContainer)`
  background-color: #f1f1f1;
  color: ${mainColor};
`;

const MaskContainer = styled(TabsContainer)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  color: ${maskColor};
  transition: clip-path 1s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  clip-path: ${({ clips }) =>
    `inset(3px ${clips[1]} 3px ${clips[0]} round 20px)`};
  svg {
    path {
      fill: ${maskColor};
    }
  }
`;

const Tab = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Calender = styled(CalenderSvg)`
  height: 16px;
  object-fit: contain;
`;
const tabConfigs = [
  { text: "1D", callback: () => console.log("1D") },
  { text: "7D", callback: () => console.log("7D") },
  { text: "1M", callback: () => console.log("1M") },
  { text: "3M", callback: () => console.log("1W") },
  { text: "1Y", callback: () => console.log("1W") },
  {
    text: <Calender alt="calender" />,
    callback: () => console.log("日曆")
  }
];

const setButtonPosition = (c, pw, setClips) => {
  const p = c.offsetParent;
  const offsetLeft = c.offsetLeft;
  const offsetRight = p.offsetWidth - c.offsetWidth - c.offsetLeft;
  console.log({ offsetLeft: offsetLeft, offsetRight: offsetRight });

  setClips([`${offsetLeft - 12}px`, `${offsetRight - 12}px`]);
};
export default function App() {
  const tabRefs = tabConfigs.map((item) => React.createRef());
  const tabContainerRef = useRef();
  const [clips, setClips] = useState(["4px", "240px"]);
  console.log(clips);
  useEffect(() => {
    setButtonPosition(
      tabRefs[0].current,
      tabContainerRef.current.offsetWidth,
      setClips
    );
  }, []);
  return (
    <Wrap>
      <PositoinWrap>
        <MainContainer ref={tabContainerRef}>
          {tabConfigs.map((tab, index) => (
            <Tab
              ref={tabRefs[index]}
              key={`main-${tab.text}`}
              onClick={() =>
                setButtonPosition(
                  tabRefs[index].current,
                  tabContainerRef.current.offsetWidth,
                  setClips
                )
              }
            >
              {tab.text}
            </Tab>
          ))}
        </MainContainer>
        <MaskContainer clips={clips}>
          {tabConfigs.map((i) => (
            <Tab key={`mask-${i.text}`}>{i.text}</Tab>
          ))}
        </MaskContainer>
      </PositoinWrap>
    </Wrap>
  );
}
