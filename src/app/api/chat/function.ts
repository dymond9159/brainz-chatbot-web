import { JSONValue } from "ai";

import search_tools from "@/libs/tools/search_psychometric_tools.json";
import search_mentalhealth_index from "@/libs/tools/search_mentalhealth_index.json";
import get_score from "@/libs/tools/get_score.json";
import { ProfileForMetric } from "@/types";

export const functions = [
    // search_mentalhealth_index,
    // search_tools,
    get_score,
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

async function search_psychometric_score(args: any, profile: ProfileForMetric) {
    const result: JSONValue = null;
    console.log(profile[args?.item]);
    return profile[args?.item];
}

export async function runFunction(
    name: string,
    args: any,
    profile: ProfileForMetric,
) {
    switch (name) {
        case "search_psychometric_tools":
            return await search_psychometric_tools(args);
        case "search_mentalhealth_index":
            return await search_psychometric_score(args, profile);
        default:
            break;
        // more functions
    }
}
