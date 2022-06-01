// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

import { NextFunction, Request, Response } from 'express'

import { NotificationModel } from '@/schemas/notification'
import { IUser } from '@/schemas/user'
import logger from '@/utils/logger'

export async function inboxSeen(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user as IUser

  await NotificationModel.updateMany(
    { userId: user._id, seenAt: { $exists: false } },
    { $set: { seenAt: new Date() } }
  )

  logger.info('%s: marked notifications as seen', user.username)
  return res.status(204).send()
}
