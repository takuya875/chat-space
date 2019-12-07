class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.references :group, foreign_key: true
      t.references :user, foreign_key: true
      # 外部キーの定義を行うので、t.referencesを定義している。また、中間テーブルを作成し多対多の関係を作成している
      t.timestamps
    end
  end
end
