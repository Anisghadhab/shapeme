import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import AllPosts from "./AllPosts.jsx";


const Feed = ({ posts }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (

        <Box flex={4} p={{ xs: 0, md: 2 }}>

            {loading ? (
                <Stack spacing={1}>
                    <Skeleton variant="text" height={100} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="rectangular" height={300} />
                </Stack>
            ) : (
                <>
                    <AllPosts posts={posts} />
                </>
            )}
        </Box>
    );
};

export default Feed;