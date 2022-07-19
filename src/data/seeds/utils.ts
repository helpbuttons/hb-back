import { Connection } from 'typeorm'

export async function insert(connection: Connection, entity: T, values: any) {
    return await connection
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values([
        values
      ])
      .execute()
}