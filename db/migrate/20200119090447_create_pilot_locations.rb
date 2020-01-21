class CreatePilotLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :pilot_locations do |t|
      t.references :pilot, foreign_key: true, optional: true
      t.decimal "latitude", precision: 10, scale: 8
      t.decimal "longitude", precision: 11, scale: 8
      t.string "prefecture"
      t.string "address_city"
      t.string "address_street"
      t.string "address"
      t.timestamps
    end
  end
end
