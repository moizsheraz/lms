async function createPayment(amount, courseId, studentId, email) {
  const requestBody = {
    TerminalNumber: 1000,
    ApiName: "test2025",
    ReturnValue: `${studentId}_${courseId}`,
    Amount: amount,
    SuccessRedirectUrl: "https://justagame.tech/student/profile",
    FailedRedirectUrl: "https://www.yahoo.com",
    ProductName: "Testing Product",
    WebHookUrl:
      "https://justagame.tech/api/webhooks/CardComLPWebHook",
    Document: {
      To: "username",
      Email: email,
      Products: [
        {
          Description: "Course Payment",
          UnitCost: amount,
        },
      ],
    },
  };

  try {
    const response = await fetch(
      "https://secure.cardcom.solutions/api/v11/LowProfile/Create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.ResponseCode === 0) {
      return data.Url;
    } else {
      throw new Error(`API Error: ${data.Description}`);
    }
  } catch (error) {
    console.error("Error fetching the payment URL:", error);
    throw error;
  }
}

export { createPayment };