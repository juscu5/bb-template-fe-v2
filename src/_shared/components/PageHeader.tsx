import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";

export interface LSTVProps {
  title: string;
  element?: any;
}

const PageHeader = ({ title, element }: LSTVProps) => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        m={3}
      >
        <Typography
          variant="h6"
          fontSize={27}
          width="100%"
          fontFamily="Poppins"
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              overflow: "auto",
              flexShrink: 5,
              fontFamily: "Poppins",
              fontSize: 14,
            }}
          >
            <Link
              underline="hover"
              color="inherit"
              href="#"
              onClick={(event: any) => event.preventDefault()}
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="#"
              onClick={(event: any) => event.preventDefault()}
            >
              Master File
            </Link>
            <Typography color="text.primary" fontFamily="Poppins" fontSize={14}>
              {title}
            </Typography>
          </Breadcrumbs>
          {title}
        </Typography>

        <>
          <Stack
            direction="row-reverse"
            alignItems="center"
            justifyContent="space-between"
          >
            {element?.value === "0" ? "" : element}
          </Stack>
        </>
      </Stack>
    </>
  );
};

export default PageHeader;
