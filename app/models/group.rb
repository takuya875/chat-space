class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true

  has_many :messages
  # validatesを記述すると正しいデータだけをデータベースに入力することができる
end
