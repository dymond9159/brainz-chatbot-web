import { JSONValue } from "ai";

import search_tools from "@/libs/tools/search_psychometric_tools.json";

export const functions = [
    search_tools,
    // more functions
];

async function search_psychometric_tools(args: any) {
    const result: JSONValue = null;
    if (args?.tool_name) {
        return {
            tool_name: args?.tool_name,
            link: args?.link,
        };
    }
    return result;
}

export async function runFunction(name: string, args: any) {
    switch (name) {
        case "search_psychometric_tools":
            return await search_psychometric_tools(args);
        // more functions
    }
}
