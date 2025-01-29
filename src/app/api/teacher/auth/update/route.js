import { NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { dbConnect } from "@/lib/mongo";
import { Teacher } from "../../../../../../backend/model/teacher-model";
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

  const {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    profileImage,
    countryCode,
    bio,
    expertise,
  } = await request.json();

  await dbConnect();

  try {
    const teacher = await Teacher.findOne({ email: user.email });

    if (!teacher) {
      return new NextResponse(
        JSON.stringify({ message: "Profile not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (firstName) teacher.firstName = firstName;
    if (lastName) teacher.lastName = lastName;
    if (username) teacher.username = username;
    if (email) teacher.email = email;
    if (phoneNumber) teacher.phoneNumber = phoneNumber;
    if (countryCode) teacher.countryCode = countryCode;
    if (bio) teacher.bio = bio;

    // Directly assign `expertise` if it's an array
    if (Array.isArray(expertise)) {
      teacher.expertise = expertise;
    }

    // Process profileImage only if it's provided
    if (profileImage) {
      try {
        const profileImgData = profileImage.split(",")[1];
        const profileImgBuffer = Buffer.from(profileImgData, "base64");
        const uniqueFilename = `${username}_${Date.now()}.png`;
        const profileImagePath = `./public/profiles/${uniqueFilename}`;

        await pump(
          Readable.from(profileImgBuffer),
          fs.createWriteStream(profileImagePath)
        );

        teacher.profileImage = profileImagePath.replace("./public", "");
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

    await teacher.save();

    return new NextResponse(
      JSON.stringify({ message: "Profile updated successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating teacher profile:", error);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
