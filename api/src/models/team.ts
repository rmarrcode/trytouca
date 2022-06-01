// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

import { ITeamDocument, TeamModel } from '@/schemas/team'
import { IUser, UserModel } from '@/schemas/user'
import logger from '@/utils/logger'

export async function teamCreate(
  user: IUser,
  team: { slug: string; name: string }
): Promise<ITeamDocument> {
  // check that team slug is available

  if (await TeamModel.countDocuments({ slug: team.slug })) {
    return
  }

  // register team in database

  const newTeam = await TeamModel.create({
    name: team.name,
    owner: user._id,
    slug: team.slug
  })
  logger.info('%s: created team %s', user.username, team.slug)

  // update the user document to include a reference to this team

  await UserModel.findByIdAndUpdate(user._id, {
    $push: { teams: newTeam._id }
  })
  return newTeam
}
