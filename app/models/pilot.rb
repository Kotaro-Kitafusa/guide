class Pilot < ApplicationRecord
  has_one :pilot_location
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :first_name, presence: true
  validates :last_name, presence: true

  enum pilot_type: {
    pilot: 0,
    traveller: 1
  }
  enum status: {
    inactive: 0,
    active: 1
  }
end
