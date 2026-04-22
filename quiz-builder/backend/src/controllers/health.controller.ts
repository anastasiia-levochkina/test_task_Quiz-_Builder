import type { Request, Response } from "express";
import { sendOk } from "../lib/http";
import { getHealthStatus } from "../services/health.service";

export async function getHealth(_req: Request, res: Response) {
  const status = getHealthStatus();
  return sendOk(res, status);
}
