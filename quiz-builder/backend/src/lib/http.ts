import type { Response } from "express";

export function sendOk(res: Response, data: unknown) {
  return res.status(200).json(data);
}
