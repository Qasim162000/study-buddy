// JSON schemas for API responses
export const SUMMARIZER_SCHEMA = {
  type: "OBJECT",
  properties: {
    summary: { "type": "STRING" },
    concepts: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          concept: { "type": "STRING" },
          explanation: { "type": "STRING" },
          realWorldExample: { "type": "STRING" }
        },
        propertyOrdering: ["concept", "explanation", "realWorldExample"]
      }
    },
    quizQuestions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: { "type": "STRING" },
          options: {
            type: "ARRAY",
            items: { "type": "STRING" }
          },
          correctAnswer: { "type": "STRING" }
        },
        propertyOrdering: ["question", "options", "correctAnswer"]
      }
    }
  },
  propertyOrdering: ["summary", "concepts", "quizQuestions"]
};

export const QUIZ_ONLY_SCHEMA = {
  type: "OBJECT",
  properties: {
    quizQuestions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: { "type": "STRING" },
          options: {
            type: "ARRAY",
            items: { "type": "STRING" }
          },
          correctAnswer: { "type": "STRING" }
        },
        propertyOrdering: ["question", "options", "correctAnswer"]
      }
    }
  },
  propertyOrdering: ["quizQuestions"]
}; 