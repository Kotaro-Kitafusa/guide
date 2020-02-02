class AddTypeColumnToPilotsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :pilots, :type, :int, null: false, default: 0
  end
end
