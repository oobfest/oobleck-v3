let database = require('../database')

let createColumns = (columns, includeId=false) =>
  includeId 
    ? [...columns, 'id']
    : columns
    .join(',')

let createParameters = columns=> 
  columns
    .map(c=> '@' + c)
    .join(', ')

// e.g. ['one', 'two', 'three'] and { one: x, two: y, four: z }
// becomes 'one=@one, two=@two'
let createSet = (rowKeys, columns)=>
  columns
    .filter(c=> rowKeys.includes(c))
    .map(c=> `${c}=@${c}`)
    .join(', ')

let createModel = function(schema, overrides={}) {
  let defaults = {
    create(row) {
      let response = database
        .prepare(`
          insert into ${schema.name} (${createColumns(schema.columns)})
          values (${createParameters(schema.columns)})`)
        .run(row)
      return database
        .prepare(`
          select ${createColumns(schema.columns, true)}
          from ${schema.name}
          where rowid = ?`)
        .get(response.lastInsertRowid)
    },
    get(id=null) {
      return id
        ? database
            .prepare(`select ${createColumns(schema.columns, true)} from ${schema.name} where id = ?`)
            .get(id)    // Otherwise returns 'undefined' if not found
        : database
            .prepare(`select ${createColumns(schema.columns, true)} from ${schema.name}`)
            .all()
    },
    getPublic() {
      return database
        .prepare(`select ${createColumns(schema.publicColumns, true)} from ${schema.name} where isHidden = 0`)
        .all()
    },
    update(id, row) {
      let response = database
        .prepare(`
          update ${schema.name}
          set ${createSet(Object.keys(row), schema.columns)}
          where id = @id`)
          .run({ ...row, id})
      return database
        .prepare(`
          select ${createColumns(schema.columns, true)}
          from ${schema.name}
          where id = ?`)
        .get(id)
    },
    delete(id) {
      return database
        .prepare(`delete from ${schema.name} where id = ?`)
        .run(id)
    }
  }
  return { ...defaults, ...overrides }
}

module.exports = createModel
