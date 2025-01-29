import { NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { dbConnect } from "@/lib/mongo";
import { Student } from "../../../../../../backend/model/student-model";
import { auth } from "../../../../../auth";

const pump = promisify(pipeline);

export const PUT = async (request) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { firstName, lastName, username, email, phoneNumber, profileImage, countryCode } = 
    await request.json();

  await dbConnect();

  try {
    const student = await Student.findOne({ email: user.email });

    if (!student) {
      return new NextResponse(
        JSON.stringify({ message: "Profile not found." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;
    if (username) student.username = username;
    if (email) student.email = email;
    if (phoneNumber) student.phoneNumber = phoneNumber;
    if (countryCode) student.countryCode = countryCode;

    let profileImagePath;
    if (profileImage) {
      try {
        const profileImgData = profileImage.split(",")[1];
        const profileImgBuffer = Buffer.from(profileImgData, "base64");
        const uniqueFilename = `${username}_${Date.now()}.png`;
        profileImagePath = `./public/profiles/${uniqueFilename}`;

        await pump(
          Readable.from(profileImgBuffer),
          fs.createWriteStream(profileImagePath)
        );

        student.profileImage = profileImagePath.replace("./public", "");
      } catch (error) {
        console.error("Error processing profile image:", error);
        return new NextResponse(
          JSON.stringify({ message: "Failed to process profile image" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Save the updated student profile
    await student.save();

    return new NextResponse(
      JSON.stringify({ message: "Profile updated successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
