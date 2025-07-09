exports.handler = async (event) => {
  try {
    const { courses, allCourses } = JSON.parse(event.body);
    console.log(courses, allCourses);

    const prompt = `
You are a helpful course recommender AI.
The user is currently taking ${JSON.stringify(courses, null, 2)}
Here are the available courses:
${JSON.stringify(allCourses, null, 2)}

Recommend the top 3 most relevant courses from the list above, that the user is not in  ${JSON.stringify(courses, null, 2)}. If  ${JSON.stringify(courses, null, 2)} is blank, choose the most popular courses from ${JSON.stringify(allCourses, null, 2)}
Respond ONLY in JSON format as an array with objects like:
[
  { "course_id": "CS123",
   "title": "Course Title".
   "description": 'Learn the fundamentals of programming using Python. This beginner-friendly course covers variables, data types, control structures, functions, and basic object-oriented programming. Ideal for students with no prior experience.'
   }
]
`;

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();

    // Extract the generated text response
    const message =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    const cleaned_message = message.slice(8, -3);

    // Try parsing the JSON response from the model
    let recommendations;
    try {
      recommendations = JSON.parse(cleaned_message);
    } catch (err) {
      console.error("Failed to parse Gemini response JSON:", err);
      recommendations = [
        {
          title: "Error",
          reason: "Failed to parse model response. Raw response: " + message,
        },
      ];
    }

    return {
      statusCode: 200,
      body: JSON.stringify(recommendations),
    };
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gemini API call failed" }),
    };
  }
};
