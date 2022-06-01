// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

import e from 'express'

import { inboxList } from '@/controllers/inbox/list'
import { inboxSeen } from '@/controllers/inbox/seen'
import * as middleware from '@/middlewares'
import { promisable } from '@/utils/routing'

const router = e.Router()

/**
 * List recent user notifications.
 *
 * @api [get] /user/inbox
 *    tags:
 *      - User
 *    summary: 'List Notifications'
 *    operationId: 'user_inboxList'
 *    description:
 *      Lists recent notifications for this user.
 *      User initiating the request must be authenticated.
 *    responses:
 *      200:
 *        description: 'Notifications Marked as Seen'
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CT_NotificationListResponse'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/',
  middleware.isAuthenticated,
  promisable(inboxList, 'list user notifications')
)

/**
 * Mark all user notifications as read.
 *
 * @api [post] /user/inbox/seen
 *    tags:
 *      - User
 *    summary: 'Mark Notifications as Seen'
 *    operationId: 'user_inboxSeen'
 *    description:
 *      Marks all notifications for this user as seen.
 *      User initiating the request must be authenticated.
 *    responses:
 *      204:
 *        description: 'Notifications Marked as Seen'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 */
router.post(
  '/seen',
  middleware.isAuthenticated,
  promisable(inboxSeen, 'mark user notifications as seen')
)

export const inboxRouter = router
