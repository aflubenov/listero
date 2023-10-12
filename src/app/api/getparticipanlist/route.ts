import { NextRequest, NextResponse } from "next/server";
import { getParticipationList } from "@/app/services/server_participants";

// **** Functions **** //

import * as adminFB from "firebase-admin";

let fbCert = JSON.parse(process.env.FIREBASE_SETUP as any);
fbCert.private_key = fbCert.private_key.replace(/\\n/g, "\n");

const getFBApp = () => {
  try {
    return adminFB.app();
  } catch {
    return adminFB.initializeApp({
      credential: adminFB.credential.cert(fbCert),
    });
  }
};

const unAuthorizedError = (message: string = "unauthorized") => {
  return NextResponse.json(
    { error: message },
    {
      status: 401,
    }
  );
};

export const GET = async (req: NextRequest) => {
  const ownerId = req.nextUrl.searchParams.get("ownerid");
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return unAuthorizedError();
  }

  const [bearer, userId] = authHeader.split(" ");
  if (bearer !== "Bearer" || !userId) return unAuthorizedError();

  if (!ownerId) {
    return NextResponse.json(
      { error: "ownerId is required" },
      {
        status: 403,
      }
    );
  }

  try {
    const resp = await getFBApp().auth().verifyIdToken(userId);
  } catch (error: any) {
    throw unAuthorizedError(error.message);
  }

  const data = await getParticipationList(ownerId);

  return NextResponse.json({
    data,
  });
};
