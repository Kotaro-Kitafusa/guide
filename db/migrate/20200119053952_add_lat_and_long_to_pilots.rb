class AddLatAndLongToPilots < ActiveRecord::Migration[5.2]
  def change
    add_column :pilots, :lat, :decimal, precision: 10, scale: 8
    add_column :pilots, :lng, :decimal, precision: 11, scale: 8
  end
end
