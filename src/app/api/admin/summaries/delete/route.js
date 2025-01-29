import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Summary } from "../../../../../../backend/model/summary-model";

const deleteSummaryHandler = async (request) => {
  const { summaryId } = await request.json();

  if (!summaryId) {
    return NextResponse.json(
      { message: "Summary ID is required" },
      { status: 400 }
    );
  }

  try {
    // Delete the summary by ID
    const deletedSummary = await Summary.findByIdAndDelete(summaryId);

    if (!deletedSummary) {
      return NextResponse.json(
        { message: "Summary not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Summary deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting summary:", error);
    return NextResponse.json(
      { message: "Failed to delete summary" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(deleteSummaryHandler);
