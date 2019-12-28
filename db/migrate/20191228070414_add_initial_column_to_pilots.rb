class AddInitialColumnToPilots < ActiveRecord::Migration[5.2]
  def change
    add_column :pilots, :first_name, :string, null: false
    add_column :pilots, :last_name, :string, null: false
    add_column :pilots, :nickname, :string
    add_column :pilots, :birthday, :date
    add_column :pilots, :status, :int, null: false, default: 0
  end
end
