import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ request, getClientAddress }) => {
  const socketIp = getClientAddress();

  return Response.json({
    socketIp,
    xForwardedFor: request.headers.get("x-forwarded-for"),
    xRealIp: request.headers.get("x-real-ip"),
    cfConnectingIp: request.headers.get("cf-connecting-ip"),
    xClientIp: request.headers.get("x-client-ip"),
  })
}