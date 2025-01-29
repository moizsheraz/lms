import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Summary } from "../../../../../../backend/model/summary-model";

const editSummaryHandler = async (request) => {
  const { summaryId, summaryTitle, description } = await request.json();

  if (!summaryId || !summaryTitle || !description) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Find the summary by ID and update it
    const updatedSummary = await Summary.findByIdAndUpdate(
      summaryId,
      { summaryTitle, description },
      { new: true }
    );

    if (!updatedSummary) {
      return NextResponse.json(
        { message: "Summary not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Summary updated successfully", updatedSummary },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating summary:", error);
    return NextResponse.json(
      { message: "Failed to update summary" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(editSummaryHandler);
