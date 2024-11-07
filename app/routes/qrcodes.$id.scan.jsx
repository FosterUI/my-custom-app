import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import db from "../db.server";

import { getDestinationUrl } from "../models/QRCode.server";

// app/routes/qrcodes.$id.scan.jsx

export const loader = async ({ params }) => {
  invariant(params.id, "Could not find QR code destination");

  const id = params.id; // Remove Number() conversion
  const qrCode = await db.qRCode.findFirst({ where: { id } });

  invariant(qrCode, "Could not find QR code destination");

  await db.qRCode.update({
    where: { id },
    data: { scans: { increment: 1 } },
  });

  return redirect(getDestinationUrl(qrCode));
};
