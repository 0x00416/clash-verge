import useSWR, { useSWRConfig } from "swr";
import { useEffect } from "react";
import { Box, List, Paper, Typography } from "@mui/material";
import { getProxies } from "../services/api";
import ProxyGroup from "../components/proxy-group";

const ProxyPage = () => {
  const { mutate } = useSWRConfig();
  const { data: proxiesData } = useSWR("getProxies", getProxies);
  const { groups = [] } = proxiesData ?? {};

  useEffect(() => {
    // fix the empty proxies on the first sight
    // this bud only show on the build version
    // call twice to avoid something unknown or the delay of the clash startup
    setTimeout(() => mutate("getProxies"), 250);
    setTimeout(() => mutate("getProxies"), 1000);
  }, []);

  return (
    <Box sx={{ width: 0.9, maxWidth: "850px", mx: "auto", mb: 2 }}>
      <Typography variant="h4" component="h1" sx={{ py: 2 }}>
        Proxy Groups
      </Typography>

      {groups.length > 0 && (
        <Paper sx={{ borderRadius: 1, boxShadow: 2 }}>
          <List>
            {groups.map((group) => (
              <ProxyGroup key={group.name} group={group} />
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ProxyPage;
