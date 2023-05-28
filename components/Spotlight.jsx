"use client";

import {
    Button,
    Group,
    MantineProvider,
    Text,
    Anchor,
    rem
} from "@mantine/core";
import { SpotlightProvider, spotlight } from "@mantine/spotlight";
import {
    IconHome,
    IconDashboard,
    IconFileText,
    IconSearch
} from "@tabler/icons-react";

function ActionsWrapper({ children }) {
    return (
        <div>
            {children}
            <Group
                position="apart"
                px={15}
                py="xs"
                sx={theme => ({
                    borderTop: `${rem(1)} solid ${
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[4]
                            : theme.colors.gray[2]
                    }`
                })}>
                <Text size="xs" color="dimmed">
                    Search powered by Mantine
                </Text>
                <Anchor size="xs" href="#">
                    Learn more
                </Anchor>
            </Group>
        </div>
    );
}

const actions = [
    {
        title: "Home",
        group: "main",
        onTrigger: () => console.log("Home")
    },
    {
        title: "Docs",
        group: "main",
        onTrigger: () => console.log("Home")
    },
    {
        title: "Dashboard",
        group: "main",
        onTrigger: () => console.log("Home")
    },
    {
        title: "Component: Tabs",
        group: "search",
        onTrigger: () => console.log("Home")
    },
    {
        title: "Component: SegmentedControl",
        group: "search",
        onTrigger: () => console.log("Home")
    },
    {
        title: "Component: Button",
        group: "search",
        onTrigger: () => console.log("Home")
    }
];

// const actions = [
//     {
//         title: "Home",
//         group: "Category",
//         description: "Get to home page",
//         onTrigger: () => console.log("Home"),
//         icon: <IconHome size="1.2rem" />
//     },
//     {
//         title: "Dashboard",
//         group: "Category",
//         description:
//             "Get full information about current system status",
//         onTrigger: () => console.log("Dashboard"),
//         icon: <IconDashboard size="1.2rem" />
//     },
//     {
//         title: "Documentation",
//         group: "Category",
//         description:
//             "Visit documentation to lean more about all features",
//         onTrigger: () => console.log("Documentation"),
//         icon: <IconFileText size="1.2rem" />
//     }
// ];

export default function Demo() {
    return (
        // <MantineProvider
        //     theme={{
        //         colorScheme: "dark",
        //         colors: {
        //             dark: [
        //                 "#d5d7e0",
        //                 "#acaebf",
        //                 "#8c8fa3",
        //                 "#666980",
        //                 "#4d4f66",
        //                 "#34354a",
        //                 "#2b2c3d",
        //                 "#1d1e30",
        //                 "#0c0d21",
        //                 "#01010a"
        //             ]
        //         }
        //     }}
        //     withGlobalStyles
        //     withNormalizeCSS>
        <SpotlightProvider
            styles={{
                body: { backgroundColor: "#374151" },
                actionHighlight: { color: "#f3f4f6" },
                actionDescription: { color: "#d1d5db" },
                searchInput: {
                    backgroundColor: "#374151 !important",
                    // border: "1px solid yellow !important"
                    "&:focus": { color: "white !important" }
                }
                // actionHighlight: {
                //     //     "&:hover": { backgroundColor: "yellow" }
                //     // }
            }}
            // size="lg"
            actions={actions}
            searchIcon={<IconSearch size="1.2rem" />}
            searchPlaceholder="Search..."
            shortcut="mod + shift + 1"
            nothingFoundMessage="Nothing found..."
            actionsWrapperComponent={ActionsWrapper}>
            <Group position="center">
                <Button onClick={spotlight.open}>
                    Open spotlight
                </Button>
            </Group>
        </SpotlightProvider>
        // </MantineProvider>
    );
}
