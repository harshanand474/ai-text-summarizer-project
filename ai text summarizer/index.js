async function summarizeText() {

    const inputText =
        document.getElementById("inputText").value;

    const output =
        document.getElementById("output");

    const loading =
        document.getElementById("loading");

    if (inputText.trim() === "") {
        alert("Please enter some text");
        return;
    }

    loading.style.display = "block";

    output.innerHTML = "";

    const apiKey = "Your_API_Key";

    try {

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization": "Bearer " + apiKey,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    model: "openai/gpt-3.5-turbo",

                    messages: [
                        {
                            role: "user",
                            content:
                                "Summarize this text in simple points:\n\n" +
                                inputText
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data);

        output.innerHTML =
            data.choices[0].message.content;

    }
    catch (error) {

        console.log(error);

        output.innerHTML =
            "Error generating summary.";

    }

    loading.style.display = "none";
}