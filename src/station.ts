import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: 100vh;
  height: auto;
  background-color: #eaeaea;
`;

export const CardContainer = styled.div`
  padding: 2rem 5rem 0 5rem;
`;

export const Card = styled.div`
  border-radius: 20px;
  background-color: #ffffff;
  padding: 20px 30px 20px 30px;
  -webkit-box-shadow: 15px -12px 34px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 15px -12px 34px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 15px -12px 34px -7px rgba(0, 0, 0, 0.75);
`;

export const StationDataContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-evenly;
`;

export const Header = styled.div`
  flex-grow: 1;
`;

export const DataText = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 1.5;
`;

export const DataTitle = styled.h2`
  font-weight: ${(props: { fontWeight: string }): string =>
    props.fontWeight ? props.fontWeight : 500};
  font-size: ${(props: { fontSize: string }): string => props.fontSize};
  margin: ${(props: { margin: string }): string => props.margin};
  line-height: 1.5;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: ${(props: { fontSize: string }): string => props.fontSize};
  margin: ${(props: { margin: string }): string => props.margin};
  line-height: 1.5;
`;

export const Label = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  margin: ${(props: { margin: string }): string => props.margin};
`;
