import styled from "@emotion/styled";

interface RootStyleProps {
  isMinimized?: boolean;
}

export const RootStyle = styled("div")<RootStyleProps>(
  ({ theme, isMinimized }) => ({
    minHeight: "calc(100vh - 70px)",
    width: "100%",
    marginLeft: isMinimized ? "75px" : "275px",
    transition: "margin-left 0.3s ease",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    fontFamily: "'Poppins', sans-serif",
  })
);
