import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";

const getMonthlyEarningsHandler = async (request, { params }) => {
  const { year } = params;

  if (!year) {
    return NextResponse.json({ message: "Year is required" }, { status: 400 });
  }

  const selectedYear = parseInt(year, 10);
  if (isNaN(selectedYear)) {
    return NextResponse.json(
      { message: "Invalid year format" },
      { status: 400 }
    );
  }

  try {
    const startOfYear = new Date(`${selectedYear}-01-01T00:00:00.000Z`);
    const startOfNextYear = new Date(`${selectedYear + 1}-01-01T00:00:00.000Z`);

    const earningsData = await Course.aggregate([
      { $unwind: "$students" },
      {
        $match: {
          "students.purchaseDate": {
            $gte: startOfYear,
            $lt: startOfNextYear,
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$students.purchaseDate" } },
          totalEarnings: { $sum: "$price" }, // Sum the price of the course for each purchase
        },
      },
      { $sort: { "_id.month": 1 } },
      {
        $project: {
          month: "$_id.month",
          totalEarnings: 1,
          _id: 0,
        },
      },
    ]);

    return NextResponse.json(
      { message: "Earnings retrieved successfully", earnings: earningsData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating earnings:", error);
    return NextResponse.json(
      { message: "Failed to calculate earnings" },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getMonthlyEarningsHandler);
