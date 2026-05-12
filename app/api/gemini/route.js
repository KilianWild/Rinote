import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const { task, data } = await request.json();
    const prompt = `Task: "${task}" - Data to process: "${JSON.stringify(data)}"`;

    // ---< Check token count first >---
    const countResult = await ai.models.countTokens({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("Tokens in prompt:", countResult.totalTokens);

    // ---< Limit token Count >---
    if (countResult.totalTokens > 5000) {
      return Response.json({ error: "Prompt is too long!" }, { status: 400 });
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "array",
          description:
            "A structured list of notes organized into a tree via referenceLink.",
          items: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                description: "A unique identifier for this note.",
              },
              text: {
                type: "string",
                description: "The original content of the note.",
              },
              tags: {
                type: "array",
                items: { type: "string" },
                description: "Exactly 5 descriptive tags for categorization.",
              },
              shortDescr: {
                type: "string",
                description:
                  "Max 25 words summarizing the core essence, specifically identifying conflicts, opposites, or open questions.",
              },
              inquiry: {
                type: "string",
                description:
                  "The theme or question this note belongs to. Use existing theme names if applicable; otherwise, create a new, concise title.",
              },
              descrapancyRefs: {
                type: "array",
                description:
                  "Array of _id strings that this note contradicts, challenges, or negates. Return[] if none exist.",
                items: { type: "string" },
              },
              referenceLink: {
                type: "string",
                description: `The _id of the parent node. 
                  1. THEME IDENTIFICATION: 
                     - Determine if the note belongs to an existing 'inquiry' theme or requires a new one.
                     - If no compatible theme exists, assign an empty string ('') to create a new independent Center Node.

                  2. CENTER NODE ASSIGNMENT (THEME ROOT):
                     - If this note is the primary foundation of an inquiry, assign an empty string ('').
                     - A Center Node (empty string) can have a MAXIMUM of 6 direct children.

                  3. HIERARCHICAL MAPPING:
                     - If the relevant Center Node already has 6 direct children, you MUST NOT link to the Center Node.
                     - Instead, link the note to an existing child node within that same theme to maintain a branching tree structure.

                  4. EXCLUSION/NEW THEME:
                     - If a note is unrelated to all existing themes, treat it as a new topic and assign an empty string ('') to start a new independent root node.`,
              },
              inquiryopen: {
                type: "boolean",
                description:
                  "True if the note poses a new question or requires further exploration. False if it provides an answer or is a factual statement.",
              },
              reasoning: {
                type: "string",
                description:
                  "A brief justification for the chosen referenceLink and the determined inquiryopen status.",
              },
            },
            required: [
              "_id",
              "text",
              "tags",
              "shortDescr",
              "inquiry",
              "descrapancyRefs",
              "referenceLink",
              "inquiryopen",
              "reasoning",
            ],
          },
        },
      },
    });

    // ---< check for finish reason >---
    const candidate = response.candidates[0];
    if (candidate.finishReason === "MAX_TOKENS") {
      console.warn(
        "Warning: The response was truncated because it reached the token limit.",
      );
    } else if (candidate.finishReason === "COMPLETE") {
      console.log("Response completed normally.");
    }

    return Response.json(
      { result: response.text, finishReason: candidate.finishReason },
      { status: 200 },
    );
  } catch (error) {
    console.error("--- FULL GEMINI ERROR ---");
    console.error(JSON.stringify(error, null, 2));

    return Response.json(
      {
        error: "Failed to process task",
        details: error.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
