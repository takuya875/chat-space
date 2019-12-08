class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true
 
  def show_last_message
    if (last_message = messages.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています'
      # 上記は三項演算子の定義。条件式？trueの場合 :falseの場合を記述
    else
      'まだメッセージはありません。'
    end
  end
end
