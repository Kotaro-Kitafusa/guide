class AddPilotTypeColumnToPilotsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :pilots, :pilot_type, :int, null: false, default: 0
  end
end
