
exports.up = function (knex, Promise) {
  return knex.schema.createTable('case_studies', function (table) {
    table.increments('id').primary()
    table.string('jumbosrc')
    table.text('jumboalt')
    table.string('leadtext')
    table.text('leadpara')
    table.string('onesrc')
    table.text('onealt')
    table.string('onetitle')
    table.text('onepara')
    table.string('twosrc')
    table.text('twoalt')
    table.string('twotitle')
    table.text('twopara')
    table.string('threesrc')
    table.text('threealt')
    table.string('threetitle')
    table.text('threepara')
    table.string('finalsrc')
    table.text('finalalt')
    table.string('finaltitle')
    table.text('finalpara')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('case_studies')
}
